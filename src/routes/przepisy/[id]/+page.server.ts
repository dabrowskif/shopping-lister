import type { Actions, PageServerLoad } from './$types';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { error } from '@sveltejs/kit';
import { editRecipeSchema } from '../../../lib/shared/schemas/recipes/edit-recipe.schema';
import { zod } from 'sveltekit-superforms/adapters';
import { recipeRepository } from '../../../lib/server/modules/recipe/repository';

export const load: PageServerLoad = async ({ params }) => {
	const recipe = recipeRepository.getRecipeById(params.id);

	if (!recipe) {
		error(404, 'not found');
	}

	const form = await superValidate(zod(editRecipeSchema), {
		defaults: recipe
	});

	return { recipe, form };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(editRecipeSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		recipeRepository.editRecipe(form.data);

		return message(form, 'Zapisowano zmiany');
	}
};
