import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import type { Actions } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';

export const testSchema = z.object({
	name: z.string().default('Hello world'),
	email: z.string().email()
});

export const load = async () => {
	const form = await superValidate(testSchema);
	return { form };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, testSchema);
		console.log('POST', form);

		if (!form.valid) {
			return fail(400, { form });
		}

		return { form };
	}
};
