<script lang="ts">
	import Section from '$lib/components/formControls/Section.svelte';
	import StepTitle from '$lib/components/formControls/StepTitle.svelte';
	import DatasetCreators from '$lib/components/generalInformation/DatasetCreators.svelte';
	import DatasetFunders from '$lib/components/generalInformation/DatasetFunders.svelte';
	import DatasetMetadata from '$lib/components/generalInformation/DatasetMetadata.svelte';
	import Institution from '$lib/components/generalInformation/Institution.svelte';
	import PersonalInformation from '$lib/components/generalInformation/PersonalInformation.svelte';
	import RelatedResources from '$lib/components/generalInformation/RelatedResources.svelte';
	import { step } from '$lib/stores/steps';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { testSchema } from '$lib/schemas/generalInformation';
	import { Form } from 'formsnap';
	import TextInput from '$lib/components/forms/TextInput.svelte';

	export let data: PageData;

	onMount(() => {
		step.set(1);
	});
</script>

<StepTitle title="General information" />

<Form.Root
	form={data.form}
	schema={testSchema}
	method="POST"
	let:config
	debug={true}
	id="general-information"
>
	<Form.Field {config} name="name">
		<TextInput label="Name" description="blah" />
	</Form.Field>
	<Form.Field {config} name="email">
		<Form.Label>Email</Form.Label>
		<Form.Input />
		<Form.Description>Use your company email if you have one.</Form.Description>
		<Form.Validation />
	</Form.Field>
	<button type="submit">Submit</button>
</Form.Root>

<div class="space-y-32">
	<Section
		title="Data provider"
		description={[
			'Contact details for the person uploading this dataset',
			'Please include initials for middle names, if they exist. This is important in order to disambiguate names that are otherwise similar, and ensure that individuals receive appropriate credit.'
		]}
	>
		<PersonalInformation />
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
		<DatasetCreators />
	</Section>

	<Section
		title="Funding bodies"
		description="Indicate the organizations or individuals which financially supported the creation of this dataset"
	>
		<DatasetFunders />
	</Section>

	<Section
		title="Related resources"
		description="Provide the DOI for any resources (e.g. journal articles, code, published workflows) related to this dataset. Indicate all that apply."
	>
		<RelatedResources />
	</Section>
</div>
