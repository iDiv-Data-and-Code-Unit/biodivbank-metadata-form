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
					value={$datasetOverview.dataOrigin.dataSource.join(', ')}
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
				<Point label="Field station" value={""+$datasetOverview.geographicScope.fieldStation} />
				<Point label="Field station ROR" value={""+$datasetOverview.geographicScope.fieldStation?.rorId} />
			</div>
		</section>
		<section>
			<h3 class="text-xl font-medium mb-4">Realm</h3>
			<div class="divide-y divide-placeholder divide-opacity-40 space-y-2">
				<Point label="Core realms" value={$datasetOverview.realm.core.join(', ')} />
				<Point label="Transitional realms" value={$datasetOverview.realm.transitional.join(', ')} />
				{#if $datasetOverview.realm.core.length}
				<b>not implemented</b>

					<!-- <Point label="Core realm biomes" value={$datasetOverview.biome.core.join(', ')} /> -->
					<!-- <Point label="Core realm biomes" value={$datasetOverview.biome.core. .join(', ')} /> -->
				{/if}
				{#if $datasetOverview.realm.transitional.length}
					<Point
						label="Transitional realm biomes"
						value={$datasetOverview.biome.transitional.join(', ')}
					/>
				{/if}
			</div>
		</section>
		<section>
			<h3 class="text-xl font-medium mb-4">Taxonomic scope</h3>
			<div class="divide-y divide-placeholder divide-opacity-40 space-y-2">
				<Point label="Kingdoms" value={$datasetOverview.taxonomicScope.kingdom.join(', ')} />
				{#if $datasetOverview.taxonomicScope.kingdom.length}
				<b>not implemented</b>
					<!-- <Point label="Subdivision" value={$datasetOverview.taxonomicScope.subdivision.join(', ')} /> -->
				{/if}
			</div>
		</section>
	</div>
</div>
