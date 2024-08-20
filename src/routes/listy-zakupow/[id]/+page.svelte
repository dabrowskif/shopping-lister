<script lang="ts">
	import ShoppingListForm from '$lib/frontend/components/shopping-lists/ShoppingListForm.svelte';

	export let data;
</script>

<ShoppingListForm type="edit" {data} />
