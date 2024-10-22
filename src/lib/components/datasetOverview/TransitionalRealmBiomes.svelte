<script lang="ts">
	import { datasetOverview } from '$lib/stores/datasetOverview';
	import {  
		FreshWaterMarineBiomeEnum,
		TerrestrialFreshWaterBiomeEnum,
		 MarineTerrestrialBiomeEnum, 
			SubterraneanFreshWaterBiomeEnum, 
			SubterraneanMarineBiomeEnum,
		MarineFreshWaterTerrestrialBiomeEnum } from '$lib/schemas/datasetOverview';

	// let freshwaterMarineBiomes = [
	// 	{
	// 		label: 'Semi-confined transitional waters',
	// 		value: 'semiConfinedTransitionalWaters'
	// 	}
	// ];

	// let terrestrialFreshwaterBiomes = [
	// 	{
	// 		label: 'Palustrine wetlands',
	// 		value: 'palustrineWetlands'
	// 	}
	// ];

	// let marineTerrestrial = [
	// 	{
	// 		label: 'Shorelines',
	// 		value: 'shorelines'
	// 	},
	// 	{
	// 		label: 'Supralittoral coastal',
	// 		value: 'supralittoralCoastal'
	// 	},
	// 	{
	// 		label: 'Anthropogenic shorelines',
	// 		value: 'anthropogenicShorelines'
	// 	}
	// ];

	// let marineFreshwaterTerrestrialBiomes = [
	// 	{
	// 		label: 'Brackish Tidal',
	// 		value: 'brackishTidal'
	// 	}
	// ];

	// let subterraneanFreshwaterBiomes = [
	// 	{
	// 		label: 'Subterranean freshwaters',
	// 		value: 'subterraneanFreshwaters'
	// 	},
	// 	{
	// 		label: 'Anthropogenic subterranean freshwaters',
	// 		value: 'anthropogenicSubterraneanFreshwaters'
	// 	}
	// ];

	// let subterraneanMarineBiomes = [
	// 	{
	// 		label: 'Subterranean tidal',
	// 		value: 'subterraneanTidal'
	// 	}
	// ];
</script>

<div>
	<h4 class="font-medium text-lg mb-8">Transitional realm biomes</h4>
	<div class="flex flex-col gap-8 text-sm mb-8">
		{#each FreshWaterMarineBiomeEnum.options as value}
			<label class="flex items-center gap-3">
				<input
					type="checkbox"
					{value}
					disabled={!$datasetOverview.realm.transitional.includes('Freshwater-Marine')}
					bind:group={$datasetOverview.biome.transitional.freshWaterMarine}
					name="transitionalRealmBiomes"
				/>
				<span class="text-sm shrink-0">
					{value}&nbsp;
				</span>
			</label>
		{/each}
		<div class="bg-divider h-px w-1/2" />
		{#each TerrestrialFreshWaterBiomeEnum.options as value}
			<label class="flex items-center gap-3">
				<input
					type="checkbox"
					{value}
					disabled={!$datasetOverview.realm.transitional.includes('Terrestrial-Freshwater')}
					bind:group={$datasetOverview.biome.transitional.terrestrialFreshWater}
					name="transitionalRealmBiomes"
				/>
				<span class="text-sm shrink-0">
					{value}&nbsp;
				</span>
			</label>
		{/each}
		<div class="bg-divider h-px w-1/2" />
		{#each MarineTerrestrialBiomeEnum.options as value}
			<label class="flex items-center gap-3">
				<input
					type="checkbox"
					{value}
					disabled={!$datasetOverview.realm.transitional.includes('Marine-Terrestrial')}
					bind:group={$datasetOverview.biome.transitional.marineTerrestrial}
					name="transitionalRealmBiomes"
				/>
				<span class="text-sm shrink-0">
					{value}&nbsp;
				</span>
			</label>
		{/each}
		<div class="bg-divider h-px w-1/2" />
		{#each MarineFreshWaterTerrestrialBiomeEnum.options as value}
			<label class="flex items-center gap-3">
				<input
					type="checkbox"
					{value}
					disabled={!$datasetOverview.realm.transitional.includes('Marine-Freshwater-Terrestrial')}
					bind:group={$datasetOverview.biome.transitional.marineFreshWaterTerrestrial}
					name="transitionalRealmBiomes"
				/>
				<span class="text-sm shrink-0">
					{value}&nbsp;
				</span>
			</label>
		{/each}
		<div class="bg-divider h-px w-1/2" />
		{#each SubterraneanMarineBiomeEnum.options as value}
			<label class="flex items-center gap-3">
				<input
					type="checkbox"
					{value}
					disabled={!$datasetOverview.realm.transitional.includes('Subterranean-Marine')}
					bind:group={$datasetOverview.biome.transitional.subterraneanMarine}
					name="transitionalRealmBiomes"
				/>
				<span class="text-sm shrink-0">
					{value}&nbsp;
				</span>
			</label>
		{/each}
		<div class="bg-divider h-px w-1/2" />
		{#each SubterraneanFreshWaterBiomeEnum.options as value}
			<label class="flex items-center gap-3">
				<input
					type="checkbox"
					{value}
					disabled={!$datasetOverview.realm.transitional.includes('Subterranean-Freshwater')}
					bind:group={$datasetOverview.biome.transitional.subterraneanFreshWater}
					name="transitionalRealmBiomes"
				/>
				<span class="text-sm shrink-0">
					{value}&nbsp;
				</span>
			</label>
		{/each}
	</div>
</div>
