import { z } from 'zod';

export const generalInformationSchema = z.object({
	dataProvider: z
		.object({
			firstName: z.string().min(1, { message: 'First name is required' }),
			initial: z.string().regex(new RegExp('^[A-Z].( [A-Z].)*$')),
			familyName: z.string().min(1, { message: 'Family name is required' }),
			orcId: z.string().regex(new RegExp('^d{4}-d{4}-d{4}-d{4}$')).optional(),
			noOrcId: z.boolean().default(false),
			email: z.string().email(),
			institutionName: z.string().min(1, { message: 'Institution name is required' }),
			institutionCountry: z.string().min(1, { message: 'Institution country is required' }),
			rorId: z.string().regex(new RegExp('^0[a-z|0-9]{6}[0-9]{2}$')).optional(),
			noRorId: z.boolean().default(false)
		})
		.superRefine(({ orcId, noOrcId, rorId, noRorId }, providerCtx) => {
			// if noOrcId is false, make orcId required
			if (!noOrcId && !orcId) {
				providerCtx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'ORCiD is required',
					path: ['orcId']
				});
			}
			// if noRorId is false, make rorId required
			if (!noRorId && !rorId) {
				providerCtx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'ROR Id is required',
					path: ['rorId']
				});
			}
		}),
	dataset: z
		.object({
			title: z
				.string()
				.min(1, { message: 'Dataset title is required' })
				.max(100, { message: 'Dataset title is too long' }),
			abstract: z
				.string()
				.min(1, { message: 'Dataset abstract is required' })
				.max(1500, { message: 'Dataset abstract is too long' }),
			accessPolicy: z.enum([
				'Open - CC0 1.0',
				'Open - CC BY 4.0',
				'Temporary embargo',
				'Request from author',
				'Restricted',
				'Other'
			]),
			license: z.string().optional(),
			embargoEndDate: z.string().regex(new RegExp('^[0-9]{4}-[0-9]{2}-[0-9]{2}$')).optional()
		})
		.superRefine(({ accessPolicy, embargoEndDate, license }, datasetCtx) => {
			if (accessPolicy === 'Temporary embargo' && !embargoEndDate) {
				datasetCtx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Embargo end date is required',
					path: ['embargoEndDate']
				});
			}
			if (accessPolicy === 'Other' && !license) {
				datasetCtx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'License is required',
					path: ['license']
				});
			}
		}),
	authors: z.array(
		z
			.object({
				firstName: z.string().min(1, { message: 'First name is required' }),
				initial: z.string().regex(new RegExp('^[A-Z].( [A-Z].)*$')),
				familyName: z.string().min(1, { message: 'Family name is required' }),
				orcId: z.string().regex(new RegExp('^d{4}-d{4}-d{4}-d{4}$')).optional(),
				noOrcId: z.boolean().default(false),
				isPrimaryContact: z.boolean().default(false),
				email: z.string().email().optional(),
				institutionName: z.string().optional(),
				institutionCountry: z.string().optional(),
				rorId: z.string().regex(new RegExp('^0[a-z|0-9]{6}[0-9]{2}$')).optional(),
				noRorId: z.boolean().default(false)
			})
			.superRefine(
				(
					{
						orcId,
						noOrcId,
						isPrimaryContact,
						email,
						institutionCountry,
						institutionName,
						rorId,
						noRorId
					},
					authorCtx
				) => {
					// if noOrcId is false, make orcId required
					if (!noOrcId && !orcId) {
						authorCtx.addIssue({
							code: z.ZodIssueCode.custom,
							message: 'ORCiD is required',
							path: ['orcId']
						});
					}
					// Make certail fields required when author is primary contact
					if (isPrimaryContact) {
						if (!email) {
							authorCtx.addIssue({
								code: z.ZodIssueCode.custom,
								message: 'Email is required for primary contact',
								path: ['email']
							});
						}
						if (!institutionName) {
							authorCtx.addIssue({
								code: z.ZodIssueCode.custom,
								message: 'Institution name is required for primary contact',
								path: ['institutionName']
							});
						}
						if (!institutionCountry) {
							authorCtx.addIssue({
								code: z.ZodIssueCode.custom,
								message: 'Institution country is required for primary contact',
								path: ['institutionCountry']
							});
						}
						// if noRorId is false, make rorId required
						if (!noRorId && !rorId) {
							authorCtx.addIssue({
								code: z.ZodIssueCode.custom,
								message: 'ROR Id is required',
								path: ['rorId']
							});
						}
					}
				}
			)
	),
	funders: z.array(
		z
			.object({
				name: z.string().min(1, { message: 'Funder name is required' }),
				id: z.string().optional(),
				noFunderId: z.boolean().default(false),
				grantNumber: z.string().min(1, { message: 'Grant number is required' })
			})
			.superRefine(({ id, noFunderId }, funderCtx) => {
				if (!noFunderId && !id) {
					funderCtx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Funder Id is required',
						path: ['id']
					});
				}
			})
	),
	resources: z.array(
		z
			.object({
				type: z.enum([
					'Journal article',
					'Data paper',
					'Preprint',
					'Dataset',
					'Code (statistical script, model, package, software)',
					'Computational notebook',
					'Workflow',
					'Audio',
					'Audiovisual',
					'Book',
					'Book chapter',
					'Conference proceeding',
					'Dissertation',
					'Image',
					'Physical sample',
					'Other'
				]),
				otherType: z.string().optional(),
				doi: z.string().min(1, { message: 'DOI is required' })
			})
			.superRefine(({ type, otherType }, resourceCtx) => {
				if (type === 'Other' && !otherType) {
					resourceCtx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Other type is required',
						path: ['otherType']
					});
				}
			})
	)
});

export type GeneralInformation = z.infer<typeof generalInformationSchema>;
