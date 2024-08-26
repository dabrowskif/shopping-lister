import type { Actions, PageServerLoad } from './$types';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { createShoppingListSchema } from '../../lib/shared/schemas/shopping-lists/create-shopping-list.schema';
import { getAuthRequestCtx } from '../../lib/server/utils';
import { ShoppingListRepository } from '../../lib/server/modules/shopping-list/repository';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(createShoppingListSchema), {
		defaults: {
			name: '',
			ingredients: []
		}
	});

	return { form };
};

export const actions: Actions = {
	default: async ({ request, locals: { requestCtx } }) => {
		const authRequestCtx = getAuthRequestCtx(requestCtx);

		const form = await superValidate(request, zod(createShoppingListSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		await new ShoppingListRepository().createShoppingList(form.data, authRequestCtx);

		return message(form, 'Dodano listę zakupów');
	}
};
