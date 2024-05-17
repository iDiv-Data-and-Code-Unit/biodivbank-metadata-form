import { z } from 'zod';

export const datasetOverviewSchema = z
	.object({
		dataOrigin: z.object({
			originalOrCompiledDataset: z.enum(['Single Source', 'Compilation', 'Synthesis']),
			currentOrLegacyDataset: z.array(z.string()),
			dataSource: z.array(z.string())
		}),
		temporalScope: z
			.object({
				start: z.date(),
				end: z.date()
			})
			.optional(),
		geographicScope: z.object({
			extent: z.enum(['Local', 'National', 'Regional', 'Continental', 'Global']),
			countries: z.array(z.string()),
			marineRegions: z.array(z.string()),
			fieldStation: z
				.object({
					name: z.string(),
					rorId: z.string().regex(new RegExp('^0[a-z|0-9]{6}[0-9]{2}$')).optional(),
					noRorId: z.boolean().default(false)
				})
				.superRefine(({ rorId, noRorId }, fieldStationCtx) => {
					if (!noRorId && !rorId) {
						fieldStationCtx.addIssue({
							code: z.ZodIssueCode.custom,
							message: 'ROR Id is required',
							path: ['rorId']
						});
					}
				})
				.optional()
		}),
		realm: z.object({
			core: z.array(z.enum(['Freshwater', 'Marine', 'Terrestrial', 'Subterranean'])),
			transitional: z.array(
				z.enum([
					'Freshwater-Marine',
					'Marine-Freshwater-Terrestrial',
					'Terrestrial-Freshwater',
					'Subterranean-Freshwater',
					'Marine-Terrestrial',
					'Subterranean-Marine'
				])
			)
		}),
		biome: z.object({
			core: z.object({
				freshWater: z.array(z.enum(['Rivers and Streams', 'Lakes', 'Artificial wetlands'])),
				terrestrial: z.array(
					z.enum([
						'Tropical-subtropical forests',
						'Temperate-boreal forests and woodlands',
						'Shrublands and shrubby woodlands',
						'Savannas and grasslands',
						'Desserts and semi-desserts',
						'Polar/alpine (cryogenic)',
						'Intensive land-use'
					])
				),
				marine: z.array(
					z.enum([
						'Marine shelf',
						'Pelagic ocean waters',
						'Deep sea floors',
						'Anthropogenic marine'
					])
				),
				subterranean: z.array(z.enum(['Subterranean lithic', 'Anthropogenic subterranean voids']))
			}),
			transitional: z.object({
				freshWaterMarine: z.array(z.enum(['Semi-confined transitional waters'])),
				terrestrialFreshWater: z.array(z.enum(['Palustrine wetlands'])),
				marineTerrestrial: z.array(
					z.enum(['Shorelines', 'Supralittoral coastal', 'Anthropogenic shorelines'])
				),
				marineFreshWaterTerrestrial: z.array(z.enum(['Brackish Tidal'])),
				subterraneanFreshWater: z.array(
					z.enum(['Subterranean freshwaters', 'Anthropogenic subterranean freshwaters'])
				),
				subterraneanMarine: z.array(z.enum(['Subterranean tidal']))
			})
		}),
		taxonomicScope: z
			.object({
				kingdoms: z.array(
					z.enum(['Animalia', 'Fungi', 'Plantae', 'Chromista', 'Protozoa', 'Archaea', 'Bacteria'])
				),
				subDivisions: z.object({
					animalia: z.array(z.enum(['Macroinvertebrate', 'Microinvertebrate', 'Vertebrate'])),
					fungi: z.array(
						z.enum([
							'Blastoclads',
							'Chytrids',
							'Club fungi',
							'AM fungi (arbuscular mycorrhiza)',
							'Microsporans',
							'Neocallimastigomycetes',
							'Sac fungi',
							'Zygomycetes'
						])
					),
					plantae: z.array(
						z.enum([
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
						])
					),
					chromista: z.array(z.string()),
					protozoa: z.array(z.string()),
					archaea: z.array(z.string()),
					bacteria: z.array(z.string())
				})
			})
			.superRefine(({ kingdoms, subDivisions }, taxonomicCtx) => {
				if (!kingdoms.includes('Animalia') && subDivisions.animalia.length > 0) {
					taxonomicCtx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Animalia sub-divisions are only allowed if Animalia Kingdom is selected',
						path: ['subDivisions', 'animalia']
					});
				}
				if (!kingdoms.includes('Fungi') && subDivisions.fungi.length > 0) {
					taxonomicCtx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Fungi sub-divisions are only allowed if Fungi Kingdom is selected',
						path: ['subDivisions', 'fungi']
					});
				}
				if (!kingdoms.includes('Plantae') && subDivisions.plantae.length > 0) {
					taxonomicCtx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Plantae sub-divisions are only allowed if Plantae Kingdom is selected',
						path: ['subDivisions', 'plantae']
					});
				}
			})
	})
	.superRefine(({ realm, biome }, ctx) => {
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
