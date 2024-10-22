<script lang="ts">
	import { datasetOverview } from '$lib/stores/datasetOverview';
	import { FreshWaterBiomeEnum, MarineBiomeEnum, TerrestrialBiomeEnum, SubterraneanBiomeEnum } from '$lib/schemas/datasetOverview';
</script>

<div>
	<h4 class="font-medium text-lg mb-8">Core realm biomes</h4>
	<div class="flex flex-col gap-8 text-sm mb-8">
		{#each FreshWaterBiomeEnum.options as value }
			<label class="flex items-center gap-3">
				<input
					type="checkbox"
					{value}
					disabled={!$datasetOverview.realm.core.includes('Freshwater')}
					bind:group={$datasetOverview.biome.core.freshWater}
					name="coreRealmBiome"
				/>
				<span class="text-sm shrink-0">
					{value}&nbsp;
				</span>
			</label>
		{/each}
		<div class="bg-divider h-px w-1/2" />
		{#each MarineBiomeEnum.options as value}
			<label class="flex items-center gap-3">
				<input
					type="checkbox"
					{value}
					disabled={!$datasetOverview.realm.core.includes('Marine')}
					bind:group={$datasetOverview.biome.core.marine}
					name="coreRealmBiome"
				/>
				<span class="text-sm shrink-0">
					{value}&nbsp;
				</span>
			</label>
		{/each}
		<div class="bg-divider h-px w-1/2" />
		{#each TerrestrialBiomeEnum.options as value}
			<label class="flex items-center gap-3">
				<input
					type="checkbox"
					{value}
					disabled={!$datasetOverview.realm.core.includes('Terrestrial')}
					bind:group={$datasetOverview.biome.core.terrestrial}
					name="coreRealmBiome"
					on:change={() => console.log($datasetOverview.biome.core.terrestrial, $datasetOverview)}
				/>
				<span class="text-sm shrink-0">
					{value}&nbsp;
				</span>
			</label>
		{/each}
		<div class="bg-divider h-px w-1/2" />
		{#each SubterraneanBiomeEnum.options as value}
			<label class="flex items-center gap-3">
				<input
					type="checkbox"
					{value}
					disabled={!$datasetOverview.realm.core.includes('Subterranean')}
					bind:group={$datasetOverview.biome.core.subterranean}
					name="coreRealmBiome"
				/>
				<span class="text-sm shrink-0">
					{value}&nbsp;
				</span>
			</label>
		{/each}
	</div>
</div>
