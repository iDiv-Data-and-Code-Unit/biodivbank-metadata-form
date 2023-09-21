import { z } from 'zod';

export const testSchema = z.object({
	name: z.string().min(2).max(100).default('Hello world'),
	email: z.string().email()
});
