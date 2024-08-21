import { timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { authSchema } from '../schemas/auth.schema';

/**
 * We partially map users table from auth schema to support user referencing inside accounts table
 */
export const usersTable = authSchema.table('users', {
	id: uuid('id').primaryKey(),
	email: varchar('email').notNull(),
	confirmed_at: timestamp('confirmed_at', { withTimezone: true })
});
