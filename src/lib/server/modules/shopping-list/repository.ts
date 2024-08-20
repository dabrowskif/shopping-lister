import { generateFakeId } from '../../utils';
import { fakeShoppingLists } from '../tests/mock-data';
import type {
	ShoppingList,
	CreateShoppingListDTO,
	EditShoppingListDTO,
	GetShoppingListDTO
} from './types';

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

	getShoppingListById(shoppingListId: string): GetShoppingListDTO {
		const shoppingList = shoppingLists.find((shopppingList) => shopppingList.id === shoppingListId);
		if (!shoppingList) {
			throw new Error('Nie znaleziono listy zakupów');
		}

		return {
			id: shoppingList.id,
			name: shoppingList.name,
			ingredients: shoppingList.ingredients
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
