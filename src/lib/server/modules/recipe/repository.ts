import { fakeRecipes } from '../tests/mock-data';
import type { Recipe, CreateRecipeDTO, EditRecipeDTO, GetRecipeDTO } from './types';

const recipes: Recipe[] = fakeRecipes;

class RecipeRepository {
	createRecipe(createRecipeDTO: CreateRecipeDTO) {
		const ownerId = 'fakeOwnerId';
		const recipeId = generateFakeId();

		const ingredients = createRecipeDTO.ingredients.map((ingredient) => ({
			...ingredient
		}));
		recipes.push({
			id: recipeId,
			ownerId,
			name: createRecipeDTO.name,
			ingredients
		});
	}

	getAllRecipes(params?: {
		page?: number | undefined;
		search?: string | undefined;
	}): GetRecipeDTO[] {
		return recipes.map((recipe) => ({
			id: recipe.id,
			name: recipe.name,
			ingredients: recipe.ingredients
		}));
	}

	getRecipeById(recipeId: string): GetRecipeDTO {
		const recipe = recipes.find((recipe) => recipe.id === recipeId);
		if (!recipe) {
			throw new Error('Nie znaleziono przepisu');
		}

		return {
			id: recipe.id,
			name: recipe.name,
			ingredients: recipe.ingredients
		};
	}

	editRecipe(editRecipeDTO: EditRecipeDTO): void {
		const recipeIndex = recipes.findIndex((recipe) => recipe.id === editRecipeDTO.id);

		if (recipeIndex !== -1) {
			recipes[recipeIndex] = { ...recipes[recipeIndex], ...editRecipeDTO };
		} else {
			throw new Error('Nie znaleziono przepisu');
		}
	}

	removeRecipeById(recipeId: string): void {
		const recipeIndex = recipes.findIndex((recipe) => recipe.id === recipeId);
		if (recipeIndex !== -1) {
			recipes.splice(recipeIndex, 1);
		} else {
			throw new Error('Nie znaleziono przepisu');
		}
	}
}

const generateFakeId = (
	{ min = 0, max = 100000 }: { min?: number; max?: number } = { min: 0, max: 100000 }
) => `${Math.floor(Math.random() * (max - min + 1)) + min}`;

export const recipeRepository = new RecipeRepository();
