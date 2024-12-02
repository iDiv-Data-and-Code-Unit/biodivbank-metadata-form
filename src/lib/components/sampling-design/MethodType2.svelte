<script lang="ts">
	import clsx from 'clsx';
	import Question from '../formControls/Question.svelte';
	import CheckboxGroupValue from '../CheckboxGroupValue.svelte';
	import { samplingDesign } from '$lib/stores/samplingDesign';
	import ArrowLeft from '$lib/icons/ArrowLeft.svelte';
	import ArrowRight from '$lib/icons/ArrowRight.svelte';
	import Multistep from '../Multistep.svelte';
	import MethodType from './MethodType.svelte';

	import {
		samplingDesignAndLocationSchema,
		stageOneMethodTypeEnum,
		stageThreeChemicalIntentEnum,
		stageThreeChemicalKnockdownEnum,
		stageThreeMarkRecaptureEnum,
		stageThreeNetEnum,
		stageThreeTrapEnum,
		stageThreeTrawlEnum,
		stageTwoCaptureEnum,
		stageTwoEnvironmentalSampleEnum,
		stageTwoHumanDirectObservationEnum,
		stageTwoMachineObservationEnum,
		stageTwoPhysicalEvidenceEnum
	} from '$lib/schemas/samplingDesignAndLocation';

	let stage1Inputs = stageOneMethodTypeEnum.options;
	let humanInputs = stageTwoHumanDirectObservationEnum.options;
	let machineObservationInputs = stageTwoMachineObservationEnum.options;
	let captureInputs = stageTwoCaptureEnum.options;
	let environmentalSampleInputs = stageTwoEnvironmentalSampleEnum.options;
	let physicalEvidenceInputs = stageTwoPhysicalEvidenceEnum.options;
	let netInputs = stageThreeNetEnum.options;
	let trapInputs = stageThreeTrapEnum.options;
	let trawlInputs = stageThreeTrawlEnum.options;
	let chemicalIntentInputs = stageThreeChemicalIntentEnum.options;
	let chemicalKnockdownInputs = stageThreeChemicalKnockdownEnum.options;
	let markRecaptureInputs = stageThreeMarkRecaptureEnum.options;

	let steps = ['Stage 1', 'Stage 2', 'Stage 3'];
	let selectedStep = 'Stage 1';

	const humanDirectObservation = stageOneMethodTypeEnum.enum['Human / direct observation'];
	const machineObservation = stageOneMethodTypeEnum.enum['Machine observation'];
	const capture = stageOneMethodTypeEnum.enum['Capture'];
	const environmentalSample = stageOneMethodTypeEnum.enum['Environmental sample'];
	const physicalEvidence = stageOneMethodTypeEnum.enum['Physical evidence'];
	const net = stageTwoCaptureEnum.enum['Net'];
	const trap = stageTwoCaptureEnum.enum['Trap'];
	const trawl = stageTwoCaptureEnum.enum['Trawl'];
	const chemicalIntent = stageTwoCaptureEnum.enum['Chemical intent'];
	const chemicalKnockDown = stageTwoCaptureEnum.enum['Chemical knockdown'];
	const markrecapture = stageTwoCaptureEnum.enum['Mark-recapture'];
</script>

