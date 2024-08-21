import type { Actions, PageServerLoad } from './$types';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { editRecipeSchema } from '../../../lib/shared/schemas/recipes/edit-recipe.schema';
import { zod } from 'sveltekit-superforms/adapters';
import { recipeRepository } from '../../../lib/server/modules/recipe/repository';
import { getAuthRequestCtx } from '../../../lib/server/utils';

export const load: PageServerLoad = async ({ params, locals: { requestCtx } }) => {
	const authRequestCtx = getAuthRequestCtx(requestCtx);

	const recipe = await recipeRepository.getRecipeById(params.id, authRequestCtx);

	const form = await superValidate(zod(editRecipeSchema), {
		defaults: recipe
	});

	return { recipe, form };
};

export const actions: Actions = {
	default: async ({ request, locals: { requestCtx } }) => {
		const authRequestCtx = getAuthRequestCtx(requestCtx);

		const form = await superValidate(request, zod(editRecipeSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		recipeRepository.editRecipe(form.data, authRequestCtx);

		return message(form, 'Zapisowano zmiany');
	}
};
