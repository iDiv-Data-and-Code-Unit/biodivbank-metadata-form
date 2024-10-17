<script lang="ts">
	import Section from '$lib/components/formControls/Section.svelte';
	import StepTitle from '$lib/components/formControls/StepTitle.svelte';
	import PersonalInformation from '$lib/components/generalInformation/PersonalInformation.svelte';
	import { step } from '$lib/stores/steps';
	import { datasetIdStore, metadataStructureIdStore, metadataStore } from '$lib/stores/datasetStore';
	import { onMount } from 'svelte';
	import Institution from '$lib/components/generalInformation/Institution.svelte';
	import DatasetMetadata from '$lib/components/generalInformation/DatasetMetadata.svelte';
	import { generalInformation } from '$lib/stores/generalInformation';
	import { datasetOverview } from '$lib/stores/datasetOverview';
	import { generalInformationSchema } from '$lib/schemas/generalInformation';
	import DatasetCreators from '$lib/components/generalInformation/DatasetCreators.svelte';
	import DatasetFunders from '$lib/components/generalInformation/DatasetFunders.svelte';
	import RelatedResources from '$lib/components/generalInformation/RelatedResources.svelte';
	import type { ActionData, PageData } from '../../(form)/general-information/$types';
	import { page } from '$app/stores';
	import { params } from '$lib/stores/paramsStore';
	import axios from 'axios';
	import toast from 'svelte-french-toast';
	import CustomToast from '$lib/components/CustomToast.svelte';
	import { getMetadata, saveMetadata } from '../services';
	import { convertToModel } from '$lib/helper';
	import { samplingDesign } from '$lib/stores/samplingDesign';

	const url = $page.url;


	params.update((current) => ({
		...current,
		id: url.searchParams.get('id') || '',
		auth: url.searchParams.get('auth') || ''
	}));

	//console.log(url.searchParams.get('id'));
	//console.log(url.searchParams.get('auth'));
		
	let loaded:boolean = false;
	export let form: ActionData;

	onMount(() => {
		async function load() {
			let id = 16;
			
			if($params?.id)
			{
				id = JSON.parse($params.id);
			}

			datasetIdStore.set(id);

			// ATTENTION
			// if go back to this stepp currently means reload metadata from  bexis2
			// need to change	this to load from store but with a reset option from the beginning
			// or start with a other page as entry	point
			// if($generalInformation === undefined || reset)
			// {

				const res = await getMetadata(id);
				
				const data = convertToModel(res);
				

				metadataStructureIdStore.set(res['@id']);
				generalInformation.set(data.generalInformation);
				datasetOverview.set(data.datasetOverview);
				samplingDesign.set(data.samplingDesignAndLocation);
		
			

			console.log("🚀 ~ 1:", 
					$datasetIdStore,
					$metadataStructureIdStore,
					$generalInformation,
					$datasetOverview,
					$samplingDesign
				)

			loaded	= true;
	

		}
		
	 load();
		
		
		step.set(1);

		return () => {
	
		const result = generalInformationSchema.safeParse($generalInformation);

		if (!result.success) {

			toast(CustomToast, {
				// @ts-ignore
				step: 'General information',
				// @ts-ignore
				incompleteFields: result.error.errors.map((error) => error.path +" + "+error.message),
				position: 'bottom-center',
				duration: 10000
			});
			return;
		}
	};

	});



</script>

{#if loaded}

<StepTitle title="General information" />

<div class="space-y-32">
<Section
		title="Data provider"
		description={[
			'Contact details for the person uploading this dataset',
			'Please include initials for middle names, if they exist. This is important in order to disambiguate names that are otherwise similar, and ensure that individuals receive appropriate credit.'
		]}
	> 
		<PersonalInformation />
		<div class="my-2 col-span-2" />

		<Institution />
	</Section>

	<Section
		title="Dataset"
		description={[
			'Information identifying the dataset',
			'Note that the short summary of a dataset is not the same as the abstract of any accompanying paper!'
		]}
	>
		<DatasetMetadata />
	</Section>

	<Section
		title="Dataset creator(s)"
		description={[
			"Enter names by dragging-and-dropping them (<img src='/handle.svg' class='h-4 w-4 text-description inline' />) into the order you would like them listed when the dataset is cited.",
			'Note that the creators of a dataset are <span class="font-medium text-black">not</span> necessarily the same as the authors of an article or report based on that dataset. This is an opportunity to give credit to those who generated the data.'
		]}
	>
		<DatasetCreators importedAuthors={form?.authors||null} />
	</Section>

	<Section
		title="Funding bodies"
		description="Indicate the organizations or individuals which financially supported the creation of this dataset"
	>
		<DatasetFunders />
	</Section>

	<Section
		title="Related resources"
		description="Provide the DOI (or URL) for any resources (e.g. journal articles, code, published workflows) related to this dataset. Indicate all that apply."
	>
		<RelatedResources />
	</Section>

</div>
{/if}

