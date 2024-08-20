import { z } from 'zod';
import { ingredientSchema } from '../recipes/ingredient.schema';

export const createShoppingListSchema = z.object({
	name: z.string().min(1, 'Nazwa jest wymagana'),
	ingredients: z.array(ingredientSchema)
});
