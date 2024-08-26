import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '$env/dynamic/private';

// INFO: for cluodflare workers, every function cann't reuse shared resources like DB connection (unlike AWS Lambda)
export const initDB = () => {
	const supabaseDatabaseClient = postgres(env.SUBABASE_DATABASE_CONN_STRING, {
		prepare: false
	});
	return drizzle(supabaseDatabaseClient);
};
