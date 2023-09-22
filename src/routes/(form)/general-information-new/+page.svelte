<script lang="ts">
	import Section from '$lib/components/formControls/Section.svelte';
	import StepTitle from '$lib/components/formControls/StepTitle.svelte';
	import { step } from '$lib/stores/steps';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { Form } from 'formsnap';
	import { generalInformationSchema } from './schema';
	import TextInput from '$lib/components/forms/TextInput.svelte';
	import PersonalInformation from './PersonalInformation.svelte';
	import GeneralInformation from './GeneralInformation.svelte';
	export let data: PageData;
	onMount(() => {
		step.set(2);
	});
</script>

<StepTitle title="General information" />

<div class="space-y-32">
	<Form.Root
		form={data.form}
		schema={generalInformationSchema}
		method="POST"
		let:config
		debug={true}
		id="general-information"
	>
		<Section
			title="Data provider"
			description={[
				'Contact details for the person uploading this dataset',
				'Please include initials for middle names, if they exist. This is important in order to disambiguate names that are otherwise similar, and ensure that individuals receive appropriate credit.'
			]}
		>
			<PersonalInformation {config} />
		</Section>
	</Form.Root>
</div>
