<script lang="ts">
	import Select from '../Select.svelte';
	import Question from '../formControls/Question.svelte';
	// import countries from '../generalInformation/countries.json';
	import TextInput from '../TextInput.svelte';
	import { datasetOverview } from '$lib/stores/datasetOverview';
	import Radio from '$lib/components/Radio.svelte';
	import Leaflet from '../Leaflet.svelte';
	import type { LatLngExpression } from 'leaflet';
	import { geoStore } from '$lib/stores/geo';
	import Trash from '$lib/icons/Trash.svelte';
	import Cross from '$lib/icons/Cross.svelte';
	import MultiCombobox from '../formControls/MultiCombobox.svelte';
	// import Radio from '$lib/components/Radio';

	let notAvailable = false;
	const initialView: LatLngExpression = [51.514244, 7.468429];

	let selectedCountry = '';
	let selectedMarineRegion = '';
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
		<div class="flex flex-col gap-4">
			<MultiCombobox
				options={$geoStore.countries}
				label="Country"
				emptyMsg="No country selected"
				resource="countries"
			/>
			<!-- <Select
				label="Country"
				class="col-start-1"
				placeholder="Select a country..."
				bind:value={selectedCountry}
				options={$geoStore.countries}
				onSelect={() => {
					if ($datasetOverview.countries.includes(selectedCountry)) {
						selectedCountry = '';
						return;
					}
					$datasetOverview.countries = [...$datasetOverview.countries, selectedCountry];
					selectedCountry = '';
				}}
			/>
			<div class="flex gap-2 flex-wrap">
				{#each $datasetOverview.countries as country}
					<button
						class="bg-primary text-white px-2 py-1 rounded-md flex gap-1 items-center"
						on:click={() =>
							($datasetOverview.countries = $datasetOverview.countries.filter(
								(c) => c !== country
							))}
					>
						{country}<Cross class="h-4 w-4" />
					</button>
				{/each}
			</div> -->
		</div>
		<div class="flex flex-col gap-4">
			<MultiCombobox
				options={$geoStore.marineRegions}
				label="Marine Region"
				emptyMsg="No marine region selected"
				resource="marineRegions"
			/>
			<!-- <Select
				label="Marine Region"
				placeholder="Select a marine region..."
				options={$geoStore.marineRegions}
				bind:value={selectedMarineRegion}
				onSelect={() => {
					if ($datasetOverview.marineRegions.includes(selectedMarineRegion)) {
						selectedMarineRegion = '';
						return;
					}
					$datasetOverview.marineRegions = [
						...$datasetOverview.marineRegions,
						selectedMarineRegion
					];
					selectedMarineRegion = '';
				}}
			/> -->
			<!-- <div class="flex gap-2 flex-wrap">
				{#each $datasetOverview.marineRegions as region}
					<button
						class="bg-secondary text-white px-2 py-1 rounded-md flex gap-1 items-center"
						on:click={() =>
							($datasetOverview.marineRegions = $datasetOverview.marineRegions.filter(
								(c) => c !== region
							))}
					>
						{region}<Cross class="h-4 w-4" />
					</button>
				{/each}
			</div> -->
		</div>
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
		<div class="col-span-2 aspect-video">
			<Leaflet view={initialView} zoom={4} />
		</div>
		<!-- <img class="col-span-2" src="/map.png" alt="" /> -->
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
		<!-- TODO: use validated ROR -->
		<TextInput
			bind:value={$datasetOverview.fieldStationROR}
			label={`ROR ID ${$datasetOverview.fieldStation ? ' *' : ''}`}
			placeholder="xxxxxxxxx"
			disabled={notAvailable}
		/>
		<div class="mt-1">
			<label class="text-sm mr-1"
				><span>No ROR ID available?</span>
				<input type="checkbox" class="ml-1 !w-4 !h-4" bind:checked={notAvailable} />
			</label>
		</div>
	</div>
</Question>
