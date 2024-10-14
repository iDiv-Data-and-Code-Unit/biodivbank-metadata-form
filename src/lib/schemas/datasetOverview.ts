import { z } from 'zod';

// Enums
export const OriginalOrCompiledDatasetEnum = z.enum(['Single Source', 'Compilation', 'Synthesis']);
export const ExtentEnum = z.enum(['Local', 'National', 'Regional', 'Continental', 'Global']);
export const RealmCoreEnum = z.enum(['Freshwater', 'Marine', 'Terrestrial', 'Subterranean']);
export const RealmTransitionalEnum = z.enum([
	'Freshwater-Marine',
	'Marine-Freshwater-Terrestrial',
	'Terrestrial-Freshwater',
	'Subterranean-Freshwater',
	'Marine-Terrestrial',
	'Subterranean-Marine'
]);
export const FreshWaterBiomeEnum = z.enum(['Rivers and Streams', 'Lakes', 'Artificial wetlands']);
export const TerrestrialBiomeEnum = z.enum([
	'Tropical-subtropical forests',
	'Temperate-boreal forests and woodlands',
	'Shrublands and shrubby woodlands',
	'Savannas and grasslands',
	'Desserts and semi-desserts',
	'Polar/alpine (cryogenic)',
	'Intensive land-use'
]);
export const MarineBiomeEnum = z.enum([
	'Marine shelf',
	'Pelagic ocean waters',
	'Deep sea floors',
	'Anthropogenic marine'
]);
export const SubterraneanBiomeEnum = z.enum(['Subterranean lithic', 'Anthropogenic subterranean voids']);
export const FreshWaterMarineBiomeEnum = z.enum(['Semi-confined transitional waters']);
export const TerrestrialFreshWaterBiomeEnum = z.enum(['Palustrine wetlands']);
export const MarineTerrestrialBiomeEnum = z.enum([
	'Shorelines',
	'Supralittoral coastal',
	'Anthropogenic shorelines'
]);
export const MarineFreshWaterTerrestrialBiomeEnum = z.enum(['Brackish Tidal']);
export const SubterraneanFreshWaterBiomeEnum = z.enum([
	'Subterranean freshwaters',
	'Anthropogenic subterranean freshwaters'
]);
export const SubterraneanMarineBiomeEnum = z.enum(['Subterranean tidal']);
export const KingdomEnum = z.enum(['Animalia', 'Fungi', 'Plantae', 'Chromista', 'Protozoa', 'Archaea', 'Bacteria']);
export const AnimaliaSubDivisionEnum = z.enum(['Macroinvertebrate', 'Microinvertebrate', 'Vertebrate']);
export const FungiSubDivisionEnum = z.enum([
	'Blastoclads',
	'Chytrids',
	'Club fungi',
	'AM fungi (arbuscular mycorrhiza)',
	'Microsporans',
	'Neocallimastigomycetes',
	'Sac fungi',
	'Zygomycetes'
]);
export const PlantaeSubDivisionEnum = z.enum([
	'Angiosperms',
	'Clubmosses & spikemosses',
	'Conifers',
	'Cycads',
	'Ferns',
	'Gingko',
	'Gnetophyta',
	'Hornworts',
	'Liverworts',
	'Mosses',
	'Charophyta',
	'Chlorophyta',
	'Glaucophyta',
	'Rhodophyta (red algae)'
]);

// Objects
export const DataOriginSchema = z.object({
	originalOrCompiledDataset: OriginalOrCompiledDatasetEnum,
	currentOrLegacyDataset: z.array(z.string()).min(1, { message: 'Current or legacy dataset is required' }),
	dataSource: z.array(z.string()).min(1, { message: 'Data source is required' })
});

export const TemporalScopeSchema = z.object({
	start: z.date(),
	end: z.date()
}).optional();

export const FieldStationSchema = z.object({
	name: z.string(),
	rorId: z.string().regex(new RegExp('^0[a-z|0-9]{6}[0-9]{2}$')).optional(),
	noRorId: z.boolean().default(false)
}).superRefine(({ rorId, noRorId }, fieldStationCtx) => {
	if (!noRorId && !rorId) {
		fieldStationCtx.addIssue({
			code: z.ZodIssueCode.custom,
			message: 'ROR Id is required',
			path: ['rorId']
		});
	}
}).optional();

export const GeographicScopeSchema = z.object({
	extent: ExtentEnum,
	countries: z.array(z.string()),
	marineRegions: z.array(z.string()),
	fieldStation: FieldStationSchema
});

export const RealmSchema = z.object({
	core: z.array(RealmCoreEnum),
	transitional: z.array(RealmTransitionalEnum)
});

export const BiomeCoreSchema = z.object({
	freshWater: z.array(FreshWaterBiomeEnum),
	terrestrial: z.array(TerrestrialBiomeEnum),
	marine: z.array(MarineBiomeEnum),
	subterranean: z.array(SubterraneanBiomeEnum)
});

export const BiomeTransitionalSchema = z.object({
	freshWaterMarine: z.array(FreshWaterMarineBiomeEnum),
	terrestrialFreshWater: z.array(TerrestrialFreshWaterBiomeEnum),
	marineTerrestrial: z.array(MarineTerrestrialBiomeEnum),
	marineFreshWaterTerrestrial: z.array(MarineFreshWaterTerrestrialBiomeEnum),
	subterraneanFreshWater: z.array(SubterraneanFreshWaterBiomeEnum),
	subterraneanMarine: z.array(SubterraneanMarineBiomeEnum)
});

export const BiomeSchema = z.object({
	core: BiomeCoreSchema,
	transitional: BiomeTransitionalSchema
});

