import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	dialect: 'postgresql',
	schema: [
		// 'src/lib/server/database/schemas/*.ts',
		'src/lib/server/database/tables/*.ts',
		'src/lib/server/database/types/*.ts',
		'src/lib/server/database/enums/*.ts'
	],
	out: 'src/lib/server/database/migrations',
	dbCredentials: {
		url: process.env.SUBABASE_DATABASE_CONN_STRING!
	},
	schemaFilter: ['shopping-lister'],
	verbose: true,
	strict: true
});
