import { z } from 'zod';

export const ingredientSchema = z.object({
	name: z.string().min(1, 'Nazwa jest wymagana'),
	// FIXME: change to number
	quantity: z.string().min(1, 'Ilość musi być liczbą.'),
	unit: z.string().min(1, 'Jednostka jest wymagana')
});
