import { superValidate } from 'sveltekit-superforms/client';
import { generalInformationSchema } from './schema';
import { fail, type Actions } from '@sveltejs/kit';

export const load = async () => {
	const form = await superValidate(generalInformationSchema);
	return { form };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, generalInformationSchema);
		console.log('POST', form);

		if (!form.valid) {
			return fail(400, { form });
		}

		return { form };
	}
};
