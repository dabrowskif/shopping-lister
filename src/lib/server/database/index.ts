import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '$env/dynamic/private';

const supabaseDatabaseClient = postgres(env.SUBABASE_DRIZZLE_DATABASE_CONN_STRING, {
	prepare: false
});

export const db = drizzle(supabaseDatabaseClient);
