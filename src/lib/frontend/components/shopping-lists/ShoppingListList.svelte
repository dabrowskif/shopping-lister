<script lang="ts">
	import { invalidate } from '$app/navigation';
	import DeleteIcon from '$lib/frontend/icons/DeleteIcon.svelte';
	import type { GetShoppingListDTO } from '$lib/server/modules/shopping-list/types';
	import type { Maybe } from '$lib/shared/types/maybe';
	import { routes } from '../../../../routes';

	export let shoppingLists: GetShoppingListDTO[] = [];

	let shoppingListUnderDeletion: Maybe<string> = null;
	$: {
		if (shoppingLists) {
			shoppingListUnderDeletion = null;
		}
	}

	async function deleteShoppingList(recipeId: string) {
		shoppingListUnderDeletion = recipeId;
		try {
			const response = await fetch(routes.api['shopping-lists']['[id]']._get(recipeId), {
				method: 'DELETE'
			});

			if (response.ok) {
				invalidate('shopping-lists:list');
			} else {
				shoppingListUnderDeletion = null;
			}
		} catch (error) {
			// TODO: implement user feedback
			console.error(error);
			shoppingListUnderDeletion = null;
		}
	}
</script>

<div class="overflow-x-auto p-6">
	<table class="table table-zebra w-full">
		<thead>
			<tr>
				<th></th>
				<th>Nazwa</th>
				<th>Opcje</th>
			</tr>
		</thead>
		<tbody>
			{#each shoppingLists as shoppingList, index}
				<tr
					class="cursor-pointer hover:bg-gray-100"
					on:click={() =>
						(window.location.href = routes['listy-zakupow']['[id]']._get(shoppingList.id))}
				>
					<th>{index + 1}</th>
					<td>{shoppingList.name}</td>
					<td>
						<button
							aria-label="Delete"
							on:click|stopPropagation={() => {
								if (shoppingListUnderDeletion === null) {
									deleteShoppingList(shoppingList.id);
								}
							}}
							class="btn btn-ghost"
						>
							{#if shoppingList.id === shoppingListUnderDeletion}
								<span class="loading loading-spinner text-error" />
							{:else}
								<DeleteIcon class="text-3xl text-red-500" />
							{/if}
						</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
