import { z } from 'zod';

export const samplingDesignAndLocationSchema = z.object({
	studyDesign: z.object({
		multipleEvents: z.array(z.enum(['Multiple locations', 'Multiple time points', 'No']))
	}),
	methods: z.object({
		inventoryProcess: z
			.object({
				stageOne: z.array(
					z.enum([
						'Restricted search',
						'Open search',
						'Opportunistic search',
						'Trap or sample',
						'Adventitious'
					])
				),
				stageTwo: z.object({
					restrictedSearch: z.array(z.enum(['Plot', 'Transect', 'Quadrat', 'Plotless techniques'])),
					// never => not specified yet
					openSearch: z.never(),
					opportunisticSearch: z.never(),
					trapOrSample: z.never(),
					adventitious: z.never()
				}),
				stageThree: z.object({
					plot: z.array(z.enum(['Permanent', 'Non-permanent', 'Relevé'])),
					transect: z.array(
						z.enum([
							'Line transect',
							'Belt transect',
							'Bisect transect',
							'Pollard walk',
							'Manta tow'
						])
					),
					quadrat: z.array(z.enum(['Frame quadrat', 'Gridded quadrat', 'Point quadrat'])),
					plotlessTechniques: z.array(
						z.enum([
							'Closest individual method',
							'Nearest neighbour method',
							'Random pairs method',
							'Point-centred quarter (PCQ) method'
						])
					)
				})
			})
			.superRefine(({ stageOne, stageTwo, stageThree }, inventoryProcessCtx) => {
				if (!stageOne.includes('Restricted search') && stageTwo.restrictedSearch.length > 0) {
					inventoryProcessCtx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Restricted search stage two is only allowed if restricted search is selected',
						path: ['restrictedSearch']
					});
				}
				if (!stageTwo.restrictedSearch.includes('Plot') && stageThree.plot.length > 0) {
					inventoryProcessCtx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Plot stage three is only allowed if plot is selected',
						path: ['stageTwo', 'plot']
					});
				}
				if (!stageTwo.restrictedSearch.includes('Transect') && stageThree.transect.length > 0) {
					inventoryProcessCtx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Transect stage three is only allowed if transect is selected',
						path: ['stageTwo', 'transect']
					});
				}
				if (!stageTwo.restrictedSearch.includes('Quadrat') && stageThree.quadrat.length > 0) {
					inventoryProcessCtx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Quadrat stage three is only allowed if quadrat is selected',
						path: ['stageTwo', 'quadrat']
					});
				}
				if (
					!stageTwo.restrictedSearch.includes('Plotless techniques') &&
					stageThree.plotlessTechniques.length > 0
				) {
					inventoryProcessCtx.addIssue({
						code: z.ZodIssueCode.custom,
						message:
							'Plotless techniques stage three is only allowed if plotless techniques is selected',
						path: ['stageTwo', 'plotlessTechniques']
					});
				}
			}),
		methodType: z
			.object({
				stageOne: z.array(
					z.enum([
						'Human / direct observation',
						'Machine observation',
						'Capture',
						'Environmental sample',
						'Physical evidence'
					])
				),
				stageTwo: z.object({
					humanDirectObservation: z.array(z.enum(['Visual survey', 'Aural survey'])),
					machineObservation: z.array(
						z.enum([
							'Acoustic monitoring',
							'Camera / video trap',
							'Echolocation monitoring',
							'Radio tracking',
							'Passive integrated transponder (PIT) tracking',
							'Aerial observation (drone, aeroplane)',
							'Remotely operated underwater vehicle (ROV)',
							'Then a slight gap or separator',
							'Chlorophyll fluorescence imaging',
							'LIDAR / photonic sensing',
							'RADAR',
							'Thermal imaging'
						])
					),
					capture: z.array(
						z.enum([
							'Net',
							'Trap',
							'Trawl',
							'Chemical intent',
							'Chemical knockdown',
							'Electrofishing',
							'Mark-recapture'
						])
					),
					environmentalSample: z.array(
						z.enum(['Corer', 'Grab', 'Tullgren funnel', 'eDNA', 'Other'])
					),
					physicalEvidence: z.array(
						z.enum([
							'Burrow / nest',
							'Fur / hair',
							'Pellet',
							'Scat',
							'Tracks / other signs',
							'Other'
						])
					)
				}),
				stageThree: z.object({
					net: z.array(
						z.enum([
							'Aerial net',
							'Cannon net',
							'Kite net',
							'Mist net',
							'Sweep net',
							'Then a slight gap or separator',
							'Bongo net',
							'Gill net',
							'Kick net',
							'Manta / Neuston net',
							'Plankton net',
							'Pond net',
							'Pop-net trap',
							'PRPOOS net / Soutar-Hemingway Animal Trap',
							'Seine net',
							'Other'
						])
					),
					trap: z.array(
						z.enum([
							'Beating tray / drop cloth',
							'Bottle trap',
							'Harp trap',
							'Light trap',
							'Longworth trap',
							'Malaise trap',
							'Minnow trap',
							'Lures (bait stations, pheromone trap, dung trap)',
							'Pan trap',
							'Pitfall trap',
							'Pooter',
							'Sticky trap',
							'Suction trap / inverted leaf blower',
							'Other'
						])
					),
					trawl: z.array(z.enum(['Beam trawl', 'Bottom trawl', 'Hand trawl', 'Other'])),
					chemicalIntent: z.array(
						z.enum(['Mustard solution', 'Potassium permanganate solution', 'Other'])
					),
					chemicalKnockdown: z.array(z.enum(['Methyl bromide', 'Pyrethrin', 'Other'])),
					markRecapture: z.array(
						z.enum(['Branding', 'Elastomer', 'Mutilation', 'Paint', 'Powder', 'Tags', 'Other'])
					),
					// never => not specified yet
					corer: z.never(),
					grab: z.never(),
					tullgrenFunnel: z.never(),
					eDNA: z.never()
				})
			})
			.superRefine(({ stageOne, stageTwo, stageThree }, methodTypeCtx) => {
				if (!stageOne.includes('Capture') && stageTwo.capture.length > 0) {
					methodTypeCtx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Capture stage two is only allowed if capture is selected',
						path: ['capture']
					});
				}
				if (!stageOne.includes('Environmental sample') && stageTwo.environmentalSample.length > 0) {
					methodTypeCtx.addIssue({
						code: z.ZodIssueCode.custom,
						message:
							'Environmental sample stage two is only allowed if environmental sample is selected',
						path: ['environmentalSample']
					});
				}
				if (!stageOne.includes('Physical evidence') && stageTwo.physicalEvidence.length > 0) {
					methodTypeCtx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Physical evidence stage two is only allowed if physical evidence is selected',
						path: ['physicalEvidence']
					});
				}
				if (
					stageOne.includes('Human / direct observation') &&
					stageTwo.humanDirectObservation.length === 0
				) {
					methodTypeCtx.addIssue({
						code: z.ZodIssueCode.custom,
						message:
							'Human / direct observation stage two is required if human / direct observation is selected',
						path: ['humanDirectObservation']
					});
				}
				if (stageOne.includes('Machine observation') && stageTwo.machineObservation.length === 0) {
					methodTypeCtx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Machine observation stage two is required if machine observation is selected',
						path: ['machineObservation']
					});
				}

				if (!stageTwo.capture.includes('Net') && stageThree.net.length > 0) {
					methodTypeCtx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Net stage three is only allowed if net is selected',
						path: ['net']
					});
				}
				if (!stageTwo.capture.includes('Trap') && stageThree.trap.length > 0) {
					methodTypeCtx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Trap stage three is only allowed if trap is selected',
						path: ['trap']
					});
				}
				if (!stageTwo.capture.includes('Trawl') && stageThree.trawl.length > 0) {
					methodTypeCtx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Trawl stage three is only allowed if trawl is selected',
						path: ['trawl']
					});
				}
				if (!stageTwo.capture.includes('Chemical intent') && stageThree.chemicalIntent.length > 0) {
					methodTypeCtx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Chemical intent stage three is only allowed if chemical intent is selected',
						path: ['chemicalIntent']
					});
				}
				if (
					!stageTwo.capture.includes('Chemical knockdown') &&
					stageThree.chemicalKnockdown.length > 0
				) {
					methodTypeCtx.addIssue({
						code: z.ZodIssueCode.custom,
						message:
							'Chemical knockdown stage three is only allowed if chemical knockdown is selected',
						path: ['chemicalKnockdown']
					});
				}
				if (!stageTwo.capture.includes('Mark-recapture') && stageThree.markRecapture.length > 0) {
					methodTypeCtx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Mark-recapture stage three is only allowed if mark-recapture is selected',
						path: ['markRecapture']
					});
				}
			})
	}),
	samplingScope: z.object({
		targetedTaxa: z.string(),
		excludedTaxa: z.string(),
		specificCategory: z.object({
			sex: z
				.object({
					selected: z.boolean().default(false),
					targeted: z.string(),
					excluded: z.string()
				})
				.superRefine(({ selected, targeted, excluded }, sexCtx) => {
					if (selected && (!targeted || !excluded)) {
						sexCtx.addIssue({
							code: z.ZodIssueCode.custom,
							message: 'Targeted or excluded are required when selected',
							path: ['sex']
						});
					}
				}),
			lifeStageAgeClass: z
				.object({
					selected: z.boolean().default(false),
					targeted: z.string(),
					excluded: z.string()
				})
				.superRefine(({ selected, targeted, excluded }, lifeStageAgeClassCtx) => {
					if (selected && (!targeted || !excluded)) {
						lifeStageAgeClassCtx.addIssue({
							code: z.ZodIssueCode.custom,
							message: 'Targeted or excluded are required when selected',
							path: ['lifeStageAgeClass']
						});
					}
				}),
			reproductiveCondition: z
				.object({
					selected: z.boolean().default(false),
					targeted: z.string(),
					excluded: z.string()
				})
				.superRefine(({ selected, targeted, excluded }, reproductiveConditionCtx) => {
					if (selected && (!targeted || !excluded)) {
						reproductiveConditionCtx.addIssue({
							code: z.ZodIssueCode.custom,
							message: 'Targeted or excluded are required when selected',
							path: ['reproductiveCondition']
						});
					}
				}),
			growthForm: z
				.object({
					selected: z.boolean().default(false),
					targeted: z.string(),
					excluded: z.string()
				})
				.superRefine(({ selected, targeted, excluded }, growthFormCtx) => {
					if (selected && (!targeted || !excluded)) {
						growthFormCtx.addIssue({
							code: z.ZodIssueCode.custom,
							message: 'Targeted or excluded are required when selected',
							path: ['growthForm']
						});
					}
				}),
			other: z
				.object({
					selected: z.boolean().default(false),
					category: z.string(),
					targeted: z.string(),
					excluded: z.string()
				})
				.superRefine(({ selected, category, targeted, excluded }, otherCtx) => {
					if (selected && !category) {
						otherCtx.addIssue({
							code: z.ZodIssueCode.custom,
							message: 'Category must be provided if selected',
							path: ['other']
						});
					}
					if (selected && (!targeted || !excluded)) {
						otherCtx.addIssue({
							code: z.ZodIssueCode.custom,
							message: 'Targeted or excluded are required when selected',
							path: ['other']
						});
					}
				})
		}),
		underRepresentedTaxa: z.array(
			z.object({
				group: z.string().min(1, { message: 'Group is required' }),
				reason: z.string().min(1, { message: 'Reason is required' })
			})
		)
	}),
	samplingEffort: z
		.object({
			intensity: z.string(),
			effortIdentical: z.enum(['Yes', 'No', 'Unsure', 'Not applicable (only 1 sampling event']),
			description: z.string().optional()
		})
		.superRefine(({ effortIdentical, description }, effortCtx) => {
			if (effortIdentical === 'No' && !description) {
				effortCtx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Description is required when effort is not identical',
					path: ['description']
				});
			}
		}),
	samplingLocation: z.object({
		riverZone: z
			.object({
				zone: z.array(
					z.enum([
						'Source Zone (crenon)',
						'Upstream / transition zone  (rhithron)',
						'Downstream / floodplain zone  (potamon)',
						'Mouth',
						'Other'
					])
				),
				other: z.string().optional()
			})
			.superRefine(({ zone, other }, riverZoneCtx) => {
				if (zone.includes('Other') && !other) {
					riverZoneCtx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Other is required when selected',
						path: ['other']
					});
				}
			}),
		streamOrder: z
			.object({
				classificationSystem: z.enum([
					'Strahler',
					'Horton',
					'Shreve',
					'Hack',
					'Classical/Topological',
					'Other'
				]),
				value: z.enum(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']),
				other: z.string().optional()
			})
			.superRefine(({ classificationSystem, other }, streamOrderCtx) => {
				if (classificationSystem === 'Other' && !other) {
					streamOrderCtx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Other is required when selected',
						path: ['other']
					});
				}
			}),
		riverCrossSection: z
			.object({
				type: z
					.array(
						z.enum([
							'Bank',
							'Surface',
							'Water',
							'Bed',
							'Riparian Zone',
							'Riffle',
							'Rapids',
							'Levée',
							'Oxbow lake',
							'Meander belt',
							'Flood plain',
							'Alluvial plain',
							'Other area?'
						])
					)
					.min(1, { message: 'At least one type is required' }),
				bank: z.array(z.enum(['On Bank', 'In substrate'])),
				surface: z.array(z.enum(['On surface', 'Below surface'])),
				bed: z.array(z.enum(['Benthic water layer', 'On subtrate', 'In substrate'])),
				other: z.string().optional()
			})
			.superRefine(({ type, bank, surface, bed, other }, riverCrossSectionCtx) => {
				if (type.includes('Bank') && bank.length === 0) {
					riverCrossSectionCtx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Bank is required when selected',
						path: ['bank']
					});
				}
				if (type.includes('Surface') && surface.length === 0) {
					riverCrossSectionCtx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Surface is required when selected',
						path: ['surface']
					});
				}
				if (type.includes('Bed') && bed.length === 0) {
					riverCrossSectionCtx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Bed is required when selected',
						path: ['bed']
					});
				}
				if (type.includes('Surface') && bed.length === 0) {
					riverCrossSectionCtx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Bed is required when Surface is selected',
						path: ['bed']
					});
				}
				if (type.includes('Bank') && bed.length === 0) {
					riverCrossSectionCtx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Bed is required when Bank is selected',
						path: ['bed']
					});
				}
				if (!type.includes('Bank') && bank.length > 0) {
					riverCrossSectionCtx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Bank is not allowed when not selected',
						path: ['bank']
					});
				}
				if (!type.includes('Surface') && surface.length > 0) {
					riverCrossSectionCtx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Surface is not allowed when not selected',
						path: ['surface']
					});
				}
				if (!type.includes('Bed') && bed.length > 0) {
					riverCrossSectionCtx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Bed is not allowed when not selected',
						path: ['bed']
					});
				}
				if (type.includes('Other area?') && !other) {
					riverCrossSectionCtx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Other is required when selected',
						path: ['other']
					});
				}
				if (!type.includes('Other area?') && other) {
					riverCrossSectionCtx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Other is not allowed when not selected',
						path: ['other']
					});
				}
			}),
		vegetationLayer: z
			.object({
				layer: z.array(
					z.enum([
						'Tree layer',
						'Shrub layer',
						'Herb layer',
						'Moss layer',
						'Ground layer',
						'Did not sample in/on vegetation',
						'Unsure',
						'Other'
					])
				),
				other: z.string().optional()
			})
			.superRefine(({ layer, other }, vegetationLayerCtx) => {
				if (layer.includes('Other') && !other) {
					vegetationLayerCtx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Other is required when selected',
						path: ['other']
					});
				}
				if (!layer.includes('Other') && other) {
					vegetationLayerCtx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Other is not allowed when not selected',
						path: ['other']
					});
				}
			})
	}),
	furtherInformation: z.object({
		details: z.string()
	})
});
