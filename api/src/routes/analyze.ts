import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { analyzePR } from '../services/analyzer';
import { authenticate } from '../middleware/auth';

const analyzeSchema = z.object({
  owner: z.string().min(1),
  repo: z.string().min(1),
  pr_number: z.number().int().positive(),
  github_token: z.string().optional(),
  deepseek_api_key: z.string().optional(),
  risk_threshold: z.number().min(1).max(10).optional().default(7),
});

export async function analyzeRoutes(app: FastifyInstance) {
  // Trigger analysis for a PR
  app.post('/analyze', { preHandler: [authenticate] }, async (request, reply) => {
    const body = analyzeSchema.parse(request.body);

    app.log.info({ owner: body.owner, repo: body.repo, pr: body.pr_number }, 'Analysis requested');

    try {
      const result = await analyzePR({
        owner: body.owner,
        repo: body.repo,
        prNumber: body.pr_number,
        githubToken: body.github_token || process.env.GITHUB_TOKEN || '',
        deepseekApiKey: body.deepseek_api_key || process.env.DEEPSEEK_API_KEY || '',
        riskThreshold: body.risk_threshold,
      });

      return reply.send({
        analysis_id: result.id,
        risk_score: result.risk_score,
        summary: result.summary,
        findings: result.findings,
        model: result.model,
        tokens_used: result.tokens_used,
        analysis_time_ms: result.analysis_time_ms,
      });
    } catch (error) {
      app.log.error(error);
      return reply.status(500).send({
        error: 'Analysis failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  });

  // Get analysis by ID
  app.get('/analysis/:id', { preHandler: [authenticate] }, async (request, reply) => {
    const { id } = request.params as { id: string };

    // TODO: Fetch from database
    return reply.send({
      id,
      status: 'not_found',
      message: 'Analysis results are not persisted yet. Database integration coming in a future phase.',
    });
  });

  // Get usage stats for authenticated user
  app.get('/usage', { preHandler: [authenticate] }, async (request) => {
    const userId = (request as any).userId;

    // TODO: Fetch from database
    return {
      user_id: userId,
      prs_this_month: 0,
      limit: 50,
      tier: 'free',
      reset_date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toISOString(),
    };
  });
}
