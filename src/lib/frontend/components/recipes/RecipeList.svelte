<script lang="ts">
	import { invalidate } from '$app/navigation';
	import DeleteIcon from '$lib/frontend/icons/DeleteIcon.svelte';
	import type { GetRecipeDTO } from '$lib/server/modules/recipe/types';
	import { routes } from '../../../../routes';

	export let recipes: GetRecipeDTO[] = [];

	async function deleteRecipe(recipeId: string) {
		const response = await fetch(routes.api.recipes['[id]']._get(recipeId), {
			method: 'DELETE'
		});

		if (response.ok) {
			invalidate('recipes:list');
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
			{#each recipes as recipe, index}
				<tr
					class="cursor-pointer hover:bg-gray-100"
					on:click={() => (window.location.href = routes.przepisy['[id]']._get(recipe.id))}
				>
					<th>{index + 1}</th>
					<td>{recipe.name}</td>
					<td>
						<button
							aria-label="Delete"
							on:click|stopPropagation={() => {
								deleteRecipe(recipe.id);
							}}
							class="btn btn-ghost"
						>
							<DeleteIcon class="text-3xl text-red-500" />
						</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
