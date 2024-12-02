import { z } from 'zod';
/**not in xsd/ */
export const envCharacteristicsEnum = z.enum(['Identical', 'Largely similar', 'Variable']);

/*********************/

export const multipleEventsEnum = z.enum(['Multiple locations', 'Multiple time points', 'No']);

export const stageOneInventoryProcessEnum = z.enum([
  'Restricted search',
  'Open search',
  'Opportunistic search',
  'Trap or sample',
  'Adventitious'
]);

export const stageTwoRestrictedSearchEnum = z.enum([
  'Plot',
  'Transect',
  'Quadrat',
  'Plotless techniques'
]);

export const stageThreePlotEnum = z.enum([
  'Permanent',
  'Non-permanent',
  'Relevé'
]);

export const stageThreeTransectEnum = z.enum([
  'Line transect',
  'Belt transect',
  'Bisect transect',
  'Pollard walk',
  'Manta tow'
]);

export const stageThreeQuadratEnum = z.enum([
  'Frame quadrat',
  'Gridded quadrat',
  'Point quadrat'
]);

export const stageThreePlotlessTechniquesEnum = z.enum([
  'Closest individual method',
  'Nearest neighbour method',
  'Random pairs method',
  'Point-centred quarter (PCQ) method'
]);

export const stageOneMethodTypeEnum = z.enum([
  'Human / direct observation',
  'Machine observation',
  'Capture',
  'Environmental sample',
  'Physical evidence'
]);

export const stageTwoHumanDirectObservationEnum = z.enum([
  'Visual survey',
  'Aural survey'
]);

export const stageTwoMachineObservationEnum = z.enum([
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
]);

export const stageTwoCaptureEnum = z.enum([
  'Net',
  'Trap',
  'Trawl',
  'Chemical intent',
  'Chemical knockdown',
  'Electrofishing',
  'Mark-recapture'
]);

export const stageTwoEnvironmentalSampleEnum = z.enum([
  'Corer',
  'Grab',
  'Tullgren funnel',
  'eDNA',
  'Other'
]);

export const stageTwoPhysicalEvidenceEnum = z.enum([
  'Burrow / nest',
  'Fur / hair',
  'Pellet',
  'Scat',
  'Tracks / other signs',
  'Other'
]);

export const stageThreeNetEnum = z.enum([
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
]);

export const stageThreeTrapEnum = z.enum([
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
]);

export const stageThreeTrawlEnum = z.enum([
  'Beam trawl',
  'Bottom trawl',
  'Hand trawl',
  'Other'
]);

export const stageThreeChemicalIntentEnum = z.enum([
  'Mustard solution',
  'Potassium permanganate solution',
  'Other'
]);

export const stageThreeChemicalKnockdownEnum = z.enum([
  'Methyl bromide',
  'Pyrethrin',
  'Other'
]);

export const stageThreeMarkRecaptureEnum = z.enum([
  'Branding',
  'Elastomer',
  'Mutilation',
  'Paint',
  'Powder',
  'Tags',
  'Other'
]);

