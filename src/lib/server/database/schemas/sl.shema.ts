import { pgSchema } from 'drizzle-orm/pg-core';

/**
 * Main schema that should be used in most cases
 */
export const slSchema = pgSchema('shopping-lister');
