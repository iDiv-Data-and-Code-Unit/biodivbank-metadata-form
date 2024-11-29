import type { ListAuthor, PrimaryContact } from './author';
import { z } from 'zod';
import { samplingDesignAndLocationSchema } from '$lib/schemas/samplingDesignAndLocation';
import { generalInformationSchema } from '$lib/schemas/generalInformation';
import { datasetOverviewSchema } from '$lib/schemas/datasetOverview';


export type SamplingDesign = z.infer<typeof samplingDesignAndLocationSchema>
export type GeneralInformation = z.infer<typeof generalInformationSchema>
export type DatasetOverview = z.infer<typeof datasetOverviewSchema>
export type LocalDataset = {
	id: number;
	generalInformation: GeneralInformation;
	datasetOverview: DatasetOverview;
	samplingDesign: SamplingDesign;
}

// export type Funder = {
// 	id: string;
// 	name: string;
// 	funderId: string;
// 	noFunderId: boolean;
// 	grantNumber: string;
// };

// export type Resource = {
// 	id: string;
// 	type: string;
// 	DOI: string;
// };

// export type GeneralInformation = {
// 	dataProvider: dataProviderType;
// 	dataset: datasetType;
// 	embargoEndDate: string;
// 	authors: Array<ListAuthor>;
// 	funders: Array<Funder>;
// 	resources: Array<Resource>;
// };

// export type dataProviderType ={
// 	firstName: string;
// 	initials: string;
// 	familyName: string;
// 	orcidId: string;
// 	noOrcidId: boolean;
// 	email: string;
// 	institutionName: string;
// 	institutionCountry: string;
// 	ror: string;
// 	noRor: boolean;
// };

// export type datasetType ={
// 	title: string;
// 	abstract: string;
// 	yearPublished: string;
// 	accessPolicy: string;
// 	license: string;
// }

// export type PersonalInformation = Pick<
// 	dataProviderType,
// 	'firstName' | 'initials' | 'familyName' | 'orcidId' | 'noOrcidId' | 'email'
// >;

// export type Institution = Pick<
// 	PrimaryContact,
// 	'institutionName' | 'institutionCountry' | 'ror' | 'noRor'
// >;

// export type DatasetMetadata = Pick<
// datasetType,
// 	'title' | 'yearPublished' | 'accessPolicy'
// >;

// export type DatasetAuthors = Pick<GeneralInformation, 'authors'>;

// export type DatasetOverview = {
// 	dataOrigin: dataOriginType;
// 	temporalScope: temporalScopeType;
// 	geographicScope:geographicScopeType
//  realm:	realmType;
// 	biome: biomeType;
// 	// coreRealmBiomes: Array<string>;
// 	// transitionalRealmBiomes: Array<string>;
// 	taxonomicScope: taxonomicScopeType;
// };

// export type dataOriginType	= {
// 	originalOrCompiledDataset: string;
// 	currentOrLegacyDataset: Array<string>;
// 	dataSource: Array<string>;
// }

// export type temporalScopeType = {	
// 	start: string;
// 	end: string;
// }

// export	type geographicScopeType = {	
// 	extent: string;
// 	countries: string[];
// 	marineRegions: string[];
// 	fieldStation: fieldStationType;
// }

// export type geoReferenceType={
// 	coordinateType: string;
// 	longitude: string;
// 	latitude: string;
// }

// export type fieldStationType = {
// 	name: string;
// 	rorId: string;
// 	noRorId: false;
// }

// export type realmType = {
// 	core: string[];
// 	transitional: string[];
// }

// export type biomeType = {
// 	core: coreType[];
// 	transitional: transitionalBiomeType[];
// }
// //biome.core[freshwater]
// export type coreType = {
// 	freshWater: string[];
// 	marine: string[];
// 	terrestrial: string[];
// 	subterranean: string[];
// }

