import type { Recipe } from '../recipe/types';
import type { ShoppingList } from '../shopping-list/types';

export const fakeRecipes: Recipe[] = [
	{
		id: '1',
		name: 'Pierogi Ruskie',
		ingredients: [
			{ name: 'mąka', quantity: '500', unit: 'g' },
			{ name: 'ziemniaki', quantity: '300', unit: 'g' },
			{ name: 'ser biały', quantity: '200', unit: 'g' },
			{ name: 'cebula', quantity: '1', unit: 'sztuka' },
			{ name: 'jajko', quantity: '1', unit: 'sztuka' }
		],
		ownerId: 'user1'
	},
	{
		id: '2',
		name: 'Zupa Pomidorowa',
		ingredients: [
			{ name: 'pomidory', quantity: '500', unit: 'g' },
			{ name: 'cebula', quantity: '1', unit: 'sztuka' },
			{ name: 'marchewka', quantity: '1', unit: 'sztuka' },
			{ name: 'bulion', quantity: '1', unit: 'l' },
			{ name: 'śmietana', quantity: '100', unit: 'ml' }
		],
		ownerId: 'user2'
	},
	{
		id: '3',
		name: 'Sałatka Cezar',
		ingredients: [
			{ name: 'sałata rzymska', quantity: '1', unit: 'główka' },
			{ name: 'grzanki', quantity: '100', unit: 'g' },
			{ name: 'ser parmezan', quantity: '50', unit: 'g' },
			{ name: 'filet z kurczaka', quantity: '200', unit: 'g' },
			{ name: 'sos Cezar', quantity: '50', unit: 'ml' }
		],
		ownerId: 'user3'
	},
	{
		id: '4',
		name: 'Kotlety Schabowe',
		ingredients: [
			{ name: 'schab', quantity: '500', unit: 'g' },
			{ name: 'bułka tarta', quantity: '100', unit: 'g' },
			{ name: 'jajko', quantity: '2', unit: 'sztuki' },
			{ name: 'mąka', quantity: '100', unit: 'g' },
			{ name: 'olej', quantity: '200', unit: 'ml' }
		],
		ownerId: 'user1'
	},
	{
		id: '5',
		name: 'Pancakes',
		ingredients: [
			{ name: 'mąka', quantity: '200', unit: 'g' },
			{ name: 'mleko', quantity: '250', unit: 'ml' },
			{ name: 'jajko', quantity: '2', unit: 'sztuki' },
			{ name: 'cukier', quantity: '50', unit: 'g' },
			{ name: 'proszek do pieczenia', quantity: '10', unit: 'g' }
		],
		ownerId: 'user2'
	}
];

export const fakeShoppingLists: ShoppingList[] = [
	{
		id: '1',
		name: 'Lista na obiad',
		ingredients: [
			{ name: 'mąka', quantity: '600', unit: 'g' },
			{ name: 'ziemniaki', quantity: '300', unit: 'g' },
			{ name: 'ser biały', quantity: '200', unit: 'g' },
			{ name: 'pomidory', quantity: '500', unit: 'g' },
			{ name: 'bulion', quantity: '1', unit: 'l' }
		],
		ownerId: 'user1'
	},
	{
		id: '2',
		name: 'Lista na śniadanie',
		ingredients: [
			{ name: 'mąka', quantity: '200', unit: 'g' },
			{ name: 'mleko', quantity: '250', unit: 'ml' },
			{ name: 'jajko', quantity: '4', unit: 'sztuki' },
			{ name: 'cukier', quantity: '50', unit: 'g' },
			{ name: 'proszek do pieczenia', quantity: '10', unit: 'g' }
		],
		ownerId: 'user2'
	},
	{
		id: '3',
		name: 'Lista na kolację',
		ingredients: [
			{ name: 'schab', quantity: '500', unit: 'g' },
			{ name: 'bułka tarta', quantity: '100', unit: 'g' },
			{ name: 'jajko', quantity: '2', unit: 'sztuki' },
			{ name: 'olej', quantity: '200', unit: 'ml' },
			{ name: 'sałata rzymska', quantity: '1', unit: 'główka' }
		],
		ownerId: 'user3'
	}
];