export const SubDivisionsSchema = z.object({
	animalia: z.array(AnimaliaSubDivisionEnum),
	fungi: z.array(FungiSubDivisionEnum),
	plantae: z.array(PlantaeSubDivisionEnum),
	chromista: z.array(z.string()),
	protozoa: z.array(z.string()),
	archaea: z.array(z.string()),
	bacteria: z.array(z.string())
});

export const TaxonomicScopeSchema = z.object({
	kingdom: z.array(KingdomEnum),
	subDivisions: SubDivisionsSchema
}).superRefine(({ kingdom, subDivisions }, taxonomicCtx) => {
	if (!kingdom.includes('Animalia') && subDivisions.animalia.length > 0) {
		taxonomicCtx.addIssue({
			code: z.ZodIssueCode.custom,
			message: 'Animalia sub-divisions are only allowed if Animalia Kingdom is selected',
			path: ['subDivisions', 'animalia']
		});
	}
	if (!kingdom.includes('Fungi') && subDivisions.fungi.length > 0) {
		taxonomicCtx.addIssue({
			code: z.ZodIssueCode.custom,
			message: 'Fungi sub-divisions are only allowed if Fungi Kingdom is selected',
			path: ['subDivisions', 'fungi']
		});
	}
	if (!kingdom.includes('Plantae') && subDivisions.plantae.length > 0) {
		taxonomicCtx.addIssue({
			code: z.ZodIssueCode.custom,
			message: 'Plantae sub-divisions are only allowed if Plantae Kingdom is selected',
			path: ['subDivisions', 'plantae']
		});
	}
});

export const datasetOverviewSchema = z.object({
	dataOrigin: DataOriginSchema,
	temporalScope: TemporalScopeSchema,
	geographicScope: GeographicScopeSchema,
	realm: RealmSchema,
	biome: BiomeSchema,
	taxonomicScope: TaxonomicScopeSchema
}).superRefine(({ realm, biome }, ctx) => {
	if (!realm.core.includes('Freshwater') && biome.core.freshWater.length > 0) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: 'Freshwater Biomes are only allowed if Freshwater Realm is selected',
			path: ['biome', 'core', 'freshWater']
		});
	}
	if (!realm.core.includes('Terrestrial') && biome.core.terrestrial.length > 0) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: 'Terrestrial Biomes are only allowed if Terrestrial Realm is selected',
			path: ['biome', 'core', 'terrestrial']
		});
	}
	if (!realm.core.includes('Marine') && biome.core.marine.length > 0) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: 'Marine Biomes are only allowed if Marine Realm is selected',
			path: ['biome', 'core', 'marine']
		});
	}
	if (!realm.core.includes('Subterranean') && biome.core.subterranean.length > 0) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: 'Subterranean Biomes are only allowed if Subterranean Realm is selected',
			path: ['biome', 'core', 'subterranean']
		});
	}
	if (
		!realm.transitional.includes('Freshwater-Marine') &&
		biome.transitional.freshWaterMarine.length > 0
	) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: 'Freshwater-Marine Biomes are only allowed if Freshwater-Marine Realm is selected',
			path: ['biome', 'transitional', 'freshWaterMarine']
		});
	}
	if (
		!realm.transitional.includes('Terrestrial-Freshwater') &&
		biome.transitional.terrestrialFreshWater.length > 0
	) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message:
				'Terrestrial-Freshwater Biomes are only allowed if Terrestrial-Freshwater Realm is selected',
			path: ['biome', 'transitional', 'terrestrialFreshWater']
		});
	}
	if (
		!realm.transitional.includes('Marine-Terrestrial') &&
		biome.transitional.marineTerrestrial.length > 0
	) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message:
				'Marine-Terrestrial Biomes are only allowed if Marine-Terrestrial Realm is selected',
			path: ['biome', 'transitional', 'marineTerrestrial']
		});
	}
	if (
		!realm.transitional.includes('Marine-Freshwater-Terrestrial') &&
		biome.transitional.marineFreshWaterTerrestrial.length > 0
	) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message:
				'Marine-Freshwater-Terrestrial Biomes are only allowed if Marine-Freshwater-Terrestrial Realm is selected',
			path: ['biome', 'transitional', 'marineFreshWaterTerrestrial']
		});
	}
	if (
		!realm.transitional.includes('Subterranean-Freshwater') &&
		biome.transitional.subterraneanFreshWater.length > 0
	) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message:
				'Subterranean-Freshwater Biomes are only allowed if Subterranean-Freshwater Realm is selected',
			path: ['biome', 'transitional', 'subterraneanFreshWater']
		});
	}
	if (
		!realm.transitional.includes('Subterranean-Marine') &&
		biome.transitional.subterraneanMarine.length > 0
	) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message:
				'Subterranean-Marine Biomes are only allowed if Subterranean-Marine Realm is selected',
			path: ['biome', 'transitional', 'subterraneanMarine']
		});
	}
});

// Types
export type DataOrigin = z.infer<typeof DataOriginSchema>;
export type TemporalScope = z.infer<typeof TemporalScopeSchema>;
export type FieldStation = z.infer<typeof FieldStationSchema>;
export type GeographicScope = z.infer<typeof GeographicScopeSchema>;
export type Realm = z.infer<typeof RealmSchema>;
export type BiomeCore = z.infer<typeof BiomeCoreSchema>;
export type BiomeTransitional = z.infer<typeof BiomeTransitionalSchema>;
export type Biome = z.infer<typeof BiomeSchema>;
export type SubDivisions = z.infer<typeof SubDivisionsSchema>;
export type TaxonomicScope = z.infer<typeof TaxonomicScopeSchema>;
export type DatasetOverview = z.infer<typeof datasetOverviewSchema>;
