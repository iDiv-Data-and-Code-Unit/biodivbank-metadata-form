<script lang="ts">
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';

	import Biome from '$lib/components/datasetOverview/Biome.svelte';
	import DataOrigin from '$lib/components/datasetOverview/DataOrigin.svelte';
	import GeographicScope from '$lib/components/datasetOverview/GeographicScope.svelte';
	import Realm from '$lib/components/datasetOverview/Realm.svelte';
	import TaxonomicScope from '$lib/components/datasetOverview/TaxonomicScope.svelte';
	import TemporalScope from '$lib/components/datasetOverview/TemporalScope.svelte';
	import Question from '$lib/components/formControls/Question.svelte';
	import Section from '$lib/components/formControls/Section.svelte';
	import StepTitle from '$lib/components/formControls/StepTitle.svelte';
	import CustomToast from '$lib/components/CustomToast.svelte';
	import { datasetOverview } from '$lib/stores/datasetOverview';
	import { step } from '$lib/stores/steps';
	import { geoStore } from '$lib/stores/geo';
	import {
		datasetIdStore,
		metadataStructureIdStore
	} from '$lib/stores/datasetStore';
	import { generalInformation } from '$lib/stores/generalInformation';
	import { samplingDesign } from '$lib/stores/samplingDesign';
	import { datasetOverviewSchema } from '$lib/schemas/datasetOverview';
	import { localDatasetsStore } from '$lib/stores/localDatasets';
	import type { LocalDataset } from '$lib/types/schema';

	onMount(() => {
		console.log('********** DATASETOVERVIEW *************************************');
		console.log($datasetOverview);
		console.log($geoStore);
		console.log(
			'🚀 ~ 2:',
			$datasetIdStore,
			$metadataStructureIdStore,
			$generalInformation,
			$datasetOverview,
			$samplingDesign
		);

		console.log('************************************************************');

		step.set(2);

		return () => {
			const result = datasetOverviewSchema.safeParse($datasetOverview);
			console.log('🚀 ~ return ~ result:', result);

			if (!result.success) {
				toast(CustomToast, {
					// @ts-ignore
					step: 'Dataset overview',
					// @ts-ignore
					incompleteIssues: result.error?.errors,
					position: 'bottom-center',
					duration: 10000
				});
				return;
			}
		};
	});

	datasetOverview.subscribe((value) => {
		if (localStorage) {
			localDatasetsStore.update((current) => {
				if (!current) {
					return [];
				}
				const index = current.findIndex((d: LocalDataset) => d.id === $datasetIdStore);
				if (index === -1) {
					current.push({
						id: $datasetIdStore,
						generalInformation: $generalInformation,
						datasetOverview: value,
						samplingDesign: $samplingDesign
					});
				} else {
					current[index] = {
						id: $datasetIdStore,
						generalInformation: $generalInformation,
						datasetOverview: value,
						samplingDesign: $samplingDesign
					};
				}
				return current;
			});
		}
	});
</script>

<StepTitle title="Dataset overview" />

<div class="space-y-32">
	<Section title="Data origin">
		<DataOrigin />
	</Section>

	<Section
		title="Temporal scope"
		description="Please provide dates to the highest resolution possible"
	>
		<TemporalScope />
	</Section>

	<Section
		title="Geographic scope"
		description={[
			'Where were the data collected?',
			'E.g. if several neighbouring countries are involved select "Regional"; if the countries are spread widely across one continent select "Continental".'
		]}
	>
		<GeographicScope />
	</Section>

	<Section
		title="Realm"
		description={[
			'Which realms do the data involve?',
			"We use the IUCNGET classification - click <a class='underline' href='https://global-ecosystems.org/explore' target='_blank'>here</a> for definitions"
		]}
	>
		<Realm />
	</Section>

	<Section
		title="Biome"
		description={[
			'In which biomes were the data collected? (Select all that apply)',
			'If the biome you are interested in is not currently selectable, please adjust the realm(s) chosen in the previous question.'
		]}
	>
		<Biome />
	</Section>

	<Section
		title="Taxonomic scope"
		description="Which taxonomic groups are represented in the dataset? (Select all that apply)"
	>
		<div class="col-span-2"><TaxonomicScope /></div>
	</Section>
</div>
