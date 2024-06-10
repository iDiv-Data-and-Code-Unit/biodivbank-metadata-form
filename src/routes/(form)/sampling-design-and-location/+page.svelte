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
	import Radio from '$lib/components/Radio.svelte';
	import InventoryProcess from '$lib/components/sampling-design/InventoryProcess.svelte';
	import MethodType from '$lib/components/sampling-design/MethodType.svelte';
	import TargetedAndExcludedTaxa from '$lib/components/sampling-design/TargetedAndExcludedTaxa.svelte';
	import OtherTargetedCategories from '$lib/components/sampling-design/OtherTargetedCategories.svelte';
	import UnderRepresented from '$lib/components/sampling-design/UnderRepresented.svelte';
	import { params } from '$lib/stores/paramsStore';

	$: console.log($params);

	let multipleEventsInputs = [
		{ label: 'Multiple sites', value: 'multipleSites' },
		{ label: 'Multiple time points', value: 'multipleTimePoints' },
		{ label: 'No', value: 'no' }
	];

	onMount(() => {
		step.set(3);
	});

	// $: {
	// 	if ($samplingDesign.inventory.stage1.includes('restrictedSearch')) {
	// 		selectedStep = 'Stage 2';
	// 	}
	// }
</script>

<StepTitle title="Sampling design" />
<div class="space-y-32">
	<Section title="Study design">
		<Question
			question="Did the study involve more than one sampling event? (Select all that apply)"
			direction="column"
		>
			{#each multipleEventsInputs as { label, value }}
				<label class="flex items-center gap-3">
					<input
						type="checkbox"
						{value}
						bind:group={$samplingDesign.multipleEvents}
						name="multipleEvents"
						disabled={value !== 'no' && $samplingDesign.multipleEvents.includes('no')}
					/>
					<span class="text-sm shrink-0">
						{label}&nbsp;
					</span>
				</label>
			{/each}
		</Question>
		{#if $samplingDesign.multipleEvents.length && !$samplingDesign.multipleEvents.includes('no')}
			<Question
				question="Did environmental characteristics (e.g. habitat types, disturbance types) or methods (e.g. devices or effort) vary across sampling events?"
				direction="column"
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
		<InventoryProcess />
		<MethodType />
	</Section>

	<Section
		title="Sampling scope"
		description="If a specific list of target taxa was used in the survey, please upload it [here]."
	>
		<TargetedAndExcludedTaxa />
		<OtherTargetedCategories />
		<UnderRepresented />
	</Section>

	<Section title="Sampling effort">
		<Question question="Describe the intensity of sampling (i.e. effort)">
			<Textarea
				bind:value={$samplingDesign.effortIntensity}
				placeholder="E.g. 40 box traps, deployed at even spacings along 4 parallel 100 m transects placed 50 m apart, and visited at 6-hourly intervals over a 48 hour period.
E.g. Two people occupying a bird hide for a period of 8 hours and undertaking a 30-minute count of species within the 150 degree field of view every 2 hours.
E.g. A single baited camera trap station with motion sensor trigger, deployed for a period of 10 days and configured for detecting large fauna moving through a known traffic way."
				label=""
				rows={10}
			/>
		</Question>
		<Question question="Was sampling effort identical for all sampling events?" direction="column">
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
				addition="only 1 sampling event"
				value="notApplicable"
				bind:group={$samplingDesign.effortIdentical}
				name="effortIdentical"
			/>
			{#if $samplingDesign.effortIdentical === 'no'}
				<Textarea
					bind:value={$samplingDesign.effortVariation}
					class="col-start-1 col-span-2"
					placeholder="Please describe how effort varied between locations or at different points in time"
					label=""
					rows={6}
				/>
			{/if}
		</Question>
	</Section>

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

	<Section
		title="Further information"
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
</div>
