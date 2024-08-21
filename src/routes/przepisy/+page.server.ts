import { recipeRepository } from '../../lib/server/modules/recipe/repository';
import type { PageServerLoad } from './$types';
import { getAuthRequestCtx } from '../../lib/server/utils';

export const load: PageServerLoad = async ({ depends, locals: { requestCtx } }) => {
	depends('recipes:list');

	const authRequestCtx = getAuthRequestCtx(requestCtx);

	const recipes = await recipeRepository.getAllRecipes({}, authRequestCtx);

	return { recipes };
};
