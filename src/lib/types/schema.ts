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
	embargoEndDate: string;
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
	riverCrossSection: RiverCrossSection;
	furtherInformation: string;
	multipleEvents: string[];
	envCharacteristics: string;
	inventory: {
		stage1: string[];
		stage2: string[];
		stage3: string[];
	};
	methodTypes: {
		stage1: string[];
		stage2: string[];
		stage3: string[];
	};
	effortIdentical: string;
	targetedAndExludedTaxa: {
		targeted: string;
		excluded: string;
	};
	otherTargetedSelectedCategories: string[];
	otherTargetedCategories: {
		sex: {
			targeted: string;
			excluded: string;
		};
		lifeStage: {
			targeted: string;
			excluded: string;
		};
		reproductiveCondition: {
			targeted: string;
			excluded: string;
		};
		growthForm: {
			targeted: string;
			excluded: string;
		};
		other: {
			name: string;
			targeted: string;
			excluded: string;
		};
	};
};

export type RiverCrossSection = {
	bank: string;
	surface: string;
	riparianZone: boolean;
	water: boolean;
	bed: string;
};
