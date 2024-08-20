import { recipeRepository } from '../../../../lib/server/modules/recipe/repository';
import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = async ({ params }) => {
	recipeRepository.removeRecipeById(params.id);

	return new Response(null, { status: 204 });
};
