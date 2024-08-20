import { z } from 'zod';
import { ingredientSchema } from '../recipes/ingredient.schema';

export const editShoppingListSchema = z.object({
	id: z.string().min(1, 'Id jest wymagane'),
	name: z.string().min(1, 'Nazwa jest wymagana'),
	ingredients: z.array(ingredientSchema)
});
