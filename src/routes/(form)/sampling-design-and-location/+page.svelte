<script lang="ts">
	import Question from '$lib/components/formControls/Question.svelte';
	import Section from '$lib/components/formControls/Section.svelte';
	import StepTitle from '$lib/components/formControls/StepTitle.svelte';
	import RiverZone from '$lib/components/sampling-design/RiverZone.svelte';
	import StreamOrder from '$lib/components/sampling-design/StreamOrder.svelte';
	import VegetationLayer from '$lib/components/sampling-design/VegetationLayer.svelte';
	import { datasetOverview } from '$lib/stores/datasetOverview';
	import { samplingDesign } from '$lib/stores/samplingDesign';
	import { step } from '$lib/stores/steps';
	import { onMount } from 'svelte';

	onMount(() => {
		step.set(3);
	});
</script>

<StepTitle title="Sampling design & location" />

<Section title="Sampling location">
	{#if $datasetOverview.coreRealms.includes('terrestrial') || $datasetOverview.transitionalRealms.some( (realm) => realm
					.toLowerCase()
					.includes('terrestrial') )}
		<VegetationLayer />
	{/if}
	{#if $datasetOverview.coreRealmBiomes.includes('riversAndStreams')}
		<RiverZone />
		<StreamOrder />
	{/if}
</Section>

<pre>{JSON.stringify($samplingDesign, null, 2)}</pre>
