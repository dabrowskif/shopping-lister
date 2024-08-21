import { uuid, varchar } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';
import { slSchema } from '../schemas/sl.shema';
import { usersTable } from './users.table';
import { ingredientJsonb } from '../types/ingredient.type';

export const shoppingListsTable = slSchema.table('shoppingLists', {
	id: varchar('id', { length: 128 })
		.$defaultFn(() => createId())
		.primaryKey(),
	ownerId: uuid('ownerId')
		.references(() => usersTable.id)
		.notNull(),
	name: varchar('name', { length: 256 }).notNull(),
	ingredients: ingredientJsonb.notNull()
});
