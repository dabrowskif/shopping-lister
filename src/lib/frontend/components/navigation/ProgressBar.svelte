<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { navigating } from '$app/stores';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import type { Unsubscriber } from 'svelte/store';

	const progress = tweened(0, {
		duration: 400,
		easing: cubicOut
	});

	let unsubscribe: Unsubscriber;
	let showProgressBar = false;

	onMount(() => {
		unsubscribe = navigating.subscribe(($navigating) => {
			if ($navigating) {
				progress.set(100, { duration: 400 });
			} else {
				setTimeout(() => {
					showProgressBar = false;
					progress.set(0, { duration: 0 });
				}, 400);
			}
		});
	});

	onDestroy(() => {
		if (unsubscribe) unsubscribe();
	});
</script>

<div
	style="width: {$progress}%;"
	class:hidden={showProgressBar}
	class="fixed top-0 left-0 h-2 bg-primary"
></div>
