import { z } from 'zod';

export const getRecipesSchema = z.object({
	page: z
		.preprocess((val) => Number(val), z.number().min(1, 'Page cannot be lower than 1'))
		.optional(),
	search: z.string().optional()
});
