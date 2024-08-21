<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import type { GetRecipeDTO, Ingredient } from '$lib/server/modules/recipe/types';
	import type {
		CreateShoppingListDTO,
		EditShoppingListDTO,
		GetShoppingListDTO
	} from '$lib/server/modules/shopping-list/types';
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import { routes } from '../../../../routes';

	export let type: 'create' | 'edit';
	export let data: {
		shoppingList?: GetShoppingListDTO;
		form: SuperValidated<
			CreateShoppingListDTO | EditShoppingListDTO,
			string,
			CreateShoppingListDTO | EditShoppingListDTO
		>;
	};

	let recipes: GetRecipeDTO[] = [];

	async function fetchRecipes(params: URLSearchParams) {
		const page = params.get('page');
		let query = routes.api.recipes._get();

		if (page) {
			query += `page=${page}`;
		}

		const response = await fetch(query);
		recipes = await response.json();
	}

	$: if (browser) {
		fetchRecipes($page.url.searchParams);
	}

	const { form, errors, constraints, message, enhance, delayed } = superForm(data.form, {
		dataType: 'json',
		resetForm: type === 'create',
		delayMs: 0
	});

	function addRecipeIngredients(newIngredients: Ingredient[]) {
		const currentIngredients = [...$form.ingredients];

		newIngredients.map((newIngredient) => {
			const existingIngredient = currentIngredients.find(
				(ingredient) =>
					ingredient.name === newIngredient.name && ingredient.unit === newIngredient.unit
			);

			if (!existingIngredient) {
				currentIngredients.push({ ...newIngredient });
			} else {
				existingIngredient.quantity = String(
					Number(existingIngredient.quantity) + Number(newIngredient.quantity)
				);
			}
		});

		form.update(
			($form) => {
				$form.ingredients = currentIngredients.sort();
				return $form;
			},
			{ taint: false }
		);
	}

	function removeRecipeIngredients(newIngredients: Ingredient[]) {
		const currentIngredients = [...$form.ingredients];

		newIngredients.map((newIngredient) => {
			const existingIngredientIndex = currentIngredients.findIndex(
				(ingredient) =>
					ingredient.name === newIngredient.name && ingredient.unit === newIngredient.unit
			);

			if (existingIngredientIndex !== -1) {
				const newValue =
					Number(currentIngredients[existingIngredientIndex].quantity) -
					Number(newIngredient.quantity);

				if (newValue > 0) {
					currentIngredients[existingIngredientIndex].quantity = String(newValue);
				} else {
					currentIngredients.splice(existingIngredientIndex, 1);
				}
			}
		});

		form.update(
			($form) => {
				$form.ingredients = currentIngredients.sort();
				return $form;
			},
			{ taint: false }
		);
	}

	function removeIngredient(index: number) {
		form.update(
			($form) => {
				$form.ingredients = $form.ingredients.filter((_, i) => i !== index);
				return $form;
			},
			{ taint: false }
		);
	}

	function addIngredient() {
		form.update(
			($form) => {
				$form.ingredients = [...$form.ingredients, { name: '', quantity: '', unit: '' }];
				return $form;
			},
			{ taint: false }
		);
	}
</script>

<h1 class="text-3xl">
	{#if type === 'create'}
		Utwórz listę zakupów:
	{:else}
		Edytuj listę zakupów:
	{/if}
</h1>
<form method="POST" class="space-y-6 max-w-xl w-full mt-10" use:enhance>
	<div class="">
		<input
			id="name"
			placeholder="Nazwa listy"
			type="text"
			class="input input-bordered w-full mt-2"
			bind:value={$form.name}
			{...$constraints.name}
		/>
		{#if $errors.name}<span class="text-error">{$errors.name}</span>{/if}
	</div>

	<div class="flex flex-col gap-2">
		<h3 class="text-md text-center font-medium">Składniki:</h3>
		{#each $form.ingredients as _, index}
			<div class="flex items-center gap-x-2">
				<input
					placeholder="Nazwa składnika"
					type="text"
					class="input input-bordered w-full"
					bind:value={$form.ingredients[index].name}
					{...$constraints.ingredients?.[index]?.name}
				/>
				<input
					placeholder="Ilość"
					type="text"
					class="input input-bordered w-24"
					bind:value={$form.ingredients[index].quantity}
					{...$constraints.ingredients?.[index]?.quantity}
				/>
				<input
					placeholder="Jednostka"
					type="text"
					class="input input-bordered w-24"
					bind:value={$form.ingredients[index].unit}
					{...$constraints.ingredients?.[index]?.unit}
				/>
				<button type="button" class="btn btn-error" on:click={() => removeIngredient(index)}>
					-
				</button>
			</div>
			{#if $errors.ingredients?.[index]?.name}
				<span class="text-error">{$errors.ingredients[index].name}</span>
			{/if}
			{#if $errors.ingredients?.[index]?.quantity}
				<span class="text-error">{$errors.ingredients[index].quantity}</span>
			{/if}
			{#if $errors.ingredients?.[index]?.unit}
				<span class="text-error">{$errors.ingredients[index].unit}</span>
			{/if}
			{#if index === $form.ingredients.length - 1}
				<button type="button" class="btn btn-success btn-outline" on:click={addIngredient}>
					+
				</button>
			{/if}
		{/each}
		<!-- {#if $form.ingredients.length === 0} -->
		<!-- 	<button type="button" class="btn btn-success btn-outline" on:click={addIngredient}> -->
		<!-- 		+ -->
		<!-- 	</button> -->
		<!-- {/if} -->
	</div>

	<div class="flex flex-col gap-2">
		<h3 class="text-md text-center font-medium">Twoje przepisy:</h3>
		<div class="overflow-x-auto p-6">
			<table class="table w-full">
				<thead>
					<tr>
						<th>Nazwa przepisu</th>
						<th>Opcje</th>
					</tr>
				</thead>
				<tbody>
					{#each recipes as recipe}
						<tr>
							<td class="w-full">{recipe.name}</td>
							<td class="flex gap-2">
								<button
									type="button"
									aria-label="Add"
									on:click|stopPropagation={() => {
										addRecipeIngredients(recipe.ingredients);
									}}
									class="btn btn-success"
								>
									+
								</button>
								<button
									type="button"
									aria-label="Remove"
									on:click|stopPropagation={() => {
										removeRecipeIngredients(recipe.ingredients);
									}}
									class="btn btn-error"
								>
									-
								</button>
							</td>
						</tr>
						<!-- <div class="p-2">essa</div> -->
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<div class="flex flex-col gap-5 text-center">
		<button class="btn btn-primary w-full">
			{#if $delayed}
				<span class="loading loading-spinner" />
			{/if}
			{#if type === 'create'}
				Utwórz
			{:else}
				Zapisz
			{/if}
		</button>
	</div>

	{#if $message}<h3 class="text-lg font-semibold text-success">{$message}</h3>{/if}
</form>
