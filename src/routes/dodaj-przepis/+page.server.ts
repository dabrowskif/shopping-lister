import type { Actions, PageServerLoad } from './$types';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { createRecipeSchema } from '../../lib/shared/schemas/recipes/create-recipe.schema';
import { getAuthRequestCtx } from '../../lib/server/utils';
import { RecipeRepository } from '../../lib/server/modules/recipe/repository';

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
	default: async ({ request, locals: { requestCtx } }) => {
		const authRequestCtx = getAuthRequestCtx(requestCtx);

		const form = await superValidate(request, zod(createRecipeSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		await new RecipeRepository().createRecipe(form.data, authRequestCtx);

		return message(form, 'Dodano przepis');
	}
};
