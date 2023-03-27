<script lang="ts">
	import { datasetOverview } from '$lib/stores/datasetOverview';

	let freshwaterMarineBiomes = [
		{
			label: 'Semi-confined transitional waters',
			value: 'semiConfinedTransitionalWaters'
		}
	];

	let terrestrialFreshwaterBiomes = [
		{
			label: 'Palustrine wetlands',
			value: 'palustrineWetlands'
		}
	];

	let marineTerrestrial = [
		{
			label: 'Shorelines',
			value: 'shorelines'
		},
		{
			label: 'Supralittoral coastal',
			value: 'supralittoralCoastal'
		},
		{
			label: 'Anthropogenic shorelines',
			value: 'anthropogenicShorelines'
		}
	];

	let marineFreshwaterTerrestrialBiomes = [
		{
			label: 'Brackish Tidal',
			value: 'brackishTidal'
		}
	];

	let subterraneanFreshwaterBiomes = [
		{
			label: 'Subterranean freshwaters',
			value: 'subterraneanFreshwaters'
		},
		{
			label: 'Anthropogenic subterranean freshwaters',
			value: 'anthropogenicSubterraneanFreshwaters'
		}
	];

	let subterraneanMarineBiomes = [
		{
			label: 'Subterranean tidal',
			value: 'subterraneanTidal'
		}
	];
</script>

<div>
	<h4 class="font-medium text-lg mb-8">Transitional realm biomes</h4>
	<div class="flex flex-col gap-8 text-sm mb-8">
		{#each freshwaterMarineBiomes as { label, value }}
			<label class="flex items-center gap-3">
				<input
					type="checkbox"
					{value}
					disabled={!$datasetOverview.transitionalRealms.includes('freshwaterMarine')}
					bind:group={$datasetOverview.transitionalRealmBiomes}
					name="transitionalRealmBiomes"
				/>
				<span class="text-sm shrink-0">
					{label}&nbsp;
				</span>
			</label>
		{/each}
		<div class="bg-divider h-px w-1/2" />
		{#each terrestrialFreshwaterBiomes as { label, value }}
			<label class="flex items-center gap-3">
				<input
					type="checkbox"
					{value}
					disabled={!$datasetOverview.transitionalRealms.includes('terrestrialFreshwater')}
					bind:group={$datasetOverview.transitionalRealmBiomes}
					name="transitionalRealmBiomes"
				/>
				<span class="text-sm shrink-0">
					{label}&nbsp;
				</span>
			</label>
		{/each}
		<div class="bg-divider h-px w-1/2" />
		{#each marineTerrestrial as { label, value }}
			<label class="flex items-center gap-3">
				<input
					type="checkbox"
					{value}
					disabled={!$datasetOverview.transitionalRealms.includes('marineTerrestrial')}
					bind:group={$datasetOverview.transitionalRealmBiomes}
					name="transitionalRealmBiomes"
				/>
				<span class="text-sm shrink-0">
					{label}&nbsp;
				</span>
			</label>
		{/each}
		<div class="bg-divider h-px w-1/2" />
		{#each marineFreshwaterTerrestrialBiomes as { label, value }}
			<label class="flex items-center gap-3">
				<input
					type="checkbox"
					{value}
					disabled={!$datasetOverview.transitionalRealms.includes('marineFreshwaterTerrestrial')}
					bind:group={$datasetOverview.transitionalRealmBiomes}
					name="transitionalRealmBiomes"
				/>
				<span class="text-sm shrink-0">
					{label}&nbsp;
				</span>
			</label>
		{/each}
		<div class="bg-divider h-px w-1/2" />
		{#each subterraneanFreshwaterBiomes as { label, value }}
			<label class="flex items-center gap-3">
				<input
					type="checkbox"
					{value}
					disabled={!$datasetOverview.transitionalRealms.includes('subterraneanFreshwater')}
					bind:group={$datasetOverview.transitionalRealmBiomes}
					name="transitionalRealmBiomes"
				/>
				<span class="text-sm shrink-0">
					{label}&nbsp;
				</span>
			</label>
		{/each}
		<div class="bg-divider h-px w-1/2" />
		{#each subterraneanFreshwaterBiomes as { label, value }}
			<label class="flex items-center gap-3">
				<input
					type="checkbox"
					{value}
					disabled={!$datasetOverview.transitionalRealms.includes('subterraneanFreshwater')}
					bind:group={$datasetOverview.transitionalRealmBiomes}
					name="transitionalRealmBiomes"
				/>
				<span class="text-sm shrink-0">
					{label}&nbsp;
				</span>
			</label>
		{/each}
		<div class="bg-divider h-px w-1/2" />
		{#each subterraneanMarineBiomes as { label, value }}
			<label class="flex items-center gap-3">
				<input
					type="checkbox"
					{value}
					disabled={!$datasetOverview.transitionalRealms.includes('subterraneanMarine')}
					bind:group={$datasetOverview.transitionalRealmBiomes}
					name="transitionalRealmBiomes"
				/>
				<span class="text-sm shrink-0">
					{label}&nbsp;
				</span>
			</label>
		{/each}
	</div>
</div>
