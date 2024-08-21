<script lang="ts">
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import Navbar from '$lib/frontend/components/navigation/Navbar.svelte';

	export let data;
	$: ({ session, supabase } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<div>
	<Navbar {session} {supabase} />
	<div class="flex flex-col justify-center items-center m-5 md:m-20">
		<slot />
	</div>
</div>
