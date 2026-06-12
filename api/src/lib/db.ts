/**
 * Database connection setup.
 * Uses PostgreSQL via Drizzle ORM.
 * For development, SQLite can be used as a lightweight alternative.
 */

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://localhost:5432/prshield';

// Lazy connection — only connect when needed
let dbInstance: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (!dbInstance) {
    const client = postgres(DATABASE_URL, {
      max: 10,
      idle_timeout: 30,
    });
    dbInstance = drizzle(client);
  }
  return dbInstance;
}

// For environments without PostgreSQL (dev/CI), use a mock
export function getMockDb() {
  return {
    query: {
      users: {
        findFirst: async () => null,
        findMany: async () => [],
      },
    },
  };
}
