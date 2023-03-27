<script lang="ts">
	import { datasetOverview } from '$lib/stores/datasetOverview';

	let freshwaterBiomes = [
		{
			label: 'Rivers and streams',
			value: 'riversAndStreams'
		},
		{
			label: 'Lakes',
			value: 'lakes'
		},
		{
			label: 'Artificial wetlands',
			value: 'artificialWetlands'
		}
	];

	let marineBiomes = [
		{
			label: 'Marine shelf',
			value: 'marineShelf'
		},
		{
			label: 'Pelagic ocean waters',
			value: 'pelagicOceanWaters'
		},
		{
			label: 'Deep sea floors',
			value: 'deepSeaFloors'
		},
		{
			label: 'Anthropogenic marine',
			value: 'antropogenicMarine'
		}
	];

	let terrestrialBiomes = [
		{
			label: 'Tropical-subtropical forests',
			value: 'tropicalSubtropicalForests'
		},
		{
			label: 'Temperate-boreal forests and woodlands',
			value: 'temperateBorealForestsandWoodlands'
		},
		{
			label: 'Shrublands and shrubby woodlands',
			value: 'shrublandsAndShrubbyWoodlands'
		},
		{
			label: 'Savannas and grasslands',
			value: 'savannasAndGrasslands'
		},
		{
			label: 'Desserts and semi-desserts',
			value: 'dessertsAndSemiDesserts'
		},
		{
			label: 'Polar/alpine (cryogenic)',
			value: 'polarAlpine'
		},
		{
			label: 'Intensive land-use',
			value: 'intensiveLandUse'
		}
	];

	let subterraneanBiomes = [
		{
			label: 'Subterranean lithic',
			value: 'subterraneanLithic'
		},
		{
			label: 'Anthropogenic subterranean voids',
			value: 'antropogenicSubterraneanVoids'
		}
	];
</script>

<div>
	<h4 class="font-medium text-lg mb-8">Core realm biomes</h4>
	<div class="flex flex-col gap-8 text-sm mb-8">
		{#each freshwaterBiomes as { label, value }}
			<label class="flex items-center gap-3">
				<input
					type="checkbox"
					{value}
					disabled={!$datasetOverview.coreRealms.includes('freshwater')}
					bind:group={$datasetOverview.coreRealmBiomes}
					name="coreRealmBiome"
				/>
				<span class="text-sm shrink-0">
					{label}&nbsp;
				</span>
			</label>
		{/each}
		<div class="bg-divider h-px w-1/2" />
		{#each marineBiomes as { label, value }}
			<label class="flex items-center gap-3">
				<input
					type="checkbox"
					{value}
					disabled={!$datasetOverview.coreRealms.includes('marine')}
					bind:group={$datasetOverview.coreRealmBiomes}
					name="coreRealmBiome"
				/>
				<span class="text-sm shrink-0">
					{label}&nbsp;
				</span>
			</label>
		{/each}
		<div class="bg-divider h-px w-1/2" />
		{#each terrestrialBiomes as { label, value }}
			<label class="flex items-center gap-3">
				<input
					type="checkbox"
					{value}
					disabled={!$datasetOverview.coreRealms.includes('terrestrial')}
					bind:group={$datasetOverview.coreRealmBiomes}
					name="coreRealmBiome"
				/>
				<span class="text-sm shrink-0">
					{label}&nbsp;
				</span>
			</label>
		{/each}
		<div class="bg-divider h-px w-1/2" />
		{#each subterraneanBiomes as { label, value }}
			<label class="flex items-center gap-3">
				<input
					type="checkbox"
					{value}
					disabled={!$datasetOverview.coreRealms.includes('subterranean')}
					bind:group={$datasetOverview.coreRealmBiomes}
					name="coreRealmBiome"
				/>
				<span class="text-sm shrink-0">
					{label}&nbsp;
				</span>
			</label>
		{/each}
	</div>
</div>
