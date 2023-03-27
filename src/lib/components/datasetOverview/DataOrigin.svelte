<script lang="ts">
	import { datasetOverview } from '$lib/stores/datasetOverview';
	import Radio from '../Radio.svelte';
	import Question from '../formControls/Question.svelte';
	import Checkbox from '../Checkbox.svelte';
	import { validate_component } from 'svelte/internal';
	import CheckboxGroup from '../CheckboxGroup.svelte';

	let sources = [
		{ label: 'Field survey', value: 'fieldSurvey', addition: 'includes stratified sampling' },
		{ label: 'Remote sensing', value: 'remoteSensing' },
		{ label: 'Field experiment', value: 'fieldExperiment' },
		{ label: 'Sensor platform', value: 'sensorPlatform' },
		{ label: 'Laboratory experiment', value: 'laboratoryExperiment' },
		{ label: 'Environmental DNA', value: 'environmentalDNA' },
		{ label: 'Museum collection', value: 'museumCollection' },
		{ label: 'Other', value: 'other' },
		{ label: 'Literature-based research', value: 'literatureBasedResearch' }
	];
</script>

<Question question="Is the dataset based on one or multiple studies?">
	<Radio
		label="Single source"
		value="singleSource"
		bind:group={$datasetOverview.originalOrCompiledDataset}
		name="originalOrCompiledDataset"
	/>
	<Radio
		label="Compilation"
		addition="synthesis"
		value="compilation"
		bind:group={$datasetOverview.originalOrCompiledDataset}
		name="originalOrCompiledDataset"
	/>
</Question>
<!--  -->
<Question question="Is the data current, or from a legacy source?" direction="column">
	<Radio
		label="Current"
		addition="E.g. recently collected, &/or original authors are contactable"
		value="current"
		bind:group={$datasetOverview.currentOrLegacyDataset}
		name="currentOrLegacy"
		layout="stacked"
	/>
	<Radio
		label="Legacy"
		addition="E.g. from an older publication, grey literature, field notes"
		value="legacy"
		bind:group={$datasetOverview.currentOrLegacyDataset}
		name="currentOrLegacy"
		layout="stacked"
	/>
	<Radio
		label="Unsure"
		value="unsure"
		bind:group={$datasetOverview.currentOrLegacyDataset}
		name="currentOrLegacy"
		layout="stacked"
	/>
</Question>
<Question question="What is the source if the data? (Select all that apply)" direction="grid">
	<CheckboxGroup name="dataSource" bind:group={$datasetOverview.dataSource} inputs={sources} />
	<!-- {#each sources as { label, addition, value }}
		<Checkbox
			{label}
			name="dataSource"
			bind:group={$datasetOverview.dataSource}
			addition={addition ?? ''}
			{value}
			custom={label === 'Other'}
		/>
	{/each} -->
</Question>
