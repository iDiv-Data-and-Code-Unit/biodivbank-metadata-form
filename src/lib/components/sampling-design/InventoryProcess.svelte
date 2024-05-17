<script lang="ts">
	import clsx from 'clsx';
	import Question from '../formControls/Question.svelte';
	import CheckboxGroup from '../CheckboxGroup.svelte';
	import { samplingDesign } from '$lib/stores/samplingDesign';
	import { step } from '$lib/stores/steps';
	import ArrowLeft from '$lib/icons/ArrowLeft.svelte';
	import ArrowRight from '$lib/icons/ArrowRight.svelte';

	let stage1Inputs = [
		{ label: 'Restricted search', value: 'restrictedSearch' },
		{ label: 'Open search', value: 'openSearch' },
		{ label: 'Opportunistic search', value: 'opportunisticSearch' },
		{ label: 'Other', value: 'other', otherPlaceholder: 'Please specify' }
		// { label: 'Trap or sample', value: 'trapOrSample' },
		// { label: 'Adventitious', value: 'adventitious' }
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
</script>

<Question
	question="What type of inventory process was involved? (Select all that apply)"
	direction="column"
>
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
		<h3 class="col-span-2 text-sm text-min-contrast-gray">Restricted Search</h3>
		<CheckboxGroup
			bind:group={$samplingDesign.inventory.stage2}
			name="stage-2"
			inputs={stage2Inputs}
		/>
	{:else if selectedStep === 'Stage 3'}
		{#if $samplingDesign.inventory.stage2.includes('plot')}
			<h3 class="col-span-2 text-sm text-min-contrast-gray">Restricted Search -> Plot</h3>
			<CheckboxGroup
				bind:group={$samplingDesign.inventory.stage3}
				name="stage-3-plot"
				inputs={plotInputs}
			/>
		{/if}
		{#if $samplingDesign.inventory.stage2.includes('transect')}
			<h3 class="col-span-2 text-sm text-min-contrast-gray">Restricted Search -> Transect</h3>
			<CheckboxGroup
				bind:group={$samplingDesign.inventory.stage3}
				name="stage-3-plot"
				inputs={tansectInputs}
			/>
		{/if}
		{#if $samplingDesign.inventory.stage2.includes('quadrat')}
			<h3 class="col-span-2 text-sm text-min-contrast-gray">Restricted Search -> Quadrat</h3>
			<CheckboxGroup
				bind:group={$samplingDesign.inventory.stage3}
				name="stage-3-plot"
				inputs={quadratInputs}
			/>
		{/if}
		{#if $samplingDesign.inventory.stage2.includes('plotless')}
			<h3 class="col-span-2 text-sm text-min-contrast-gray">Restricted Search -> Plotless</h3>
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
	<div class="col-start-1 flex items-center gap-3">
		{#if selectedStep !== 'Stage 1'}
			<button
				on:click={() => (selectedStep = steps[steps.findIndex((s) => s === selectedStep) - 1])}
				class="bg-secondary text-white py-1 px-3 rounded-md flex items-center gap-1"
			>
				<ArrowLeft classes="h-4 w-4" />
				Back
			</button>
		{/if}
		{#if selectedStep !== 'Stage 3'}
			<button
				on:click={() => (selectedStep = steps[steps.findIndex((s) => s === selectedStep) + 1])}
				class="bg-secondary text-white py-1 px-3 rounded-md flex items-center gap-1"
			>
				Next
				<ArrowRight classes="h-4 w-4" />
			</button>
		{/if}
	</div>
</Question>
