import { recipeRepository } from '../../../../lib/server/modules/recipe/repository';
import { getAuthRequestCtx } from '../../../../lib/server/utils';
import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = async ({ params, locals: { requestCtx } }) => {
	const authRequestCtx = getAuthRequestCtx(requestCtx);
	await recipeRepository.removeRecipeById(params.id, authRequestCtx);

	return new Response(null, { status: 204 });
};
