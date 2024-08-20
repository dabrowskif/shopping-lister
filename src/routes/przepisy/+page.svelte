<script lang="ts">
	import RecipeList from '$lib/frontend/components/recipes/RecipeList.svelte';
	import { routes } from '../../routes.js';

	export let data;
</script>

<div class="w-full space-y-5">
	<RecipeList recipes={data.recipes} />
	<a class="btn btn-primary" href={routes['dodaj-przepis']._get()}>Dodaj przepis</a>
</div>
