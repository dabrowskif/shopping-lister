import { error, type RequestEvent } from '@sveltejs/kit';
import type { AuthRequestCtx, RequestCtx } from './types';

export function createRequestCtx(requestEvent: RequestEvent): RequestCtx {
	return {
		session: requestEvent.locals.session
	};
}

export function getAuthRequestCtx(requestCtx: RequestCtx): AuthRequestCtx {
	if (!requestCtx.session) {
		throw error(403, 'Forbidden');
	}

	return requestCtx as AuthRequestCtx;
}
