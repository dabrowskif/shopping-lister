import { generateFakeId } from '../../utils';
import { fakeShoppingLists } from '../tests/mock-data';
import type { ShoppingList, CreateShoppingListDTO, EditShoppingListDTO } from './types';

const shoppingLists: ShoppingList[] = fakeShoppingLists;

class ShoppingListRepository {
	createShoppingList(createShoppingListDTO: CreateShoppingListDTO) {
		const ownerId = 'fakeOwnerId';
		const shoppingListId = generateFakeId();

		shoppingLists.push({
			id: shoppingListId,
			ownerId,
			name: createShoppingListDTO.name,
			ingredients: createShoppingListDTO.ingredients
		});
	}

	getAllShoppingLists() {
		return shoppingLists;
	}

	getShoppingListById(shoppingListId: string) {
		const shoppingList = shoppingLists.find((shopppingList) => shopppingList.id === shoppingListId);
		if (!shoppingList) {
			return null;
		}

		return {
			id: shoppingList.id,
			name: shoppingList.name
		};
	}

	editShoppingList(editShoppingListDTO: EditShoppingListDTO) {
		const shoppingListIndex = shoppingLists.findIndex(
			(shoppingList) => shoppingList.id === editShoppingListDTO.id
		);

		if (shoppingListIndex !== -1) {
			shoppingLists[shoppingListIndex] = {
				...shoppingLists[shoppingListIndex],
				...editShoppingListDTO
			};
		}
	}

	removeShoppingListById(shoppingListId: string) {
		const shoppingListIndex = shoppingLists.findIndex((recipe) => recipe.id === shoppingListId);
		if (shoppingListIndex !== -1) {
			shoppingLists.splice(shoppingListIndex, 1);
		}
	}
}

export const shopppingListRepository = new ShoppingListRepository();
