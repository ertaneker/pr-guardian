import type { FastifyInstance } from 'fastify';

export async function healthRoutes(app: FastifyInstance) {
  app.get('/health', async () => {
    return {
      status: 'ok',
      version: '0.1.0',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  });
}
