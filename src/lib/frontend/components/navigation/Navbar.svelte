<script lang="ts">
	import type { Session, SupabaseClient } from '@supabase/supabase-js';
	import { routes } from '../../../../routes';
	import type { Maybe } from '$lib/shared/types/maybe';
	import { goto } from '$app/navigation';

	export let session: Maybe<Session>;
	export let supabase: Maybe<SupabaseClient>;

	function logout() {
		supabase?.auth.signOut();
		goto('/logowanie');
	}
</script>

<div class="navbar bg-base-100 h-20 shadow-2xl">
	<div class="navbar-start">
		<div class="dropdown lg:hidden">
			<div tabindex="0" role="button" class="btn btn-ghost btn-circle">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h7"
					/>
				</svg>
			</div>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<ul
				tabindex="0"
				class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 border border-primary shadow-2xl"
			>
				{#if session}
					<li><a href={routes['dodaj-przepis']._get()}>Dodaj przepis</a></li>
					<li><a href={routes.przepisy._get()}>Twoje przepisy</a></li>
					<li><a href={routes['dodaj-liste-zakupow']._get()}>Stwórz listę zakupów</a></li>
					<li><a href={routes['listy-zakupow']._get()}>Twoje listy zakupów</a></li>
					<hr class="divider" />
					<div>
						Zalogowany jako
						<span class="ms-2">{session.user.email}</span>
						<button class="btn btn-outline" on:click={logout}>Wyloguj</button>
					</div>
				{:else}
					<a class="btn btn-ghost" href={routes.logowanie._get()}>Logowanie</a>
				{/if}
			</ul>
		</div>
		{#if session}
			<h1 class="text-xl">Przepisownia</h1>
		{/if}
	</div>
	<div class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal px-1">
			{#if session}
				<li><a href={routes['dodaj-przepis']._get()}>Dodaj przepis</a></li>
				<li><a href={routes.przepisy._get()}>Twoje przepisy</a></li>
				<li><a href={routes['dodaj-liste-zakupow']._get()}>Stwórz listę zakupów</a></li>
				<li><a href={routes['listy-zakupow']._get()}>Twoje listy zakupów</a></li>
			{:else}
				<h1 class="text-xl">Przepisownia</h1>
			{/if}
		</ul>
	</div>
	<div class="navbar-end hidden sm:flex">
		{#if session}
			Zalogowany jako
			<span class="ms-2">{session.user.email}</span>
			<button class="btn btn-outline ms-5" on:click={logout}>Wyloguj</button>
		{/if}
	</div>
</div>
