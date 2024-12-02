<script>
	import { datasetOverview } from '$lib/stores/datasetOverview';
	import Point from './Point.svelte';
</script>

<div>
	<h2 class="text-2xl font-medium mb-6">Dataset overview</h2>
	<div class="space-y-12">
		<section>
			<h3 class="text-xl font-medium mb-4">Data origin</h3>
			<div class="divide-y divide-placeholder divide-opacity-40 space-y-2">
				<Point
					label="Is the dataset based on one or multiple studies?"
					value={$datasetOverview.dataOrigin.originalOrCompiledDataset}
				/>
				<Point
					label="Is the data current, or from a legacy source?"
					value={$datasetOverview.dataOrigin.currentOrLegacyDataset.join(', ')}
				/>
				<Point
					label="What is the source of the data?"
					value={$datasetOverview.dataOrigin.dataSource.sources.join(', ')}
				/>
			</div>
		</section>
		<section>
			<h3 class="text-xl font-medium mb-4">Geographic scope</h3>
			<div class="divide-y divide-placeholder divide-opacity-40 space-y-2">
				<Point
					label="What is the geographic extent of the dataset?"
					value={$datasetOverview.geographicScope.extent}
				/>
				<Point label="Countries" value={$datasetOverview.geographicScope.countries.join(', ')} />
				<Point label="Marine Regions" value={$datasetOverview.geographicScope.marineRegions.join(', ')} />
				<Point label="Field station" value={""+$datasetOverview.geographicScope.fieldStation?.name} />
				<Point label="Field station ROR" value={""+$datasetOverview.geographicScope.fieldStation?.rorId} />
			</div>
		</section>
		<section>
			<h3 class="text-xl font-medium mb-4">Realm</h3>
			<div class="divide-y divide-placeholder divide-opacity-40 space-y-2">
				{#if $datasetOverview.realm.core.length}
				<Point label="Core realms" value={$datasetOverview.realm.core.join(', ')} />
				<Point label="- Freshwater " value={$datasetOverview.biome.core.freshWater.join(', ')} />
				<Point label="- Marine" value={$datasetOverview.biome.core.marine.join(', ')} />
				<Point label="- Terrestrial" value={$datasetOverview.biome.core.terrestrial.join(', ')} />
				<Point label="- Subterranean" value={$datasetOverview.biome.core.subterranean.join(', ')} />
 			{/if}
				{#if $datasetOverview.realm.transitional.length}
					<Point label="Transitional realms" value={$datasetOverview.realm.transitional.join(', ')} />
					<Point label="- Freshwater-Marine" value={$datasetOverview.biome.transitional.freshWaterMarine.join(', ')} />
					<Point label="- Terrestrial-Freshwater" value={$datasetOverview.biome.transitional.terrestrialFreshWater.join(', ')} />
					<Point label="- Marine-Terrestrial" value={$datasetOverview.biome.transitional.marineTerrestrial.join(', ')} />
					<Point label="- Marine-Freshwater-Terrestrial" value={$datasetOverview.biome.transitional.marineFreshWaterTerrestrial.join(', ')} />
				{/if}
			</div>
		</section>
		<section>
			<h3 class="text-xl font-medium mb-4">Taxonomic scope</h3>
			<div class="divide-y divide-placeholder divide-opacity-40 space-y-2">
				<Point label="Kingdoms" value={$datasetOverview.taxonomicScope.kingdom.join(', ')} />
				{#if $datasetOverview.taxonomicScope.kingdom.length}
	
					<Point label="Animalia" value={$datasetOverview.taxonomicScope.subdivision.animalia.join(', ')} />
					<Point label="Fungi" value={$datasetOverview.taxonomicScope.subdivision.fungi.join(', ')} />
					<Point label="Plantea" value={$datasetOverview.taxonomicScope.subdivision.plantae.join(', ')} />
				{/if}
			</div>
		</section>
	</div>
</div>
