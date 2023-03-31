<script lang="ts">
	import Select from '../Select.svelte';
	import Question from '../formControls/Question.svelte';
	import countries from '../generalInformation/countries.json';
	import TextInput from '../TextInput.svelte';
	import { datasetOverview } from '$lib/stores/datasetOverview';
</script>

<Question direction="column" question="What is the geographic extent of the dataset?">
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
		</div>
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
