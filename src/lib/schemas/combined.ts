import { z } from 'zod';
import { generalInformationSchema } from './generalInformation';
import { datasetOverviewSchema } from './datasetOverview';
import { samplingDesignAndLocationSchema } from './samplingDesignAndLocation';

export const schema = z
	.object({
		generalInformation: generalInformationSchema,
		datasetOverview: datasetOverviewSchema,
		samplingDesignAndLocation: samplingDesignAndLocationSchema
	})
	.superRefine(({ datasetOverview, samplingDesignAndLocation }, ctx) => {
		if (
			(datasetOverview.realm.core.includes('Terrestrial') ||
				datasetOverview.realm.transitional.includes('Terrestrial-Freshwater') ||
				datasetOverview.realm.transitional.includes('Marine-Terrestrial') ||
				datasetOverview.realm.transitional.includes('Marine-Freshwater-Terrestrial')) &&
			samplingDesignAndLocation.samplingLocation.vegetationLayer.layer.length === 0
		) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Vegetation Layer is required for Terrestrial Realm',
				path: ['samplingDesignAndLocation', 'samplingLocation', 'vegetationLayer']
			});
		}
		if (
			!datasetOverview.realm.core.includes('Terrestrial') &&
			!datasetOverview.realm.transitional.includes('Terrestrial-Freshwater') &&
			!datasetOverview.realm.transitional.includes('Marine-Terrestrial') &&
			!datasetOverview.realm.transitional.includes('Marine-Freshwater-Terrestrial') &&
			samplingDesignAndLocation.samplingLocation.vegetationLayer.layer.length > 0
		) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Vegetation Layer is only allowed if Terrestrial Realm is selected',
				path: ['samplingDesignAndLocation', 'samplingLocation', 'vegetationLayer']
			});
		}

		if (
			datasetOverview.biome.core.freshWater.includes('Rivers and Streams') &&
			samplingDesignAndLocation.samplingLocation.riverCrossSection.type.length === 0
		) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'River Cross Section Type is required for Rivers and Streams Biome',
				path: ['samplingDesignAndLocation', 'samplingLocation', 'riverCrossSection']
			});
		}
		if (
			!datasetOverview.biome.core.freshWater.includes('Rivers and Streams') &&
			samplingDesignAndLocation.samplingLocation.riverCrossSection.type.length > 0
		) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'River Cross Section Type is only allowed if Rivers and Streams Biome is selected',
				path: ['samplingDesignAndLocation', 'samplingLocation', 'riverCrossSection']
			});
		}
		if (
			datasetOverview.biome.core.freshWater.includes('Rivers and Streams') &&
			samplingDesignAndLocation.samplingLocation.streamOrder.classificationSystem.length === 0
		) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Stream order classification system is required for Rivers and Streams Biome',
				path: ['samplingDesignAndLocation', 'samplingLocation', 'streamOrder']
			});
		}
		if (
			!datasetOverview.biome.core.freshWater.includes('Rivers and Streams') &&
			samplingDesignAndLocation.samplingLocation.streamOrder.classificationSystem.length > 0
		) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message:
					'Stream order classification system is only allowed if Rivers and Streams Biome is selected',
				path: ['samplingDesignAndLocation', 'samplingLocation', 'streamOrder']
			});
		}
		if (
			datasetOverview.biome.core.freshWater.includes('Rivers and Streams') &&
			samplingDesignAndLocation.samplingLocation.riverZone.zone.length === 0
		) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'River zone is required for Rivers and Streams Biome',
				path: ['samplingDesignAndLocation', 'samplingLocation', 'riverZone']
			});
		}
		if (
			!datasetOverview.biome.core.freshWater.includes('Rivers and Streams') &&
			samplingDesignAndLocation.samplingLocation.riverZone.zone.length > 0
		) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'River zone is only allowed if Rivers and Streams Biome is selected',
				path: ['samplingDesignAndLocation', 'samplingLocation', 'riverZone']
			});
		}
	});
