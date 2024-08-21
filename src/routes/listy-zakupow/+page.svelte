<script lang="ts">
	import ShoppingListList from '$lib/frontend/components/shopping-lists/ShoppingListList.svelte';
	import { routes } from '../../routes.js';

	export let data;
</script>

<div class="w-full">
	<ShoppingListList shoppingLists={data.shoppingLists} />
	<a class="btn btn-primary" href={routes['dodaj-liste-zakupow']._get()}>Dodaj listę zakupów</a>
</div>
