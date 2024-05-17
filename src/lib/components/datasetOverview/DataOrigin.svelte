<script lang="ts">
	import { datasetOverview } from '$lib/stores/datasetOverview';
	import Radio from '../Radio.svelte';
	import Question from '../formControls/Question.svelte';
	import Checkbox from '../Checkbox.svelte';
	import CheckboxGroup from '../CheckboxGroup.svelte';

	let currentOrLegacy = [
		{
			label: "Own or collaborator's data",
			value: 'ownOrCollaborator',
			addition: 'extensive contextual information known to authors'
		},
		{
			label: "Others' data",
			value: 'others',
			addition: 'full contextual information might not be available'
		},
		{
			label: 'Legacy data',
			value: 'legacy',
			addition: 'e.g. digitized from an older publication, grey literature, field notes'
		},
		{
			label: 'Unsure',
			value: 'unsure'
		}
	];

	let sources = [
		{ label: 'Field survey', value: 'fieldSurvey', addition: 'includes remote sensing, eDNA' },
		{ label: 'Museum/herbarium specimens', value: 'museumCollection' },
		{ label: 'Field experiment', value: 'fieldExperiment' },
		{ label: 'Literature-based research', value: 'literatureBasedResearch' },
		// { label: 'Sensor platform', value: 'sensorPlatform' },
		{ label: 'Laboratory experiment', value: 'laboratoryExperiment' },
		{ label: 'Expert knowledge', value: 'expertKnowledge' },
		{ label: 'Other', value: 'other' }
	];
</script>

<Question question="What type of dataset is involved?" direction="column">
	<Radio
		label="Single sampling design"
		value="singleSource"
		addition="one unified methodology"
		bind:group={$datasetOverview.originalOrCompiledDataset}
		name="originalOrCompiledDataset"
	/>
	<Radio
		label="Compilation"
		addition="single dataset, combining multiple different methodologies"
		value="compilation"
		bind:group={$datasetOverview.originalOrCompiledDataset}
		name="originalOrCompiledDataset"
	/>
	<Radio
		label="Synthesis study"
		addition="aggregated from multiple source datasets"
		value="synthesis"
		bind:group={$datasetOverview.originalOrCompiledDataset}
		name="originalOrCompiledDataset"
	/>
</Question>
<!--  -->
<Question
	question="Is the full context of the study known by the data provider or dataset creators? (Select all that apply)"
	direction="column"
>
	<CheckboxGroup
		name="dataSource"
		bind:group={$datasetOverview.currentOrLegacyDataset}
		inputs={currentOrLegacy}
	/>
	<!-- <Radio
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
	/> -->
</Question>
<Question question="What is the source of the data? (Select all that apply)" direction="grid">
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
