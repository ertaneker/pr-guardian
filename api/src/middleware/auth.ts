import type { FastifyRequest, FastifyReply } from 'fastify';

// API key authentication middleware
export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const apiKey = request.headers['x-api-key'] as string | undefined;

  if (!apiKey) {
    // Try JWT token from Authorization header
    const authHeader = request.headers['authorization'];
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      try {
        const decoded = await request.server.jwt.verify<{ userId: string }>(token);
        (request as any).userId = decoded.userId;
        return;
      } catch {
        // Token invalid, fall through to error
      }
    }

    return reply.status(401).send({
      error: 'Unauthorized',
      message: 'Provide an API key via x-api-key header or Bearer token',
      code: 'PG-401',
    });
  }

  // Validate API key format
  if (!apiKey.startsWith('psh_') && !apiKey.startsWith('sk-')) {
    return reply.status(401).send({
      error: 'Unauthorized',
      message: 'Invalid API key format',
      code: 'PG-401',
    });
  }

  // For now, accept the key and set a placeholder user ID
  // In production, this will look up the key in the database
  (request as any).userId = 'api-key-user';
}
