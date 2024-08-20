import { json } from '@sveltejs/kit';
import { recipeRepository } from '../../../lib/server/modules/recipe/repository';
import type { RequestHandler } from './$types';
import { getRecipesSchema } from '../../../lib/shared/schemas/recipes/get-recipes.schema';

export const GET: RequestHandler = async ({ url }) => {
	const searchParams = Object.fromEntries(url.searchParams.entries());
	const result = getRecipesSchema.safeParse({
		page: searchParams.page ?? 1
	});

	if (!result.success) {
		return json({ errors: result.error.errors }, { status: 400 });
	}

	const { page, search } = result.data;

	const recipes = recipeRepository.getAllRecipes({
		page,
		search
	});

	return json(recipes);
};
