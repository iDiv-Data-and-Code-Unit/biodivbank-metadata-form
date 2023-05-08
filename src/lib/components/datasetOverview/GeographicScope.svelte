<script lang="ts">
	import Select from '../Select.svelte';
	import Question from '../formControls/Question.svelte';
	import countries from '../generalInformation/countries.json';
	import TextInput from '../TextInput.svelte';
	import { datasetOverview } from '$lib/stores/datasetOverview';
	import Radio from '$lib/components/Radio.svelte';
	// import Radio from '$lib/components/Radio';

	let notAvailable = false;
</script>

<Question direction="column" question="What is the geographic extent of the dataset?">
	<Radio
		bind:group={$datasetOverview.spatialScope}
		label="Local"
		name="spatialScope"
		value="Local"
		addition="subnational"
	/>
	<Radio
		bind:group={$datasetOverview.spatialScope}
		label="National"
		name="spatialScope"
		value="National"
	/>
	<Radio
		bind:group={$datasetOverview.spatialScope}
		label="Regional"
		name="spatialScope"
		value="Regional"
		addition="multinational"
	/>
	<Radio
		bind:group={$datasetOverview.spatialScope}
		label="Continental"
		name="spatialScope"
		value="Continental"
	/>
	<Radio
		bind:group={$datasetOverview.spatialScope}
		label="Global"
		name="spatialScope"
		value="Global"
	/>
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
	</div>
</Question>
<Question
	question="Was the original work carried out at a named field station, ecological observatory or network?"
	direction="column"
>
	<TextInput
		label="Field station"
		placeholder="E.g. Smithsonian Tropical Research Institute, Barro Colorado Island"
		bind:value={$datasetOverview.fieldStation}
	/>
	<div>
		<TextInput
			bind:value={$datasetOverview.fieldStationROR}
			label="ROR ID"
			placeholder="xxxxxxxxx"
			disabled={notAvailable}
		/>
		<div class="mt-1">
			<label class="text-sm mr-1"
				><span>No ROR ID availbale?</span>
				<input type="checkbox" class="ml-1 !w-4 !h-4" bind:checked={notAvailable} />
			</label>
		</div>
	</div>
</Question>
