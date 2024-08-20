import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	dialect: 'postgresql',
	schema: [
		'src/lib/server/trpc/modules/**/*/table.ts',
		'src/lib/server/trpc/modules/**/*/enums.ts'
	],
	out: 'src/lib/server/db/migrations',
	dbCredentials: {
		url: process.env.SUBABASE_DRIZZLE_DATABASE_CONN_STRING!
	},
	verbose: true,
	strict: true
});
