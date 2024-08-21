<script lang="ts">
	import type {
		CreateRecipeDTO,
		EditRecipeDTO,
		GetRecipeDTO
	} from '$lib/server/modules/recipe/types';
	import { superForm, type SuperValidated } from 'sveltekit-superforms';

	export let data: {
		recipe?: GetRecipeDTO;
		form: SuperValidated<CreateRecipeDTO | EditRecipeDTO, string, CreateRecipeDTO | EditRecipeDTO>;
	};
	export let type: 'create' | 'edit';

	const { form, errors, constraints, message, enhance, delayed } = superForm(data.form, {
		dataType: 'json',
		resetForm: type === 'create',
		delayMs: 0
	});

	function addIngredient() {
		form.update(
			($form) => {
				$form.ingredients = [...$form.ingredients, { name: '', quantity: '', unit: '' }];
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
</script>

<h1 class="text-3xl">
	{#if type === 'create'}
		Utwórz przepis:
	{:else}
		Edytuj przepis:
	{/if}
</h1>
<form method="POST" class="space-y-6 max-w-xl w-full mt-10" use:enhance>
	<div class="">
		<input
			id="name"
			placeholder="Nazwa przepisu"
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
					Usuń
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
		{#if $form.ingredients.length === 0}
			<button type="button" class="btn btn-success btn-outline" on:click={addIngredient}>
				+
			</button>
		{/if}
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
