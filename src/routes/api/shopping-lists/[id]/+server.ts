import { shopppingListRepository } from '../../../../lib/server/modules/shopping-list/repository';
import { getAuthRequestCtx } from '../../../../lib/server/utils';
import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = async ({ params, locals: { requestCtx } }) => {
	const authRequestCtx = getAuthRequestCtx(requestCtx);
	await shopppingListRepository.removeShoppingListById(params.id, authRequestCtx);

	return new Response(null, { status: 204 });
};
