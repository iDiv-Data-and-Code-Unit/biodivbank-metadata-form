<script lang="ts">
	import StepTitle from '$lib/components/formControls/StepTitle.svelte';
	import { step } from '$lib/stores/steps';
	import { createEventDispatcher, onMount } from 'svelte';
	import { generalInformation } from '$lib/stores/generalInformation';
	import { datasetIdStore, metadataStructureIdStore } from '$lib/stores/datasetStore';
	import ReviewGi from '$lib/components/review/ReviewGI.svelte';
	import ReviewDo from '$lib/components/review/ReviewDO.svelte';
	import ReviewSd from '$lib/components/review/ReviewSD.svelte';
	import { params } from '$lib/stores/paramsStore';
	import { datasetOverview } from '$lib/stores/datasetOverview';
	import { samplingDesign } from '$lib/stores/samplingDesign';
	import axios from 'axios';
	import { metadataStore } from '$lib/stores/datasetStore';
	import { convertToApiModel } from '$lib/helper';
	import { get } from 'svelte/store';
	import { setApiConfig } from '$lib/stores/apiStores';

	let disabled = false;
	let promise = Promise.resolve();

	console.log('********** REVIEW *************************************');
	console.log(
		'🚀 ~ 4:',
		$datasetIdStore,
		$metadataStructureIdStore,
		$generalInformation,
		$datasetOverview,
		$samplingDesign
	);

	console.log('************************************************************');

	onMount(() => {
		step.set(4);

		const metadata = {
			generalInformation: $generalInformation,
			datasetOverview: $datasetOverview,
			samplingDesign: $samplingDesign
		};
	});
</script>

<StepTitle title="Review" />
<div class="space-y-32">
	<ReviewGi />
	<ReviewDo />
	<ReviewSd />
	<div>
		<button
			on:click={() => {}}
			class="bg-secondary/20 cursor-not-allowed inline-block py-3 mb-2 px-6 text-xl font-medium text-white rounded-md"
			disabled>Submit</button
		>
	</div>
</div>
