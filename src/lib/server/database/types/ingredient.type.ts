import type { Ingredient } from '../../modules/recipe/types';
import { customJsonb } from '../custom';

export const ingredientJsonb = customJsonb<Ingredient[]>('ingredient');
