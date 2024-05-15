<script>
	import { datasetOverview } from '$lib/stores/datasetOverview';
	import Kingdoms from '../datasetOverview/Kingdoms.svelte';
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
					value={$datasetOverview.originalOrCompiledDataset}
				/>
				<Point
					label="Is the data current, or from a legacy source?"
					value={$datasetOverview.currentOrLegacyDataset}
				/>
				<Point
					label="What is the source of the data?"
					value={$datasetOverview.dataSource.join(', ')}
				/>
			</div>
		</section>
		<section>
			<h3 class="text-xl font-medium mb-4">Geographic scope</h3>
			<div class="divide-y divide-placeholder divide-opacity-40 space-y-2">
				<Point
					label="What is the geographic extent of the dataset?"
					value={$datasetOverview.spatialScope}
				/>
				<Point label="Countries" value={$datasetOverview.countries.join(', ')} />
				<Point label="Marine Regions" value={$datasetOverview.marineRegions.join(', ')} />
				<Point label="Field station" value={$datasetOverview.fieldStation} />
				<Point label="Field station ROR" value={$datasetOverview.fieldStationROR} />
			</div>
		</section>
		<section>
			<h3 class="text-xl font-medium mb-4">Realm</h3>
			<div class="divide-y divide-placeholder divide-opacity-40 space-y-2">
				<Point label="Core realms" value={$datasetOverview.coreRealms.join(', ')} />
				<Point label="Transitional realms" value={$datasetOverview.transitionalRealms.join(', ')} />
				{#if $datasetOverview.coreRealms.length}
					<Point label="Core realm biomes" value={$datasetOverview.coreRealmBiomes.join(', ')} />
				{/if}
				{#if $datasetOverview.transitionalRealms.length}
					<Point
						label="Transitional realm biomes"
						value={$datasetOverview.transitionalRealmBiomes.join(', ')}
					/>
				{/if}
			</div>
		</section>
		<section>
			<h3 class="text-xl font-medium mb-4">Taxonomic scope</h3>
			<div class="divide-y divide-placeholder divide-opacity-40 space-y-2">
				<Point label="Kingdoms" value={$datasetOverview.kingdoms.join(', ')} />
				{#if $datasetOverview.kingdoms.length}
					<Point label="Subdivision" value={$datasetOverview.subDivisions.join(', ')} />
				{/if}
			</div>
		</section>
	</div>
</div>
