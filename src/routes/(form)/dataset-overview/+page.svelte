<script lang="ts">
	import Biome from '$lib/components/datasetOverview/Biome.svelte';
	import DataOrigin from '$lib/components/datasetOverview/DataOrigin.svelte';
	import GeographicScope from '$lib/components/datasetOverview/GeographicScope.svelte';
	import Realm from '$lib/components/datasetOverview/Realm.svelte';
	import TaxonomicScope from '$lib/components/datasetOverview/TaxonomicScope.svelte';
	import TaxonomicScope2 from '$lib/components/datasetOverview/TaxonomicScope2.svelte';
	import TemporalScope from '$lib/components/datasetOverview/TemporalScope.svelte';
	import Question from '$lib/components/formControls/Question.svelte';
	import Section from '$lib/components/formControls/Section.svelte';
	import StepTitle from '$lib/components/formControls/StepTitle.svelte';
	import { datasetOverview } from '$lib/stores/datasetOverview';
	import { step } from '$lib/stores/steps';
	import { onMount } from 'svelte';

	onMount(() => {
		step.set(2);
	});
</script>

<StepTitle title="Dataset overview" />

<div class="space-y-32">
	<Section title="Data origin">
		<DataOrigin />
	</Section>

	<Section
		title="Temporal scope"
		description="Please provide dates to the highest resolution possible"
	>
		<TemporalScope />
	</Section>

	<Section
		title="Geographic scope"
		description={[
			'Where were the data collected?',
			'E.g. if several neighbouring countries are involved select "Regional"; if the countries are spread widely across one continent select "Continental".'
		]}
	>
		<GeographicScope />
	</Section>

	<Section
		title="Realm"
		description={[
			'Which realms do the data involve?',
			"We use the IUCNGET classification - click <a class='underline' href='https://global-ecosystems.org/explore' target='_blank'>here</a> for definitions"
		]}
	>
		<Realm />
	</Section>

	<Section
		title="Biome"
		description={[
			'In which biomes were the data collected? (Select all that apply)',
			'If the biome you are interested in is not currently selectable, please adjust the realm(s) chosen in the previous question.'
		]}
	>
		<Biome />
	</Section>

	<Section
		title="Taxonomic scope"
		description="Which taxonomic groups are represented in the dataset? (Select all that apply)"
	>
		<!-- <Question question="Which kingdoms are involved?">
			<TaxonomicScope />
		</Question> -->
		<div class="col-span-2"><TaxonomicScope2 /></div>
	</Section>
</div>
