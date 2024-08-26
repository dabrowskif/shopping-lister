import type { Actions, PageServerLoad } from './$types';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { editShoppingListSchema } from '../../../lib/shared/schemas/shopping-lists/edit-shopping-list.schema';
import { getAuthRequestCtx } from '../../../lib/server/utils';
import { ShoppingListRepository } from '../../../lib/server/modules/shopping-list/repository';

export const load: PageServerLoad = async ({ params, locals: { requestCtx } }) => {
	const authRequestCtx = getAuthRequestCtx(requestCtx);

	const shoppingList = await new ShoppingListRepository().getShoppingListById(
		params.id,
		authRequestCtx
	);

	const form = await superValidate(zod(editShoppingListSchema), {
		defaults: shoppingList
	});

	return { shoppingList, form };
};

export const actions: Actions = {
	default: async ({ request, locals: { requestCtx } }) => {
		const authRequestCtx = getAuthRequestCtx(requestCtx);

		const form = await superValidate(request, zod(editShoppingListSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		await new ShoppingListRepository().editShoppingList(form.data, authRequestCtx);

		return message(form, 'Zapisowano zmiany');
	}
};
