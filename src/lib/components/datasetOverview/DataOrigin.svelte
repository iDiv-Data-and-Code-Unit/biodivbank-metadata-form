<script lang="ts">
	import Radio from '../Radio.svelte';
	import Question from '../formControls/Question.svelte';
	import CheckboxGroup from '../CheckboxGroup.svelte';
	import { datasetOverview } from '$lib/stores/datasetOverview';
	import { OriginalOrCompiledDatasetEnum } from '$lib/schemas/datasetOverview';

	let currentOrLegacy = [
		{
			label: "Own or collaborator's data",
			value: "Own or collaborator's data",
			addition: 'extensive contextual information known to authors'
		},
		{
			label: 'Other´s data',
			value: 'Other´s data',
			addition: 'full contextual information might not be available'
		},
		{
			label: 'Legacy data',
			value: 'Legacy data',
			addition: 'e.g. digitized from an older publication, grey literature, field notes'
		},
		{
			label: 'Unsure',
			value: 'Unsure'
		}
	];

	let sources = [
		{ label: 'Field survey', value: 'Field survey', addition: 'includes remote sensing, eDNA' },
		{ label: 'Museum/herbarium specimens', value: 'Museum/herbarium specimens' },
		{ label: 'Field experiment', value: 'Field experiment' },
		{ label: 'Literature-based research', value: 'Literature-based research' },
		// { label: 'Sensor platform', value: 'sensorPlatform' },
		{ label: 'Laboratory experiment', value: 'Laboratory experiment' },
		{ label: 'Expert knowledge', value: 'Expert knowledge' },
		{ label: 'Other', value: 'Other' }
	];
</script>

<Question question="What type of dataset is involved?" direction="column">
	<Radio
		label="Single sampling design"
		value={OriginalOrCompiledDatasetEnum.enum['Single Source']}
		addition="one unified methodology"
		bind:group={$datasetOverview.dataOrigin.originalOrCompiledDataset}
		name="originalOrCompiledDataset"
	/>
	<Radio
		label="Compilation"
		addition="single dataset, combining multiple different methodologies"
		value={OriginalOrCompiledDatasetEnum.enum['Compilation']}
		bind:group={$datasetOverview.dataOrigin.originalOrCompiledDataset}
		name="originalOrCompiledDataset"
	/>
	<Radio
		label="Synthesis study"
		addition="aggregated from multiple source datasets"
		value={OriginalOrCompiledDatasetEnum.enum['Synthesis']}
		bind:group={$datasetOverview.dataOrigin.originalOrCompiledDataset}
		name="originalOrCompiledDataset"
	/>
</Question>

<Question
	question="Is the full context of the study known by the data provider or dataset creators? (Select all that apply)"
	direction="column"
>
	<CheckboxGroup
		name="dataSource"
		bind:group={$datasetOverview.dataOrigin.currentOrLegacyDataset}
		inputs={currentOrLegacy}
	/>
</Question>
<Question question="What is the source of the data? (Select all that apply)" direction="grid">
	<CheckboxGroup
		name="dataSource"
		bind:group={$datasetOverview.dataOrigin.dataSource.sources}
		bind:other={$datasetOverview.dataOrigin.dataSource.other}
		inputs={sources}
	/>
</Question>