export const EffortIdenticalEnum = z.enum(['Yes', 'No', 'Unsure', 'Not applicable (only 1 sampling event)']);
export const ZoneEnum = z.enum([
  'Source Zone (crenon)',
  'Upstream / transition zone  (rhithron)',
  'Downstream / floodplain zone  (potamon)',
  'Mouth',
  'Other'
]);
export const ClassificationSystemEnum = z.enum([
  'Strahler',
  'Horton',
  'Shreve',
  'Hack',
  'Classical/Topological',
  'Other'
]);
export const StreamOrderValueEnum = z.enum(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']);
export const RiverCrossSectionTypeEnum = z.enum([
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
]);
export const BankEnum = z.enum(['On Bank', 'In substrate']);
export const SurfaceEnum = z.enum(['On surface', 'Below surface']);
export const BedEnum = z.enum(['Benthic water layer', 'On subtrate', 'In substrate']);
export const VegetationLayerEnum = z.enum([
  'Tree layer',
  'Shrub layer',
  'Herb layer',
  'Moss layer',
  'Ground layer',
  'Did not sample in/on vegetation',
  'Unsure',
  'Other'
]);

export const CategoryEnum = z.enum([
  'Sex',
  'Life stage / age class',
  'Reproductive condition',
  'Growth form',
  'Other category',
  // 'Other'
]);

export const CategoryKeys = z.enum([
  'sex',
  'lifeStageAgeClass',
  'reproductiveCondition',
  'growthForm',
  'other'
])

export const studyDesignSchema = z.object({
  multipleEvents: z.array(multipleEventsEnum)
});


// Stage Objects
export const stageOneInventoryProcess = z.object({
  stageOne: z.array(stageOneInventoryProcessEnum),
  stageTwo: z.object({
    restrictedSearch: z.array(stageTwoRestrictedSearchEnum),
    openSearch: z.never(),
    opportunisticSearch: z.never(),
    trapOrSample: z.never(),
    adventitious: z.never()
  }),
  stageThree: z.object({
    plot: z.array(stageThreePlotEnum),
    transect: z.array(stageThreeTransectEnum),
    quadrat: z.array(stageThreeQuadratEnum),
    plotlessTechniques: z.array(stageThreePlotlessTechniquesEnum)
  })
}).superRefine(({ stageOne, stageTwo, stageThree }, inventoryProcessCtx) => {
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
});

export const stageOneMethodType = z.object({
  stageOne: z.array(stageOneMethodTypeEnum),
  stageTwo: z.object({
    humanDirectObservation: z.array(stageTwoHumanDirectObservationEnum),
    machineObservation: z.array(stageTwoMachineObservationEnum),
    capture: z.array(stageTwoCaptureEnum),
    environmentalSample: z.object({
      values: z.array(stageTwoEnvironmentalSampleEnum),
      other: z.string().optional()
    }).superRefine(({ values, other }, environmentalSampleCtx) => {
      if (values.includes('Other') && !other) {
        environmentalSampleCtx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Other is required when selected',
          path: ['other']
        });
      }
    }),
    physicalEvidence: z.object({
      values: z.array(stageTwoPhysicalEvidenceEnum),
      other: z.string().optional()
    }).superRefine(({ values, other }, physicalEvidenceCtx) => {
      if (values.includes('Other') && !other) {
        physicalEvidenceCtx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Other is required when selected',
          path: ['other']
        });
      }
    }),
  }),
  stageThree: z.object({
    net: z.object({
      values: z.array(stageThreeNetEnum),
      other: z.string().optional(),
    }).superRefine(({ values, other }, netCtx) => {
      if (values.includes('Other') && !other) {
        netCtx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Other is required when selected',
          path: ['other']
        });
      }
    }),
    trap: z.object({
      values: z.array(stageThreeTrapEnum),
      other: z.string().optional(),
    }).superRefine(({ values, other }, trapCtx) => {
      if (values.includes('Other') && !other) {
        trapCtx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Other is required when selected',
          path: ['other']
        });
      }
    }),
    trawl: z.object({
      values: z.array(stageThreeTrawlEnum),
      other: z.string().optional(),
    }).superRefine(({ values, other }, trawlCtx) => {
      if (values.includes('Other') && !other) {
        trawlCtx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Other is required when selected',
          path: ['other']
        });
      }
    }),
    chemicalIntent: z.object({
      values: z.array(stageThreeChemicalIntentEnum),
      other: z.string().optional(),
    }).superRefine(({ values, other }, chemicalIntentCtx) => {
      if (values.includes('Other') && !other) {
        chemicalIntentCtx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Other is required when selected',
          path: ['other']
        });
      }
    }),
    chemicalKnockdown: z.object({
      values: z.array(stageThreeChemicalKnockdownEnum),
      other: z.string().optional(),
    }).superRefine(({ values, other }, chemicalKnockdownCtx) => {
      if (values.includes('Other') && !other) {
        chemicalKnockdownCtx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Other is required when selected',
          path: ['other']
        });
      }
    }),
    markRecapture: z.object({
      values: z.array(stageThreeMarkRecaptureEnum),
      other: z.string().optional(),
    }).superRefine(({ values, other }, markRecaptureCtx) => {
      if (values.includes('Other') && !other) {
        markRecaptureCtx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Other is required when selected',
          path: ['other']
        });
      }
    }),
    corer: z.never(),
    grab: z.never(),
    tullgrenFunnel: z.never(),
    eDNA: z.never()
  })
}).superRefine(({ stageOne, stageTwo, stageThree }, methodTypeCtx) => {
  if (!stageOne.includes('Capture') && stageTwo.capture.length > 0) {
    methodTypeCtx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Capture stage two is only allowed if capture is selected',
      path: ['capture']
    });
  }
  if (!stageOne.includes('Environmental sample') && stageTwo.environmentalSample.values.length > 0) {
    methodTypeCtx.addIssue({
      code: z.ZodIssueCode.custom,
      message:
        'Environmental sample stage two is only allowed if environmental sample is selected',
      path: ['environmentalSample']
    });
  }
  if (!stageOne.includes('Physical evidence') && stageTwo.physicalEvidence.values.length > 0) {
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

  if (!stageTwo.capture.includes('Net') && stageThree.net.values.length > 0) {
    methodTypeCtx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Net stage three is only allowed if net is selected',
      path: ['net']
    });
  }
  if (!stageTwo.capture.includes('Trap') && stageThree.trap.values.length > 0) {
    methodTypeCtx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Trap stage three is only allowed if trap is selected',
      path: ['trap']
    });
  }
  if (!stageTwo.capture.includes('Trawl') && stageThree.trawl.values.length > 0) {
    methodTypeCtx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Trawl stage three is only allowed if trawl is selected',
      path: ['trawl']
    });
  }
  if (!stageTwo.capture.includes('Chemical intent') && stageThree.chemicalIntent.values.length > 0) {
    methodTypeCtx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Chemical intent stage three is only allowed if chemical intent is selected',
      path: ['chemicalIntent']
    });
  }
  if (
    !stageTwo.capture.includes('Chemical knockdown') &&
    stageThree.chemicalKnockdown.values.length > 0
  ) {
    methodTypeCtx.addIssue({
      code: z.ZodIssueCode.custom,
      message:
        'Chemical knockdown stage three is only allowed if chemical knockdown is selected',
      path: ['chemicalKnockdown']
    });
  }
  if (!stageTwo.capture.includes('Mark-recapture') && stageThree.markRecapture.values.length > 0) {
    methodTypeCtx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Mark-recapture stage three is only allowed if mark-recapture is selected',
      path: ['markRecapture']
    });
  }
});

