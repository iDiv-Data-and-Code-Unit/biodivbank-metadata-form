<script lang="ts">
	import Section from '$lib/components/formControls/Section.svelte';
	import StepTitle from '$lib/components/formControls/StepTitle.svelte';
	import PersonalInformation from '$lib/components/generalInformation/PersonalInformation.svelte';
	import { step } from '$lib/stores/steps';
	import { onMount } from 'svelte';
	import Institution from '$lib/components/generalInformation/Institution.svelte';
	import DatasetMetadata from '$lib/components/generalInformation/DatasetMetadata.svelte';
	import { generalInformation } from '$lib/stores/generalInformation';
	import DatasetCreators from '$lib/components/generalInformation/DatasetCreators.svelte';
	import Handle from '$lib/icons/Handle.svelte';
	import DatasetFunders from '$lib/components/generalInformation/DatasetFunders.svelte';
	import RelatedResources from '$lib/components/generalInformation/RelatedResources.svelte';
	import type { ActionData, PageData } from '../../(form)/general-information/$types';
	import { page } from '$app/stores';
	import { params } from '$lib/stores/paramsStore';

	const url = $page.url;

	params.update((current) => ({
		...current,
		id: url.searchParams.get('id') || '',
		auth: url.searchParams.get('auth') || ''
	}));

	console.log(url.searchParams.get('id')); // John
	console.log(url.searchParams.get('auth')); // 30

	export let data: PageData;
	export let form: ActionData;

	onMount(() => {
		step.set(1);
	});

	$: console.log({ data, form });
</script>

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
		<!-- <div class=" my-4 col-span-3 h-px" /> -->
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
		<DatasetCreators importedAuthors={form?.authors} />
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
