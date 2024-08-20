<script lang="ts">
	import RecipeForm from '$lib/frontend/components/recipes/RecipeForm.svelte';

	export let data;
</script>

<RecipeForm type="edit" {data} />
