import type { FastifyInstance } from 'fastify';
import { authenticate } from '../middleware/auth';

export async function userRoutes(app: FastifyInstance) {
  // Get current user profile
  app.get('/user', { preHandler: [authenticate] }, async (request) => {
    const userId = (request as any).userId;

    return {
      id: userId,
      github_login: 'unknown',
      plan: 'free',
      created_at: new Date().toISOString(),
    };
  });

  // Get API key for current user
  app.get('/user/api-key', { preHandler: [authenticate] }, async (request) => {
    const userId = (request as any).userId;

    return {
      user_id: userId,
      api_key: 'psh_****************************',
      created_at: new Date().toISOString(),
      last_used: null,
    };
  });
}
