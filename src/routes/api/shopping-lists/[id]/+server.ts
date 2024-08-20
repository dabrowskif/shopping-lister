import { shopppingListRepository } from '../../../../lib/server/modules/shopping-list/repository';
import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = async ({ params }) => {
	shopppingListRepository.removeShoppingListById(params.id);

	return new Response(null, { status: 204 });
};
