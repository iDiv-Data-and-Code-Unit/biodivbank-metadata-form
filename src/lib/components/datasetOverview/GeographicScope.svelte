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
	import { onMount } from 'svelte';
	import Ror from '../ROR.svelte';
	// import Radio from '$lib/components/Radio';

	let notAvailable = false;
	const initialView: LatLngExpression = [51.514244, 7.468429];

	let selectedCountry = '';
	let selectedMarineRegion = '';

	$datasetOverview.geographicScope.countries = $datasetOverview.geographicScope.countries.filter((c) => c !== '');
	$datasetOverview.geographicScope.marineRegions = $datasetOverview.geographicScope.marineRegions.filter((c) => c !== '');
	
</script>

<Question direction="column" question="What is the geographic extent of the dataset?">
	 <Radio
		bind:group={$datasetOverview.geographicScope.extent}
		label="Local"
		name="spatialScope"
		value="Local"
		addition="subnational"
	/>
	<Radio
		bind:group={$datasetOverview.geographicScope.extent}
		label="National"
		name="spatialScope"
		value="National"
	/>
	<Radio
		bind:group={$datasetOverview.geographicScope.extent}
		label="Regional"
		name="spatialScope"
		value="Regional"
		addition="multinational"
	/>
	<Radio
		bind:group={$datasetOverview.geographicScope.extent}
		label="Continental"
		name="spatialScope"
		value="Continental"
	/>
<Radio
		bind:group={$datasetOverview.geographicScope.extent}
		label="Global"
		name="spatialScope"
		value="Global"
	/>
	<div class="grid grid-cols-2 gap-8">
		<div class="col-span-2" />
		<div class="flex flex-col gap-4">
		 <Select
				label="Country"
				class="col-start-1"
				placeholder="Select a country..."
				bind:value={selectedCountry}
				options={$geoStore.countries}
				onSelect={() => {
					if ($datasetOverview.geographicScope.countries.includes(selectedCountry)) {
						selectedCountry = '';
						return;
					}
					$datasetOverview.geographicScope.countries = [...$datasetOverview.geographicScope.countries, selectedCountry];
					selectedCountry = '';
				}}
			/>
			<div class="flex gap-2 flex-wrap">
				{#each $datasetOverview.geographicScope.countries as country}
					<button
						class="bg-primary text-white px-2 py-1 rounded-md flex gap-1 items-center"
						on:click={() =>
							($datasetOverview.geographicScope.countries = $datasetOverview.geographicScope.countries.filter(
								(c) => c !== country
							))}
					>
						{country}<Cross class="h-4 w-4" />
					</button>
				{/each}
				</div>
		</div>
		<div class="flex flex-col gap-4">

			<Select
				label="Marine Region"
				placeholder="Select a marine region..."
				options={$geoStore.marineRegions}
				bind:value={selectedMarineRegion}
				onSelect={() => {
					if ($datasetOverview.geographicScope.marineRegions.includes(selectedMarineRegion)) {
						selectedMarineRegion = '';
						return;
					}
					$datasetOverview.geographicScope.marineRegions = [
						...$datasetOverview.geographicScope.marineRegions,
						selectedMarineRegion
					];
					selectedMarineRegion = '';
				}}
			/>
			<div class="flex gap-2 flex-wrap">
				{#each $datasetOverview.geographicScope.marineRegions as marine}
					<button
						class="bg-secondary text-white px-2 py-1 rounded-md flex gap-1 items-center"
						on:click={() =>
							($datasetOverview.geographicScope.marineRegions = $datasetOverview.geographicScope.marineRegions.filter(
								(c) => c !== marine
							))}
					>
						{marine}<Cross class="h-4 w-4" />
					</button>
				{/each}
				</div>
		</div>
		<Select
			label="Coordiantes"
			class="col-start-1"
			placeholder="Select a coordiante input format..."
			bind:value={$geoStore.georef.coordinateType}
			options={['Custom shape', 'Bounding box', 'Point']}
		/>

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
		bind:value={$datasetOverview.geographicScope.fieldStation.name}
	/> 
	<div>
	<Ror
		bind:value={$datasetOverview.geographicScope.fieldStation.rorId}
		bind:notAvailable={notAvailable}
		name="ror-author-list"
		label={`Institution ROR ID ${$datasetOverview.geographicScope.fieldStation.name ? ' *' : ''}`}
		maxLength={9}
		placeholder="XXXXXXXXX"
		invalidInputErrorMsg="A ROR ID must contain 9 alphanumeric characters."
		invalidatedErrorMsg="ROR ID does not exist, please check that you have typed it in correctly."
		confirmCheckboxMsg="No ROR ID available?"
		validatedMsg="ROR ID found."
	/>
</Question>
