<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	export let data;

	onMount(() => {
		window.handleSignInWithGoogle = async (response) => {
			await data.supabase.auth.signInWithIdToken({
				provider: 'google',
				token: response.credential
			});
			goto('/');
		};
	});
</script>

<svelte:head>
	<script src="https://accounts.google.com/gsi/client" async defer></script>
</svelte:head>

<h2 class="text-3xl mb-5">Logowanie</h2>
<div
	id="g_id_onload"
	data-client_id="113443564350-4vkpgtg3q1esnk3ioblon7gieqmilv9o.apps.googleusercontent.com"
	data-context="signin"
	data-ux_mode="popup"
	data-callback="handleSignInWithGoogle"
	data-auto_prompt="false"
></div>
<div
	class="g_id_signin"
	data-type="standard"
	data-shape="rectangular"
	data-theme="outline"
	data-text="signin_with"
	data-size="large"
	data-logo_alignment="left"
	data-width="300"
></div>