export const methodsType = z.object({
  inventoryProcess: stageOneInventoryProcess,
  methodType: stageOneMethodType
})

// samplingScope
export const sexSchema = z.object({
  selected: z.boolean().default(false),
  targeted: z.string(),
  excluded: z.string()
}).superRefine(({ selected, targeted, excluded }, sexCtx) => {
  if (selected && (!targeted || !excluded)) {
    sexCtx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Targeted or excluded are required when selected',
      path: ['sex']
    });
  }
});

export const lifeStageAgeClassSchema = z.object({
  selected: z.boolean().default(false),
  targeted: z.string(),
  excluded: z.string()
}).superRefine(({ selected, targeted, excluded }, lifeStageAgeClassCtx) => {
  if (selected && (!targeted || !excluded)) {
    lifeStageAgeClassCtx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Targeted or excluded are required when selected',
      path: ['lifeStageAgeClass']
    });
  }
});

export const reproductiveConditionSchema = z.object({
  selected: z.boolean().default(false),
  targeted: z.string(),
  excluded: z.string()
}).superRefine(({ selected, targeted, excluded }, reproductiveConditionCtx) => {
  if (selected && (!targeted || !excluded)) {
    reproductiveConditionCtx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Targeted or excluded are required when selected',
      path: ['reproductiveCondition']
    });
  }
});

export const growthFormSchema = z.object({
  selected: z.boolean().default(false),
  targeted: z.string(),
  excluded: z.string()
}).superRefine(({ selected, targeted, excluded }, growthFormCtx) => {
  if (selected && (!targeted || !excluded)) {
    growthFormCtx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Targeted or excluded are required when selected',
      path: ['growthForm']
    });
  }
});

export const otherSchema = z.object({
  selected: z.boolean().default(false),
  category: z.string(),
  targeted: z.string(),
  excluded: z.string()
}).superRefine(({ selected, category, targeted, excluded }, otherCtx) => {
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
});

export const specificCategorySchema = z.object({
  category: z.array(CategoryEnum),
  sex: sexSchema,
  lifeStageAgeClass: lifeStageAgeClassSchema,
  reproductiveCondition: reproductiveConditionSchema,
  growthForm: growthFormSchema,
  other: otherSchema
});

export const underRepresentedTaxaSchema = z.array(
  z.object({
    group: z.string().min(1, { message: 'Group is required' }),
    reason: z.string().min(1, { message: 'Reason is required' })
  })
);

export const samplingScopeSchema = z.object({
  targetedTaxa: z.string(),
  excludedTaxa: z.string(),
  specificCategory: specificCategorySchema,
  underRepresentedTaxa: underRepresentedTaxaSchema
});

// Define objects
export const samplingEffortSchema = z
  .object({
    intensity: z.string(),
    effortIdentical: EffortIdenticalEnum,
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
  });

export const riverZoneSchema = z
  .object({
    zone: z.array(ZoneEnum),
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
  });

export const streamOrderSchema = z
  .object({
    classificationSystem: ClassificationSystemEnum,
    values: z.array(StreamOrderValueEnum),
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
  });

export const riverCrossSectionSchema = z
  .object({
    type: z.array(RiverCrossSectionTypeEnum).min(1, { message: 'At least one type is required' }),
    bank: BankEnum,
    surface: SurfaceEnum,
    bed: BedEnum,
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
  });

export const vegetationLayerSchema = z
  .object({
    layer: z.array(VegetationLayerEnum),
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
  });

export const furtherInformationSchema = z.object({
  details: z.string()
});

export const samplingLocationSchema = z.object({
  riverZone: riverZoneSchema,
  streamOrder: streamOrderSchema,
  riverCrossSection: riverCrossSectionSchema,
  vegetationLayer: vegetationLayerSchema
});

export const samplingDesignAndLocationSchema = z.object({
  studyDesign: studyDesignSchema,
  methods: methodsType,
  samplingScope: samplingScopeSchema,
  samplingEffort: samplingEffortSchema,
  samplingLocation: samplingLocationSchema,
  furtherInformation: furtherInformationSchema
});
