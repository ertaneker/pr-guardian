import type { FastifyInstance } from 'fastify';
import { authenticate } from '../middleware/auth';
import {
  createCheckoutSession,
  createPortalSession,
  handleWebhook,
  getSubscription,
  PLANS,
} from '../services/billing';

export async function billingRoutes(app: FastifyInstance) {
  // Get available plans
  app.get('/plans', async () => {
    return PLANS;
  });

  // Create Stripe checkout session
  app.post('/billing/checkout', { preHandler: [authenticate] }, async (request, reply) => {
    const { planId, successUrl, cancelUrl } = request.body as {
      planId: string;
      successUrl?: string;
      cancelUrl?: string;
    };

    const userId = (request as any).userId;

    if (!planId || !PLANS[planId]) {
      return reply.status(400).send({ error: 'Invalid plan ID' });
    }

    try {
      const session = await createCheckoutSession({
        userId,
        planId,
        successUrl: successUrl || `${process.env.APP_URL}/dashboard?checkout=success`,
        cancelUrl: cancelUrl || `${process.env.APP_URL}/pricing?checkout=cancelled`,
      });

      return { url: session.url };
    } catch (error) {
      app.log.error(error);
      return reply.status(500).send({ error: 'Failed to create checkout session' });
    }
  });

  // Create Stripe customer portal
  app.post('/billing/portal', { preHandler: [authenticate] }, async (request, reply) => {
    const userId = (request as any).userId;
    const { returnUrl } = request.body as { returnUrl?: string };

    try {
      const portal = await createPortalSession({
        userId,
        returnUrl: returnUrl || `${process.env.APP_URL}/dashboard`,
      });

      return { url: portal.url };
    } catch (error) {
      app.log.error(error);
      return reply.status(500).send({ error: 'Failed to create portal session' });
    }
  });

  // Get current subscription
  app.get('/billing/subscription', { preHandler: [authenticate] }, async (request) => {
    const userId = (request as any).userId;

    try {
      const subscription = await getSubscription(userId);
      return subscription;
    } catch {
      return { plan: 'free', status: 'active', prs_used: 0, prs_limit: 50 };
    }
  });
}

// Stripe webhook route (no auth — verified by Stripe signature)
export async function webhookRoutes(app: FastifyInstance) {
  app.post('/webhooks/stripe', {
    config: { rawBody: true },
  }, async (request, reply) => {
    const signature = request.headers['stripe-signature'] as string;

    if (!signature) {
      return reply.status(400).send({ error: 'Missing stripe-signature header' });
    }

    try {
      await handleWebhook(
        (request as any).rawBody || JSON.stringify(request.body),
        signature
      );
      return { received: true };
    } catch (error) {
      app.log.error(error);
      return reply.status(400).send({ error: 'Webhook verification failed' });
    }
  });
}
