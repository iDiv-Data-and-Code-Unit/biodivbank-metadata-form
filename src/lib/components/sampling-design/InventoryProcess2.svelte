<script lang="ts">
	import Multistep from '$lib/components/Multistep.svelte';
	import CheckboxGroup from '$lib/components/CheckboxGroup.svelte';
	import { samplingDesign } from '$lib/stores/samplingDesign';

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

<div class="col-span-2">
	<Multistep
		question="What type of inventory process was involved? (Select all that apply)"
		steps={3}
	>
		<div class="grid gap-8">
			<CheckboxGroup
				bind:group={$samplingDesign.inventory.stage1}
				name="stage-1"
				inputs={stage1Inputs}
			/>
		</div>

		<div slot="step-2">
			{#if $samplingDesign.inventory.stage1.includes('restrictedSearch')}
				<div class="grid gap-8">
					<h3 class="col-span-2 text-sm text-min-contrast-gray">Restricted Search</h3>
					<CheckboxGroup
						bind:group={$samplingDesign.inventory.stage2}
						name="stage-2"
						inputs={stage2Inputs}
					/>
				</div>
			{/if}
		</div>

		<div slot="step-3" class="grid gap-10">
			{#if $samplingDesign.inventory.stage1.includes('restrictedSearch')}
				{#if $samplingDesign.inventory.stage2.includes('plot')}
					<div class="grid gap-8">
						<h3 class="col-span-2 text-sm text-min-contrast-gray">Restricted Search -> Plot</h3>
						<CheckboxGroup
							bind:group={$samplingDesign.inventory.stage3}
							name="stage-3-plot"
							inputs={plotInputs}
						/>
					</div>
				{/if}
				{#if $samplingDesign.inventory.stage2.includes('transect')}
					<div class="grid gap-8">
						<h3 class="col-span-2 text-sm text-min-contrast-gray">Restricted Search -> Transect</h3>
						<CheckboxGroup
							bind:group={$samplingDesign.inventory.stage3}
							name="stage-3-plot"
							inputs={tansectInputs}
						/>
					</div>
				{/if}
				{#if $samplingDesign.inventory.stage2.includes('quadrat')}
					<div class="grid gap-8">
						<h3 class="col-span-2 text-sm text-min-contrast-gray">Restricted Search -> Quadrat</h3>
						<CheckboxGroup
							bind:group={$samplingDesign.inventory.stage3}
							name="stage-3-plot"
							inputs={quadratInputs}
						/>
					</div>
				{/if}
				{#if $samplingDesign.inventory.stage2.includes('plotless')}<div class="grid gap-8">
						<h3 class="col-span-2 text-sm text-min-contrast-gray">Restricted Search -> Plotless</h3>
						<CheckboxGroup
							bind:group={$samplingDesign.inventory.stage3}
							name="stage-3-plot"
							inputs={plotlessInputs}
						/>
					</div>
				{/if}
			{/if}
		</div>
	</Multistep>
</div>
