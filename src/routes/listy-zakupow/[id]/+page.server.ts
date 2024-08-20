import type { Actions, PageServerLoad } from './$types';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { error } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { shopppingListRepository } from '../../../lib/server/modules/shopping-list/repository';
import { editShoppingListSchema } from '../../../lib/shared/schemas/shopping-lists/edit-shopping-list.schema';

export const load: PageServerLoad = async ({ params }) => {
	const shoppingList = shopppingListRepository.getShoppingListById(params.id);

	if (!shoppingList) {
		error(404, 'Lista zakupów nie istnieje');
	}

	const form = await superValidate(zod(editShoppingListSchema), {
		defaults: shoppingList
	});

	return { shoppingList, form };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(editShoppingListSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		shopppingListRepository.editShoppingList(form.data);

		return message(form, 'Zapisowano zmiany');
	}
};
