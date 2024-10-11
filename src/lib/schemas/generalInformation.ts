import { z } from 'zod';

const orcIdRegEx	= new RegExp('^\\d{4}-\\d{4}-\\d{4}-\\d{4}$');
const rorIdRegEx	= new RegExp('^0[a-z|0-9]{6}[0-9]{2}$');
const initialsRegEx	= new RegExp('^[A-Z].( [A-Z].)*$');

// Define and export enums
export const AccessPolicyEnum = z.enum([
	'Open - CC0 1.0',
	'Open - CC BY 4.0',
	'Temporary embargo',
	'Request from author',
	'Restricted',
	'Other'
]);

export const ResourceTypeEnum = z.enum([
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
]);

export const zAuthorTypeSchema = z.object({
	firstName: z.string().min(1, { message: 'First name is required' }),
	initials: z.string().regex(initialsRegEx).optional().or(z.literal('')),
	familyName: z.string().min(1, { message: 'Family name is required' }),
	orcId: z.string().regex(orcIdRegEx).optional().or(z.literal('')),
	noOrcId: z.boolean().default(false),
	isPrimaryContact: z.boolean().default(false),
	email: z.string().email().optional().or(z.literal('')),
	institutionName: z.string().optional().or(z.literal('')),
	institutionCountry: z.string().optional().or(z.literal('')),
	rorId: z.string().regex(rorIdRegEx).optional().or(z.literal('')),
	noRorId: z.boolean().default(false)
}).superRefine(
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
		if (!noOrcId && !orcId) {
			authorCtx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'ORCiD is required',
				path: ['orcId']
			});
		}
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
			if (!noRorId && !rorId) {
				authorCtx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'ROR Id is required',
					path: ['rorId']
				});
			}
		}
	}
);

const zFunderTypeSchema = z.object({
	name: z.string().min(1, { message: 'Funder name is required' }),
	id: z.string().optional().or(z.literal('')),
	noFunderId: z.boolean().default(false),
	grantNumber: z.string().min(1, { message: 'Grant number is required' })
}).superRefine(({ id, noFunderId }, funderCtx) => {
	if (!noFunderId && !id) {
		funderCtx.addIssue({
			code: z.ZodIssueCode.custom,
			message: 'Funder Id is required',
			path: ['id']
		});
	}
});

const zDataProviderSchema = z.object({
	firstName: z.string().min(1, { message: 'First name is required' }),
	initials: z.string().regex(initialsRegEx).optional().or(z.literal('')),
	familyName: z.string().min(1, { message: 'Family name is required' }),
	orcId: z.string().regex(orcIdRegEx).optional().or(z.literal('')),
	noOrcId: z.boolean().default(false),
	email: z.string().email().min(1, { message: 'Email is required' }),
	institutionName: z.string().min(1, { message: 'Institution name is required' }),
	institutionCountry: z.string().min(1, { message: 'Institution country is required' }),
	rorId: z.string().regex(rorIdRegEx).optional().or(z.literal('')),
	noRorId: z.boolean().default(false)
}).superRefine(({ orcId, noOrcId, rorId, noRorId }, providerCtx) => {
	if (!noOrcId && !orcId) {
		providerCtx.addIssue({
			code: z.ZodIssueCode.custom,
			message: 'ORCiD is required',
			path: ['orcId']
		});
	}
	if (!noRorId && !rorId) {
		providerCtx.addIssue({
			code: z.ZodIssueCode.custom,
			message: 'ROR Id is required',
			path: ['rorId']
		});
	}
});

const zDatasetSchema = z.object({
	title: z.string().min(1, { message: 'Dataset title is required' }).max(100, { message: 'Dataset title is too long' }),
	abstract: z.string().min(1, { message: 'Dataset abstract is required' }).max(1500, { message: 'Dataset abstract is too long' }),
	accessPolicy: AccessPolicyEnum,
	license: z.string().optional().or(z.literal('')),
	embargoEndDate: z.string().regex(new RegExp('^[0-9]{4}-[0-9]{2}-[0-9]{2}$')).optional().or(z.literal(''))
}).superRefine(({ accessPolicy, embargoEndDate, license }, datasetCtx) => {
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
});

const zResourceSchema = z.object({
	type: ResourceTypeEnum,
	otherType: z.string().optional().or(z.literal('')),
	doi: z.string().min(1, { message: 'DOI is required' })
}).superRefine(({ type, otherType }, resourceCtx) => {
	if (type === 'Other' && !otherType) {
		resourceCtx.addIssue({
			code: z.ZodIssueCode.custom,
			message: 'Other type is required',
			path: ['otherType']
		});
	}
});

export const generalInformationSchema = z.object({
	dataProvider: zDataProviderSchema,
	dataset: zDatasetSchema,
	authors: z.array(zAuthorTypeSchema),
	funders: z.array(zFunderTypeSchema),
	resources: z.array(zResourceSchema)
});

export type generalInformationType = z.infer<typeof generalInformationSchema>;
export type authorType = z.infer<typeof zAuthorTypeSchema>;
export type funderType = z.infer<typeof zFunderTypeSchema>;
export type dataProviderType = z.infer<typeof zDataProviderSchema>;
export type datasetType = z.infer<typeof zDatasetSchema>;
export type resourceType = z.infer<typeof zResourceSchema>;
export type accessPolicyTypeEnum = z.infer<typeof AccessPolicyEnum>;



