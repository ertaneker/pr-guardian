/**
 * Stripe billing service.
 * Handles checkout sessions, customer portal, webhooks, and subscriptions.
 */

import Stripe from 'stripe';

const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY || '';
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || '';

// Only initialize Stripe if key is available
const stripe = STRIPE_SECRET ? new Stripe(STRIPE_SECRET) : null;

export const PLANS: Record<string, {
  name: string;
  price: number;
  prsPerMonth: number;
  features: string[];
  stripePriceId?: string;
}> = {
  free: {
    name: 'Free',
    price: 0,
    prsPerMonth: 50,
    features: ['Public repositories', '50 PR reviews/month', 'All production risk checks', 'Community support'],
  },
  team: {
    name: 'Team',
    price: 29,
    prsPerMonth: 500,
    features: ['5 private repositories', 'Unlimited PR reviews', 'Custom rules', 'Email support'],
  },
  pro: {
    name: 'Pro',
    price: 79,
    prsPerMonth: 2000,
    features: ['Unlimited repositories', 'CI/CD integration', 'Slack & Discord notifications', 'Analytics dashboard', 'Priority support'],
  },
  enterprise: {
    name: 'Enterprise',
    price: 299,
    prsPerMonth: -1, // unlimited
    features: ['Self-hosted deployment', 'SSO & SAML', 'Audit logs', 'Custom AI model', 'Dedicated support with SLA'],
  },
};

interface CheckoutParams {
  userId: string;
  planId: string;
  successUrl: string;
  cancelUrl: string;
}

export async function createCheckoutSession(params: CheckoutParams) {
  if (!stripe) throw new Error('Stripe not configured');

  const plan = PLANS[params.planId];
  if (!plan || plan.price === 0) {
    throw new Error('Cannot create checkout for free plan');
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    customer_email: undefined, // Will be set from GitHub OAuth
    client_reference_id: params.userId,
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    metadata: { userId: params.userId, planId: params.planId },
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `PR Shield ${plan.name}`,
            description: `${plan.name} plan — ${plan.prsPerMonth === -1 ? 'Unlimited' : plan.prsPerMonth} PR reviews/month`,
          },
          unit_amount: plan.price * 100, // Stripe uses cents
          recurring: { interval: 'month' },
        },
        quantity: 1,
      },
    ],
  });

  return { url: session.url };
}

interface PortalParams {
  userId: string;
  returnUrl: string;
}

export async function createPortalSession(params: PortalParams) {
  // In production: look up customer ID from database by userId
  // For now, return a mock
  return {
    url: `https://billing.stripe.com/p/session/mock?return=${encodeURIComponent(params.returnUrl)}`,
  };
}

export async function handleWebhook(body: string, signature: string): Promise<void> {
  if (!stripe) throw new Error('Stripe not configured');
  const event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET);

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      const metadata = (session as any).metadata || {};
      console.log(`Subscription created: user=${metadata.userId}, plan=${metadata.planId}`);
      break;
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object;
      console.log(`Subscription updated: ${(subscription as any).id}, status=${(subscription as any).status}`);
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object;
      console.log(`Subscription cancelled: ${(subscription as any).id}`);
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object;
      console.log(`Payment failed: customer=${(invoice as any).customer}`);
      break;
    }
  }
}

export async function getSubscription(userId: string) {
  // TODO: Fetch from database
  return {
    plan: 'free',
    status: 'active',
    prs_used: 0,
    prs_limit: 50,
    current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  };
}
