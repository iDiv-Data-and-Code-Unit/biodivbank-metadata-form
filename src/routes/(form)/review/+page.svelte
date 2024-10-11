<script lang="ts">
	import StepTitle from '$lib/components/formControls/StepTitle.svelte';
	import { step } from '$lib/stores/steps';
	import { onMount } from 'svelte';
	import { generalInformation } from '$lib/stores/generalInformation';
	import { datasetIdStore, metadataStructureIdStore } from '$lib/stores/datasetStore';
	import ReviewGi from '$lib/components/review/ReviewGI.svelte';
	import ReviewDo from '$lib/components/review/ReviewDO.svelte';
	import ReviewSd from '$lib/components/review/ReviewSD.svelte';
	import { params } from '$lib/stores/paramsStore';
	import { datasetOverview } from '$lib/stores/datasetOverview';
	import { samplingDesign } from '$lib/stores/samplingDesign';
	import axios from 'axios';
	import { saveMetadata } from '../services';
	import { metadataStore } from '$lib/stores/datasetStore';
	import { convertToApiModel } from '$lib/helper';
	import { get } from 'svelte/store';

	let disabled = false;
	let promise = Promise.resolve();

	console.log("********** REVIEW *************************************");
	console.log($samplingDesign);
	console.log("************************************************************");


	async function submitForm() {
		
		const metadata={
			"generalInformation": $generalInformation,
			"datasetOverview": $datasetOverview,
			"samplingDesign": $samplingDesign
		}
		
		const id = get(datasetIdStore);
		const metadataStructureId = get(metadataStructureIdStore);

		let body = convertToApiModel(metadata, metadataStructureId);

		console.log("🚀 ~ submitForm :",id,metadataStructureId,metadata, body)
		const res = await saveMetadata($datasetIdStore,body);

		window.parent.postMessage('save', '*');
	}


	onMount(() => {
		step.set(4);
	});
</script>

<StepTitle title="Review" />
<div class="space-y-32">
	<ReviewGi />
	<ReviewDo />
	<ReviewSd />
	<div>
		<button
			on:click={submitForm}
			class="bg-secondary inline-block py-3 mb-2 px-6 text-xl font-medium text-white rounded-md"
			>Submit</button
		>
	</div>
</div>