<div class="col-span-2">
	<Multistep question="How were the data obtained? (Select all that apply)" steps={3}>
		<div class="grid gap-8">
			<CheckboxGroupValue
				bind:group={$samplingDesign.methods.methodType.stageOne}
				name="stage-1"
				inputs={stage1Inputs}
			/>
		</div>

		<div class="grid gap-8" slot="step-2">
			{#if $samplingDesign.methods.methodType.stageOne.includes(humanDirectObservation)}
				<h3 class="col-span-2 text-sm text-min-contrast-gray">Human / direct observation</h3>
				<CheckboxGroupValue
					bind:group={$samplingDesign.methods.methodType.stageTwo.humanDirectObservation}
					name="stage-2"
					inputs={humanInputs}
				/>
			{/if}
			{#if $samplingDesign.methods.methodType.stageOne.includes(machineObservation)}
				<h3 class="col-span-2 text-sm text-min-contrast-gray">Machine observation</h3>
				<CheckboxGroupValue
					bind:group={$samplingDesign.methods.methodType.stageTwo.machineObservation}
					name="stage-2"
					inputs={machineObservationInputs}
				/>
			{/if}
			{#if $samplingDesign.methods.methodType.stageOne.includes(capture)}
				<h3 class="col-span-2 text-sm text-min-contrast-gray">Capture</h3>
				<CheckboxGroupValue
					bind:group={$samplingDesign.methods.methodType.stageTwo.capture}
					name="stage-2"
					inputs={captureInputs}
				/>
			{/if}
			{#if $samplingDesign.methods.methodType.stageOne.includes(environmentalSample)}
				<h3 class="col-span-2 text-sm text-min-contrast-gray">Environmental sample</h3>
				<CheckboxGroupValue
					bind:group={$samplingDesign.methods.methodType.stageTwo.environmentalSample.values}
					bind:other={$samplingDesign.methods.methodType.stageTwo.environmentalSample.other}
					name="stage-2"
					inputs={environmentalSampleInputs}
				/>
			{/if}
			{#if $samplingDesign.methods.methodType.stageOne.includes(physicalEvidence)}
				<h3 class="col-span-2 text-sm text-min-contrast-gray">Physical evidence</h3>
				<CheckboxGroupValue
					bind:group={$samplingDesign.methods.methodType.stageTwo.physicalEvidence.values}
					bind:other={$samplingDesign.methods.methodType.stageTwo.physicalEvidence.other}
					name="stage-2"
					inputs={physicalEvidenceInputs}
				/>
			{/if}
		</div>

		<div class="grid gap-8" slot="step-3">
			{#if $samplingDesign.methods.methodType.stageTwo.capture.length && $samplingDesign.methods.methodType.stageOne.length}
				{#if $samplingDesign.methods.methodType.stageTwo.capture.includes(net)}
					<h3 class="col-span-2 text-sm text-min-contrast-gray">Net</h3>
					<CheckboxGroupValue
						bind:group={$samplingDesign.methods.methodType.stageThree.net.values}
						bind:other={$samplingDesign.methods.methodType.stageThree.net.other}
						name="stage-3-plot"
						inputs={netInputs}
					/>
				{/if}
				{#if $samplingDesign.methods.methodType.stageTwo.capture.includes(trap)}
					<h3 class="col-span-2 text-sm text-min-contrast-gray">Trap</h3>
					<CheckboxGroupValue
						bind:group={$samplingDesign.methods.methodType.stageThree.trap.values}
						bind:other={$samplingDesign.methods.methodType.stageThree.trap.other}
						name="stage-3-plot"
						inputs={trapInputs}
					/>
				{/if}
				{#if $samplingDesign.methods.methodType.stageTwo.capture.includes(trawl)}
					<h3 class="col-span-2 text-sm text-min-contrast-gray">Trawl</h3>
					<CheckboxGroupValue
						bind:group={$samplingDesign.methods.methodType.stageThree.trawl.values}
						bind:other={$samplingDesign.methods.methodType.stageThree.trawl.other}
						name="stage-3-plot"
						inputs={trawlInputs}
					/>
				{/if}

				{#if $samplingDesign.methods.methodType.stageTwo.capture.includes(chemicalIntent)}
					<h3 class="col-span-2 text-sm text-min-contrast-gray">Chemical intent</h3>
					<CheckboxGroupValue
						bind:group={$samplingDesign.methods.methodType.stageThree.chemicalIntent.values}
						bind:other={$samplingDesign.methods.methodType.stageThree.chemicalIntent.other}
						name="stage-3-plot"
						inputs={chemicalIntentInputs}
					/>
				{/if}
				{#if $samplingDesign.methods.methodType.stageTwo.capture.includes(chemicalKnockDown)}
					<h3 class="col-span-2 text-sm text-min-contrast-gray">Chemical knockdown</h3>
					<CheckboxGroupValue
						bind:group={$samplingDesign.methods.methodType.stageThree.chemicalKnockdown.values}
						bind:other={$samplingDesign.methods.methodType.stageThree.chemicalKnockdown.other}
						name="stage-3-plot"
						inputs={chemicalKnockdownInputs}
					/>
				{/if}
				{#if $samplingDesign.methods.methodType.stageTwo.capture.includes(markrecapture)}
					<h3 class="col-span-2 text-sm text-min-contrast-gray">Mark-recapture</h3>
					<CheckboxGroupValue
						bind:group={$samplingDesign.methods.methodType.stageThree.markRecapture.values}
						bind:other={$samplingDesign.methods.methodType.stageThree.markRecapture.other}
						name="stage-3-plot"
						inputs={markRecaptureInputs}
					/>
				{/if}
			{/if}
		</div>
	</Multistep>
</div>
