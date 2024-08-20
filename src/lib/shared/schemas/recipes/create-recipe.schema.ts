import { z } from 'zod';
import { ingredientSchema } from './ingredient.schema';

export const createRecipeSchema = z.object({
	name: z.string().min(1, 'Nazwa jest wymagana'),
	ingredients: z.array(ingredientSchema)
});
