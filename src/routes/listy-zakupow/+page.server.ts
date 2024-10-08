import { ShoppingListRepository } from '../../lib/server/modules/shopping-list/repository';
import { getAuthRequestCtx } from '../../lib/server/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends, locals: { requestCtx } }) => {
	depends('shopping-lists:list');

	const authRequestCtx = getAuthRequestCtx(requestCtx);

	const shoppingLists = await new ShoppingListRepository().getAllShoppingLists({}, authRequestCtx);

	return { shoppingLists };
};
