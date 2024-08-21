import { pgSchema } from 'drizzle-orm/pg-core';

/**
 * auth schema is managed by supabase auth
 */
export const authSchema = pgSchema('auth');
