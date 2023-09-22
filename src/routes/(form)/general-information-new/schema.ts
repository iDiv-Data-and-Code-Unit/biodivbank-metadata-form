import * as z from 'zod';

async function validateORCIDviaAPI(orcid: string) {
	const orcIdUserUrl = 'https://pub.orcid.org/v3.0/' + orcid;
	const response = await fetch(orcIdUserUrl, {
		method: 'GET',
		headers: { Accept: 'application/xml' },
		redirect: 'follow'
	});
	if (!response.ok) {
		throw new Error('Invalid ORCID');
	}
}

export const generalInformationSchema = z.object({
	firstName: z.string().min(2, { message: 'First name must be at least 2 characters long' }),
	middleInitials: z
		.string()
		.refine((value) => /^[A-Z]\.(\s[A-Z]\.)*$/.test(value), {
			message: 'Please enter initials in capitals separated by a dot and a space. Eg: E. G.'
		})
		.optional(),
	familyName: z.string().min(2, { message: 'Family name must be at least 2 characters long' }),

	ORCiD: z
		.string()
		.refine(
			(value) => {
				const isValidOrcId = /^\d{0,4}(?:-\d{0,4}){0,3}$/.test(value);
				if (!isValidOrcId) return false;
			},
			{ message: 'Invalid OrcId' }
		)
		.refine(
			async (value) => {
				const isFullValidOrcId = /^\d{4,4}(?:-\d{4,4}){3,3}$/.test(value);
				if (!isFullValidOrcId) return false;

				try {
					await validateORCIDviaAPI(value);
					return true;
				} catch (error) {
					return false;
				}
			},
			{ message: 'OrcId does not exist' }
		)
		.optional()
});

export type GeneralInformation = z.infer<typeof generalInformationSchema>;
