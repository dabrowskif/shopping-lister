import { z } from 'zod';
import { ingredientSchema } from './ingredient.schema';

export const editRecipeSchema = z.object({
	id: z.string().min(1, 'Id jest wymagane'),
	name: z.string().min(1, 'Nazwa jest wymagana'),
	ingredients: z.array(ingredientSchema)
});
