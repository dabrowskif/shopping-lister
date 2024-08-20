export const generateFakeId = (
	{ min = 0, max = 100000 }: { min?: number; max?: number } = { min: 0, max: 100000 }
) => `${Math.floor(Math.random() * (max - min + 1)) + min}`;
