import type { Actions, PageServerLoad } from './$types';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { createRecipeSchema } from '../../lib/shared/schemas/recipes/create-recipe.schema';
import { recipeRepository } from '../../lib/server/modules/recipe/repository';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(createRecipeSchema), {
		defaults: {
			name: '',
			ingredients: [{ name: '', quantity: '', unit: '' }]
		}
	});

	return { form };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(createRecipeSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		recipeRepository.createRecipe(form.data);

		return message(form, 'Dodano przepis');
	}
};
