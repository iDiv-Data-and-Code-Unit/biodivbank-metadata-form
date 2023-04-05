<script lang="ts">
	import Question from '$lib/components/formControls/Question.svelte';
	import Section from '$lib/components/formControls/Section.svelte';
	import StepTitle from '$lib/components/formControls/StepTitle.svelte';
	import RiverCrossSection from '$lib/components/sampling-design/RiverCrossSection.svelte';
	import RiverZone from '$lib/components/sampling-design/RiverZone.svelte';
	import StreamOrder from '$lib/components/sampling-design/StreamOrder.svelte';
	import VegetationLayer from '$lib/components/sampling-design/VegetationLayer.svelte';
	import Textarea from '$lib/components/Textarea.svelte';
	import { datasetOverview } from '$lib/stores/datasetOverview';
	import { samplingDesign } from '$lib/stores/samplingDesign';
	import { step } from '$lib/stores/steps';
	import { onMount } from 'svelte';
	import MultiSelect from 'svelte-multiselect';
	import Radio from '$lib/components/Radio.svelte';
	import CheckboxGroup from '$lib/components/CheckboxGroup.svelte';
	import clsx from 'clsx';

	let stage1Inputs = [
		{ label: 'Restricted search', value: 'restrictedSearch' },
		{ label: 'Open search', value: 'openSearch' },
		{ label: 'Opportunistic search', value: 'opportunisticSearch' },
		{ label: 'Trap or sample', value: 'trapOrSample' },
		{ label: 'Adventitious', value: 'adventitious' }
	];

	let stage2Inputs = [
		{ label: 'Plot', value: 'plot' },
		{ label: 'Transect', value: 'transect' },
		{ label: 'Quadrat', value: 'quadrat' },
		{ label: 'Plotless techniques', value: 'plotless' }
	];

	let plotInputs = [
		{ label: 'Permanent', value: 'permanent' },
		{ label: 'Non-permanent', value: 'nonPermanent' },
		{ label: 'Relevé', value: 'releve' }
	];

	let tansectInputs = [
		{ label: 'Line transect', value: 'lineTransect' },
		{ label: 'Belt transect', value: 'beltTransect' },
		{ label: 'Bisect transect', value: 'bisectTransect' },
		{ label: 'Pollard walk', value: 'pollardWalk' },
		{ label: 'Manta tow', value: 'mantaTow' }
	];

	let quadratInputs = [
		{ label: 'Frame quadrat', value: 'frameQuadrat' },
		{ label: 'Gridded quadrat', value: 'griddedQuadrat' },
		{ label: 'Point quadrat', value: 'pointQuadrat' }
	];

	let plotlessInputs = [
		{ label: 'Closest individual method', value: 'closestIndividualMethod' },
		{ label: 'Nearest neighbour method', value: 'nearestNeighbourMethod' },
		{ label: 'Random pairs method', value: 'randomPairsMethod' },
		{ label: 'Point-centred quarter (PCQ) method', value: 'pcq' }
	];

	let steps = ['Stage 1', 'Stage 2', 'Stage 3'];
	let selectedStep = 'Stage 1';

	onMount(() => {
		step.set(3);
	});

	// $: {
	// 	if ($samplingDesign.inventory.stage1.includes('restrictedSearch')) {
	// 		selectedStep = 'Stage 2';
	// 	}
	// }
</script>

<StepTitle title="Sampling design & location" />

{#if $datasetOverview.coreRealmBiomes.includes('riversAndStreams') || $datasetOverview.coreRealms.includes('terrestrial') || $datasetOverview.transitionalRealms.some( (realm) => realm
				.toLowerCase()
				.includes('terrestrial') ) || $samplingDesign.riverCrossSection.riparianZone}
	<Section title="Sampling location">
		{#if $datasetOverview.coreRealmBiomes.includes('riversAndStreams')}
			<RiverZone />
			<StreamOrder />
			<RiverCrossSection />
		{/if}
		{#if $datasetOverview.coreRealms.includes('terrestrial') || $datasetOverview.transitionalRealms.some( (realm) => realm
						.toLowerCase()
						.includes('terrestrial') ) || $samplingDesign.riverCrossSection.riparianZone}
			<VegetationLayer />
		{/if}
	</Section>
{/if}

