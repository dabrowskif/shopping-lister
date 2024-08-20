import type { Recipe, Ingredient } from '../recipe/types';

export type CreateShoppingListDTO = Pick<ShoppingList, 'name'> & Pick<Recipe, 'ingredients'>;
export type EditShoppingListDTO = Pick<ShoppingList, 'id' | 'name'> & Pick<Recipe, 'ingredients'>;
export type GetShoppingListDTO = Pick<ShoppingList, 'id' | 'name'> & Pick<Recipe, 'ingredients'>;

export type ShoppingList = {
	id: string;
	name: string;
	ingredients: Ingredient[];
	ownerId: string;
};
