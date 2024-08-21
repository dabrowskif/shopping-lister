import type { Session, SupabaseClient, User } from '@supabase/supabase-js';
import type { RequestCtx } from './lib/server/types';
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	interface Window {
		handleSignInWithGoogle: (response) => void;
	}
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient;
			safeGetSession: () => Promise<{ session: Session | null; user: User | null }>;
			session: Session | null;
			user: User | null;
			requestCtx: RequestCtx;
		}
		interface PageData {
			session: Session | null;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