<Section title="Study design">
	<Question question="Did the study involve more than one sampling event?">
		<MultiSelect
			id="study-design"
			outerDivClass="!w-full !bg-input !rounded-md !px-4 !py-3 !border-none !text-base !text-placeholder"
			options={['Multiple locations', 'Multiple time points', 'No']}
			placeholder="Select all values that apply..."
			bind:selected={$samplingDesign.multipleEvents}
		/>
	</Question>
	{#if $samplingDesign.multipleEvents.length && !$samplingDesign.multipleEvents.includes('No')}
		<Question
			question="Did environmental characteristics (e.g. habitat types, disturbance types) or methods (e.g. devices or effort) vary across sampling events?"
		>
			<Radio
				label="Identical"
				value="identical"
				bind:group={$samplingDesign.envCharacteristics}
				name="envCharacteristics"
			/>
			<Radio
				label="Largely similar"
				value="largelySimilar"
				bind:group={$samplingDesign.envCharacteristics}
				name="envCharacteristics"
			/>
			<Radio
				label="Variable"
				value="variable"
				bind:group={$samplingDesign.envCharacteristics}
				name="envCharacteristics"
			/>
		</Question>
	{/if}
</Section>

<Section title="Methods">
	<Question
		question="What type of inventory process was involved? (Select all that apply)"
		direction="grid"
	>
		<pre>{selectedStep}</pre>
		<div class="flex items-center gap-2 text-sm text-description col-span-full">
			<span
				on:click={() => {
					selectedStep = 'Stage 1';
				}}
				class={clsx(
					'cursor-pointer',
					selectedStep === 'Stage 1' ? 'text-description' : 'text-input-disabled'
				)}>Stage 1</span
			>
			<span>&gt;</span>
			<span
				on:click={() => {
					selectedStep = 'Stage 2';
				}}
				class={clsx(
					'cursor-pointer',
					selectedStep === 'Stage 2' ? 'text-description' : 'text-input-disabled'
				)}>Stage 2</span
			>
			<span>&gt;</span>
			<span
				on:click={() => {
					selectedStep = 'Stage 3';
				}}
				class={clsx(
					'cursor-pointer',
					selectedStep === 'Stage 3' ? 'text-description' : 'text-input-disabled'
				)}>Stage 3</span
			>
		</div>
		{#if selectedStep === 'Stage 1'}
			<CheckboxGroup
				bind:group={$samplingDesign.inventory.stage1}
				name="stage-1"
				inputs={stage1Inputs}
			/>
		{:else if selectedStep === 'Stage 2' && $samplingDesign.inventory.stage1.includes('restrictedSearch')}
			<CheckboxGroup
				bind:group={$samplingDesign.inventory.stage2}
				name="stage-2"
				inputs={stage2Inputs}
			/>
		{:else if selectedStep === 'Stage 3'}
			{#if $samplingDesign.inventory.stage2.includes('plot')}
				<CheckboxGroup
					bind:group={$samplingDesign.inventory.stage3}
					name="stage-3-plot"
					inputs={plotInputs}
				/>
			{/if}
			{#if $samplingDesign.inventory.stage2.includes('transect')}
				<CheckboxGroup
					bind:group={$samplingDesign.inventory.stage3}
					name="stage-3-plot"
					inputs={tansectInputs}
				/>
			{/if}
			{#if $samplingDesign.inventory.stage2.includes('quadrat')}
				<CheckboxGroup
					bind:group={$samplingDesign.inventory.stage3}
					name="stage-3-plot"
					inputs={quadratInputs}
				/>
			{/if}
			{#if $samplingDesign.inventory.stage2.includes('plotless')}
				<CheckboxGroup
					bind:group={$samplingDesign.inventory.stage3}
					name="stage-3-plot"
					inputs={plotlessInputs}
				/>
			{/if}
			{#if !$samplingDesign.inventory.stage2.length}
				<p>No possible input</p>
			{/if}
		{:else}
			<p>No possible input</p>
		{/if}
	</Question>
</Section>

<Section title="Sampling effort">
	<Question question="Describe the intensity of sampling (i.e. effort)">
		<Textarea
			placeholder="E.g. 40 box traps, deployed at even spacings along 4 parallel 100 m transects placed 50 m apart, and visited at 6-hourly intervals over a 48 hour period.
E.g. Two people occupying a bird hide for a period of 8 hours and undertaking a 30-minute count of species within the 150 degree field of view every 2 hours.
E.g. A single baited camera trap station with motion sensor trigger, deployed for a period of 10 days and configured for detecting large fauna moving through a known traffic way."
			label=""
			rows={10}
		/>
	</Question>
	<Question question="Was sampling effort identical for all sampling events?" direction="grid">
		<Radio
			label="Yes"
			value="yes"
			bind:group={$samplingDesign.effortIdentical}
			name="effortIdentical"
		/>
		<Radio
			label="No"
			value="no"
			bind:group={$samplingDesign.effortIdentical}
			name="effortIdentical"
		/>
		<Radio
			label="Unsure"
			value="unsure"
			bind:group={$samplingDesign.effortIdentical}
			name="effortIdentical"
		/>
		<Radio
			label="Not applicable"
			addition="(only 1 sampling event)"
			value="notApplicable"
			bind:group={$samplingDesign.effortIdentical}
			name="effortIdentical"
		/>
		{#if $samplingDesign.effortIdentical === 'no'}
			<Textarea
				class="col-start-1 col-span-2"
				placeholder="Please describe how effort varied between locations or at different points in time"
				label=""
				rows={6}
			/>
		{/if}
	</Question>
</Section>

<Section
	title="Further Information"
	description={[
		'For example, could another person re-run your field study, or fully interpret and reuse this dataset, without additional information? If not, please use the textbox to add further detail.',
		'Existing summaries from articles or reports are acceptable, provided their use does not violate copyright or any licence stated.'
	]}
>
	<Question
		question="Are there any details of your sampling methodology that have not been captured by this form?"
	>
		<Textarea
			bind:value={$samplingDesign.furtherInformation}
			placeholder="Describe any aspect of the study design, scheduling or spatial distribution of sampling, methodology or equipment used, pre-processing of raw data, environmental conditions during a survey or unforeseen events, that are not covered by this metadata form. Be as specific as possible."
			label=""
			rows={10}
		/>
	</Question>
</Section>
