import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { logger } from '../../../shared/logger/logger';
import { initDB } from '../../database';
import { recipesTable } from '../../database/tables/recipes.table';
import type { AuthRequestCtx } from '../../types';
import type { CreateRecipeDTO, EditRecipeDTO, GetRecipeDTO } from './types';
import { and, eq } from 'drizzle-orm';

export class RecipeRepository {
	db: PostgresJsDatabase<Record<string, never>>;

	constructor() {
		this.db = initDB();
	}

	async createRecipe(createRecipeDTO: CreateRecipeDTO, ctx: AuthRequestCtx): Promise<void> {
		await this.db.insert(recipesTable).values({
			ownerId: ctx.session.user.id,
			ingredients: createRecipeDTO.ingredients,
			name: createRecipeDTO.name
		});

		logger.debug('createRecipe', { createRecipeDTO });
	}

	async getAllRecipes(
		params: {
			page?: number | undefined;
			search?: string | undefined;
		},
		ctx: AuthRequestCtx
	): Promise<GetRecipeDTO[]> {
		const recipes = await this.db
			.select({
				id: recipesTable.id,
				name: recipesTable.name,
				ingredients: recipesTable.ingredients
			})
			.from(recipesTable)
			.where(eq(recipesTable.ownerId, ctx.session.user.id))
			.offset(0)
			.limit(10);

		logger.debug('getAllRecipes', { params, recipes });

		return recipes;
	}

	async getRecipeById(recipeId: string, ctx: AuthRequestCtx): Promise<GetRecipeDTO> {
		const recipes = await this.db
			.select({
				id: recipesTable.id,
				name: recipesTable.name,
				ingredients: recipesTable.ingredients
			})
			.from(recipesTable)
			.where(and(eq(recipesTable.ownerId, ctx.session.user.id), eq(recipesTable.id, recipeId)))
			.limit(1);

		logger.debug('getRecipeById', { recipeId, recipes });

		if (!recipes[0]) {
			throw new Error('Nie znaleziono przepisu');
		}

		return recipes[0];
	}

	async editRecipe(editRecipeDTO: EditRecipeDTO, ctx: AuthRequestCtx): Promise<void> {
		const recipes = await this.db
			.update(recipesTable)
			.set({ name: editRecipeDTO.name, ingredients: editRecipeDTO.ingredients })
			.where(
				and(eq(recipesTable.ownerId, ctx.session.user.id), eq(recipesTable.id, editRecipeDTO.id))
			)
			.returning({ updatedId: recipesTable.id });

		logger.debug('editRecipe', { editRecipeDTO, recipes });
		if (!recipes[0]) {
			throw new Error('Nie znaleziono przepisu');
		}
	}

	async removeRecipeById(recipeId: string, ctx: AuthRequestCtx): Promise<void> {
		const recipes = await this.db
			.delete(recipesTable)
			.where(and(eq(recipesTable.ownerId, ctx.session.user.id), eq(recipesTable.id, recipeId)))
			.returning({ updatedId: recipesTable.id });

		logger.debug('removeRecipeById', { recipeId, recipes });

		if (!recipes[0]) {
			throw new Error('Nie znaleziono przepisu');
		}
	}
}