// export type transitionalBiomeType = {
// 	freshWaterMarine: string[];
// 	terrestrialFreshWater: string[];
// 	marineTerrestrial: string[];
// 	marineFreshWaterTerrestrial: string[];
// 	subterraneanFreshWater: string[];
// 	subterraneanMarine: string[];
// }

// export	type taxonomicScopeType = {
// 	kingdom: string[];
// 	subdivision: subdivisionType[];
// }

// export	type subdivisionType = {
// 	animalia: string[];
// 	fungi: string[];
// 	plantae: string[];
// 	chromista: string[];
// 	protozoa: string[];
// 	archaea: string[];
// 	bacteria: string[];
// 	// greenAlgae: string[];
// }

//{
	// studyDesign: studyDesignType;
 // methods: methodsType;
	// samplingScope: samplingScopeType;

	// vegetationLayer: Array<string>;
	// riverZone: Array<string>;
	// riverCrossSection: RiverCrossSection;
	// furtherInformation: string;

	// envCharacteristics: string;

	// // methodTypes: {
	// // 	stage1: string[];
	// // 	stage2: string[];
	// // 	stage3: string[];
	// // };
	// effortIdentical: string;
	// effortVariation: string;
	// effortIntensity: string;
	// targetedAndExludedTaxa: {
	// 	targeted: string;
	// 	excluded: string;
	// };
	// otherTargetedSelectedCategories: string[];
	// otherTargetedCategories: {
	// 	sex: {
	// 		targeted: string;
	// 		excluded: string;
	// 	};
	// 	lifeStage: {
	// 		targeted: string;
	// 		excluded: string;
	// 	};
	// 	reproductiveCondition: {
	// 		targeted: string;
	// 		excluded: string;
	// 	};
	// 	growthForm: {
	// 		targeted: string;
	// 		excluded: string;
	// 	};
	// 	other: {
	// 		name: string;
	// 		targeted: string;
	// 		excluded: string;
	// 	};
	// };
	// underRepresented: {
	// 	group: string;
	// 	reason: string;
	// }[];
//};

// export type studyDesignType = {
// 	multipleEvents: string[];
// }
// export type methodsType	= {
// 	inventoryProcess: {
// 		stageOne: string[];
// 		stageTwo: methodsStage2Type[];
// 		stageThree: methodsStage3Type[];
// 	};
// 	methods: {
// 		stageOne: string[];
// 		stageTwo: methodsMethodsStageTwoType[];
// 		stageThree: methodsMethodsStageThreeType[];
// 	};
// }
// export type methodsStage2Type	= {
// 	restrictedSearch:	string[];
// 	openSearch:	string;
// 	opportunisticSearch:	string;
// 	trapOrSample:	string;
// 	adventitious:	string;
// }
// export type methodsStage3Type	= {
// 	plot:	string[];
// 	transect:	string[];
// 	quadrat:	string[];
// 	plotlessTechniques:	string[];

// }
// export type methodsMethodsStageTwoType = {
// 	humanDirectObservation: string[];
// 	machineObservation: string[];
// 	capture: string[];
// 	environmentalSample: string[];
// 	physicalEvidence: string[];

// }
// export type methodsMethodsStageThreeType = {
// 	net: string[];
// 	machineObservation: string[];
// 	trap: string[];
// 	trawl: string[];
// 	chemicalIntent: string[];
// 	markRecapture: string[];
// 	corer: string;
// 	grab: string;
// 	tullgrenFunnel: string;
// 	eDNA: string;
// }

// export type samplingScopeType = {
// 	targetdTaxa: string;
// 	excludedTaxa: string;
// 	specificCategory: specificCategoryType[];
// }
// export type specificCategoryType = {
// 	sex:sexType;
// }
// export type sexType={
	
// }
// export type RiverCrossSection = {
// 	bank: string;
// 	surface: string;
// 	riparianZone: boolean;
// 	water: boolean;
// 	bed: string;
// };
