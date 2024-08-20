export type CreateRecipeDTO = Pick<Recipe, 'name' | 'ingredients'>;
export type EditRecipeDTO = Pick<Recipe, 'id' | 'name' | 'ingredients'>;
export type GetRecipeDTO = Pick<Recipe, 'id' | 'name' | 'ingredients'>;

export type Recipe = {
	id: string;
	name: string;
	ingredients: Ingredient[];
	ownerId: string;
};
export type Ingredient = {
	name: string;
	// FIXME: should be number
	quantity: string;
	unit: string;
};
