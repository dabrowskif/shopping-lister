import { db } from '../../database';
import { shoppingListsTable } from '../../database/tables/shopping-lists.table';
import type { AuthRequestCtx } from '../../types';

import { and, eq } from 'drizzle-orm';
import type { CreateShoppingListDTO, EditShoppingListDTO, GetShoppingListDTO } from './types';
import { logger } from '../../../shared/logger/logger';

class ShoppingListRepository {
	async createShoppingList(
		createShoppingListDTO: CreateShoppingListDTO,
		ctx: AuthRequestCtx
	): Promise<void> {
		await db.insert(shoppingListsTable).values({
			ownerId: ctx.session.user.id,
			ingredients: createShoppingListDTO.ingredients,
			name: createShoppingListDTO.name
		});

		logger.debug('createShoppingList', { createShoppingListDTO });
	}

	async getAllShoppingLists(
		params: {
			page?: number | undefined;
			search?: string | undefined;
		},
		ctx: AuthRequestCtx
	): Promise<GetShoppingListDTO[]> {
		const shoppingLists = await db
			.select({
				id: shoppingListsTable.id,
				name: shoppingListsTable.name,
				ingredients: shoppingListsTable.ingredients
			})
			.from(shoppingListsTable)
			.where(eq(shoppingListsTable.ownerId, ctx.session.user.id))
			.offset(params.page ?? 0)
			.limit(10);

		logger.debug('getAllShoppingLists', { params, shoppingLists });

		return shoppingLists;
	}

	async getShoppingListById(
		shoppingListId: string,
		ctx: AuthRequestCtx
	): Promise<GetShoppingListDTO> {
		const shoppingLists = await db
			.select({
				id: shoppingListsTable.id,
				name: shoppingListsTable.name,
				ingredients: shoppingListsTable.ingredients
			})
			.from(shoppingListsTable)
			.where(
				and(
					eq(shoppingListsTable.ownerId, ctx.session.user.id),
					eq(shoppingListsTable.id, shoppingListId)
				)
			)
			.limit(1);

		logger.debug('getShoppingListById', { shoppingListId, shoppingLists });

		if (!shoppingLists[0]) {
			throw new Error('Nie znaleziono listy zakupów');
		}

		return shoppingLists[0];
	}

	async editShoppingList(
		editShoppingListDTO: EditShoppingListDTO,
		ctx: AuthRequestCtx
	): Promise<void> {
		const shoppingLists = await db
			.update(shoppingListsTable)
			.set({ name: editShoppingListDTO.name, ingredients: editShoppingListDTO.ingredients })
			.where(
				and(
					eq(shoppingListsTable.ownerId, ctx.session.user.id),
					eq(shoppingListsTable.id, shoppingListsTable.id)
				)
			)
			.returning({ updatedId: shoppingListsTable.id });

		logger.debug('editShoppingList', { editShoppingListDTO, shoppingLists });
		if (!shoppingLists[0].updatedId) {
			throw new Error('Nie znaleziono listy zakupów');
		}
	}

	async removeShoppingListById(shoppingListId: string, ctx: AuthRequestCtx): Promise<void> {
		const shoppingLists = await db
			.delete(shoppingListsTable)
			.where(
				and(
					eq(shoppingListsTable.ownerId, ctx.session.user.id),
					eq(shoppingListsTable.id, shoppingListId)
				)
			)
			.returning({ updatedId: shoppingListsTable.id });

		logger.debug('removeShoppingListById', { shoppingListId, shoppingLists });

		if (!shoppingLists[0].updatedId) {
			throw new Error('Nie znaleziono listy zakupów');
		}
	}
}

export const shopppingListRepository = new ShoppingListRepository();
