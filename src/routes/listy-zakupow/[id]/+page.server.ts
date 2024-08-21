import type { Actions, PageServerLoad } from './$types';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { shopppingListRepository } from '../../../lib/server/modules/shopping-list/repository';
import { editShoppingListSchema } from '../../../lib/shared/schemas/shopping-lists/edit-shopping-list.schema';
import { getAuthRequestCtx } from '../../../lib/server/utils';

export const load: PageServerLoad = async ({ params, locals: { requestCtx } }) => {
	const authRequestCtx = getAuthRequestCtx(requestCtx);

	const shoppingList = await shopppingListRepository.getShoppingListById(params.id, authRequestCtx);

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

		shopppingListRepository.editShoppingList(form.data, authRequestCtx);

		return message(form, 'Zapisowano zmiany');
	}
};
