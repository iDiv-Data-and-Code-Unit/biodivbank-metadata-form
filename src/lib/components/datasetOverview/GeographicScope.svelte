<script lang="ts">
	import Select from '../Select.svelte';
	import Question from '../formControls/Question.svelte';
	import countries from '../generalInformation/countries.json';
	import TextInput from '../TextInput.svelte';
	import { datasetOverview } from '$lib/stores/datasetOverview';
	import Radio from '$lib/components/Radio.svelte';
	// import Radio from '$lib/components/Radio';
</script>

<Question direction="column" question="What is the geographic extent of the dataset?">
	<Radio
		group={$datasetOverview.spatialScope}
		label="Local"
		name="spatialScope"
		value="local"
		addition="subnational"
	/>
	<Radio
		group={$datasetOverview.spatialScope}
		label="National"
		name="spatialScope"
		value="national"
	/>
	<Radio
		group={$datasetOverview.spatialScope}
		label="Regional"
		name="spatialScope"
		value="regional"
		addition="multinational"
	/>
	<Radio
		group={$datasetOverview.spatialScope}
		label="Continental"
		name="spatialScope"
		value="continental"
	/>
	<Radio group={$datasetOverview.spatialScope} label="Global" name="spatialScope" value="global" />
	<div class="grid grid-cols-2 gap-8">
		<div class="col-span-2" />
		<Select
			label="Country"
			class="col-start-1"
			placeholder="Select a country..."
			bind:value={$datasetOverview.country}
			options={countries.map((c) => c.en)}
		/>
		<Select
			label="Marine Region"
			placeholder="Select a marine region..."
			bind:value={$datasetOverview.country}
			options={countries.map((c) => c.en)}
		/>
		<!-- <Select
			label="Coordiantes"
			class="col-start-1"
			placeholder="Select a coordiante input format..."
			bind:value={$datasetOverview.coordinateType}
			options={['Custom shape', 'Bounding box', 'Point']}
		/>
		<div class="flex gap-8">
			<TextInput
				label="Longitude"
				placeholder="Longitude..."
				bind:value={$datasetOverview.longitude}
			/>
			<TextInput
				label="Latitude"
				placeholder="Latitude..."
				bind:value={$datasetOverview.latitude}
			/>
		</div> -->
		<img class="col-span-2" src="/map.png" alt="" />
		<Select
			label="Field station"
			placeholder="Select a field station..."
			bind:value={$datasetOverview.fieldStation}
			options={['Field station 1', 'Field station 2', 'Field station 3']}
		/>
		<TextInput
			bind:value={$datasetOverview.fieldStationROR}
			label="Field station ROR"
			placeholder="Type the ROR ID here..."
		/>
	</div>
</Question>
