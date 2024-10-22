<script lang="ts">
	import Multistep from '$lib/components/Multistep.svelte';
	import { samplingDesign } from '$lib/stores/samplingDesign';
	import { 
		samplingDesignAndLocationSchema,
		stageOneInventoryProcessEnum,
	stageTwoRestrictedSearchEnum,
	stageThreePlotEnum,
	stageThreeTransectEnum,
	stageThreeQuadratEnum, 
	stageThreePlotlessTechniquesEnum} from '$lib/schemas/samplingDesignAndLocation';
	import CheckboxGroupValue from '../CheckboxGroupValue.svelte';

	let stage1Inputs = stageOneInventoryProcessEnum.options

	// let stage1InputsLabelsOnly = [
	// 	{ label: 'Restricted search - @ $%//(())', value: 'Restricted search - @ $%//(())' },
	// 	{ label: 'Open search', value: 'Open search' },
	// 	{ label: 'Opportunistic search', value: 'Opportunistic search' },
	// 	{ label: 'Other', value: 'Other', otherPlaceholder: 'Please specify' }
	// 	// { label: 'Trap or sample', value: 'trapOrSample' },
	// 	// { label: 'Adventitious', value: 'adventitious' }
	// ];

	let stage2Inputs = stageTwoRestrictedSearchEnum.options;

	let plotInputs = stageThreePlotEnum.options;

	let tansectInputs = stageThreeTransectEnum.options;

	let quadratInputs = stageThreeQuadratEnum.options;

	let plotlessInputs = stageThreePlotlessTechniquesEnum.options;

	let steps = ['Stage 1', 'Stage 2', 'Stage 3'];
	let selectedStep = 'Stage 1';

	const restrictedSearch  = stageOneInventoryProcessEnum.enum['Restricted search'];
	const plot  = stageTwoRestrictedSearchEnum.enum['Plot'];
	const transect  = stageTwoRestrictedSearchEnum.enum['Transect'];
	const quadrat  = stageTwoRestrictedSearchEnum.enum['Quadrat'];
	const plotless  = stageTwoRestrictedSearchEnum.enum['Plotless techniques'];

</script>

<div class="col-span-2">
	<Multistep
		question="What type of inventory process was involved? (Select all that apply)"
		steps={3}
	>
		<div class="grid gap-8">
			<CheckboxGroupValue
				bind:group={$samplingDesign.methods.inventoryProcess.stageOne}
				name="stage-1"
				inputs={stage1Inputs}
			/>
		</div>

		<div slot="step-2">
			{#if $samplingDesign.methods.inventoryProcess.stageOne.includes(restrictedSearch)}
				<div class="grid gap-8">
					<h3 class="col-span-2 text-sm text-min-contrast-gray">Restricted Search</h3>
					<CheckboxGroupValue
						bind:group={$samplingDesign.methods.inventoryProcess.stageTwo.restrictedSearch}
						name="stage-2"
						inputs={stage2Inputs}
					/>
				</div>
			{/if}
		</div>

		<div slot="step-3" class="grid gap-10">
			{#if $samplingDesign.methods.inventoryProcess.stageOne.includes(restrictedSearch)}
				{#if $samplingDesign.methods.inventoryProcess.stageTwo.restrictedSearch.includes(plot)}
					<div class="grid gap-8">
						<h3 class="col-span-2 text-sm text-min-contrast-gray">Restricted Search -> Plot</h3>
						<CheckboxGroupValue
							bind:group={$samplingDesign.methods.inventoryProcess.stageThree.plot}
							name="stage-3-plot"
							inputs={plotInputs}
						/>
					</div>
				{/if}
				{#if $samplingDesign.methods.inventoryProcess.stageTwo.restrictedSearch.includes(transect)}
					<div class="grid gap-8">
						<h3 class="col-span-2 text-sm text-min-contrast-gray">Restricted Search -> Transect</h3>
						<CheckboxGroupValue
							bind:group={$samplingDesign.methods.inventoryProcess.stageThree.transect}
							name="stage-3-plot"
							inputs={tansectInputs}
						/>
					</div>
				{/if}
				{#if $samplingDesign.methods.inventoryProcess.stageTwo.restrictedSearch.includes(quadrat)}
					<div class="grid gap-8">
						<h3 class="col-span-2 text-sm text-min-contrast-gray">Restricted Search -> Quadrat</h3>
						<CheckboxGroupValue
							bind:group={$samplingDesign.methods.inventoryProcess.stageThree.quadrat}
							name="stage-3-plot"
							inputs={quadratInputs}
						/>
					</div>
				{/if}
				{#if $samplingDesign.methods.inventoryProcess.stageTwo.restrictedSearch.includes(plotless)}<div class="grid gap-8">
						<h3 class="col-span-2 text-sm text-min-contrast-gray">Restricted Search -> Plotless</h3>
						<CheckboxGroupValue
							bind:group={$samplingDesign.methods.inventoryProcess.stageThree.plotlessTechniques}
							name="stage-3-plot"
							inputs={plotlessInputs}
						/>
					</div>
				{/if}
			{/if}
		</div>
	</Multistep>
</div>
