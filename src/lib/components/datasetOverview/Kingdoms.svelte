<script lang="ts">
	import { datasetOverview } from '$lib/stores/datasetOverview';

	let kingdoms = [
		{
			label: 'Animalia',
			value: 'animalia'
		},
		{
			label: 'Fungi',
			value: 'fungi'
		},
		{
			label: 'Plantae',
			value: 'plantae'
		},
		{
			label: 'Chromista',
			value: 'chromista'
		},
		{
			label: 'Protozoa',
			value: 'protozoa'
		},
		{
			label: 'Archaea',
			value: 'archaea'
		},
		{
			label: 'Bacteria',
			value: 'bacteria'
		}
	];
</script>

<div class="flex flex-col gap-8 text-sm">
	{#each kingdoms as { label, value }}
		<label class="flex items-center gap-3">
			<input type="checkbox" {value} bind:group={$datasetOverview.kingdoms} name="kingdoms" />
			<span class="text-sm shrink-0">
				{label}&nbsp;
			</span>
		</label>
	{/each}
</div>
