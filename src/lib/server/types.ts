import type { Session } from '@supabase/supabase-js';

export type RequestCtx = {
	session: Session | null;
};

export type AuthRequestCtx = {
	session: Session;
};
