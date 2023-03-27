<script lang="ts">
	import Select from '../Select.svelte';
	import Question from '../formControls/Question.svelte';
	import countries from '../generalInformation/countries.json';
	import TextInput from '../TextInput.svelte';
	import { datasetOverview } from '$lib/stores/datasetOverview';
</script>

<Question direction="column" question="What is the geographic extent of the dataset?">
	<label class="flex items-center gap-3">
		<input type="radio" name="extent" />
		<span>
			Local&nbsp;
			<span class="text-xs text-description">(subnational)</span>
		</span>
	</label>
	<label class="flex items-center gap-3">
		<input type="radio" name="extent" />
		<span>National</span>
	</label>
	<label class="flex items-center gap-3">
		<input type="radio" name="extent" />
		<span>
			Regional&nbsp;
			<span class="text-xs text-description">(multinational)</span>
		</span>
	</label>
	<label class="flex items-center gap-3">
		<input type="radio" name="extent" />
		<span>Continental</span>
	</label>
	<label class="flex items-center gap-3">
		<input type="radio" name="extent" />
		<span>Global</span>
	</label>
	<div class="grid grid-cols-2 gap-8">
		<Select
			label="Spatial scope"
			placeholder="Select spatial scope..."
			bind:value={$datasetOverview.spatialScope}
			options={['Local', 'Regional', 'National', 'Multinational', 'Continental', 'Global']}
		/>
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
