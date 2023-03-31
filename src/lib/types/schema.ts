import type { ListAuthor } from './author';

export type Funder = {
	id: string;
	name: string;
	funderId: string;
	noFunderId: boolean;
	grantNumber: string;
};

export type Resource = {
	id: string;
	type: string;
	DOI: string;
};

export type GeneralInformation = {
	firstName: string;
	initials: string;
	familyName: string;
	orcidId: string;
	noOrcidId: boolean;
	email: string;
	institutionName: string;
	institutionCountry: string;
	ror: string;
	noRor: boolean;
	datasetTitle: string;
	datasetAbstract: string;
	yearPublished: string;
	accessPolicy: string;
	authors: Array<ListAuthor>;
	funders: Array<Funder>;
	resources: Array<Resource>;
};

export type PersonalInformation = Pick<
	GeneralInformation,
	'firstName' | 'initials' | 'familyName' | 'orcidId' | 'noOrcidId' | 'email'
>;

export type Institution = Pick<
	GeneralInformation,
	'institutionName' | 'institutionCountry' | 'ror' | 'noRor'
>;

export type DatasetMetadata = Pick<
	GeneralInformation,
	'datasetTitle' | 'yearPublished' | 'accessPolicy'
>;

export type DatasetAuthors = Pick<GeneralInformation, 'authors'>;

export type DatasetOverview = {
	originalOrCompiledDataset: string;
	currentOrLegacyDataset: string;
	dataSource: Array<string>;
	temporalScopeStart: string;
	temporalScopeEnd: string;
	spatialScope: string;
	country: string;
	coordinateType: string;
	longitude: string;
	latitude: string;
	fieldStation: string;
	fieldStationROR: string;
	fieldStationNoROR: false;
	coreRealms: Array<string>;
	transitionalRealms: Array<string>;
	coreRealmBiomes: Array<string>;
	transitionalRealmBiomes: Array<string>;
	kingdoms: Array<string>;
	subDivisions: Array<string>;
};

export type SamplingDesign = {
	vegetationLayer: Array<string>;
	riverZone: Array<string>;
};