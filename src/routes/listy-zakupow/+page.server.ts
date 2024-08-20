import { shopppingListRepository } from '../../lib/server/modules/shopping-list/repository';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends }) => {
	depends('shopping-lists:list');
	const shoppingLists = shopppingListRepository.getAllShoppingLists();

	return { shoppingLists };
};
