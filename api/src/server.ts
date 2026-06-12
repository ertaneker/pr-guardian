import Fastify from 'fastify';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import jwt from '@fastify/jwt';
import 'dotenv/config';
import { healthRoutes } from './routes/health';
import { analyzeRoutes } from './routes/analyze';
import { userRoutes } from './routes/user';
import { billingRoutes, webhookRoutes } from './routes/billing';

const PORT = parseInt(process.env.PORT || '3001', 10);
const JWT_SECRET = process.env.JWT_SECRET || 'pr-shield-dev-secret-change-in-production';

const app = Fastify({
  logger: {
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    transport:
      process.env.NODE_ENV !== 'production'
        ? { target: 'pino-pretty', options: { colorize: true } }
        : undefined,
  },
});

async function start() {
  // CORS
  await app.register(cors, {
    origin: process.env.APP_URL || 'http://localhost:3000',
    credentials: true,
  });

  // Rate limiting
  await app.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
    keyGenerator: (req) => {
      return (req.headers['x-api-key'] as string) || req.ip;
    },
  });

  // JWT
  await app.register(jwt, {
    secret: JWT_SECRET,
  });

  // Routes
  await app.register(healthRoutes, { prefix: '/api/v1' });
  await app.register(analyzeRoutes, { prefix: '/api/v1' });
  await app.register(userRoutes, { prefix: '/api/v1' });
  await app.register(billingRoutes, { prefix: '/api/v1' });
  await app.register(webhookRoutes, { prefix: '/api/v1' });

  // Global error handler
  app.setErrorHandler((err, _request, reply) => {
    const error = err as { statusCode?: number; name?: string; message?: string };
    app.log.error(error);

    if (error.statusCode === 429) {
      return reply.status(429).send({
        error: 'Too Many Requests',
        message: 'Rate limit exceeded. Upgrade your plan for higher limits.',
        code: 'PG-429',
      });
    }

    return reply.status(error.statusCode || 500).send({
      error: error.name || 'Internal Server Error',
      message: error.message || 'An unexpected error occurred',
      code: error.statusCode ? `PG-${error.statusCode}` : 'PG-500',
    });
  });

  // Start
  try {
    await app.listen({ port: PORT, host: '0.0.0.0' });
    app.log.info(`PR Shield API running on port ${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();

export { app };
