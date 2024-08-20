import { recipeRepository } from '../../lib/server/modules/recipe/repository';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends }) => {
	depends('recipes:list');
	const recipes = recipeRepository.getAllRecipes();

	return { recipes };
};
