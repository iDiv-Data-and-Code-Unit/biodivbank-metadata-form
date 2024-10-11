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
			value: 'chromista',
			disabled: true
		},
		{
			label: 'Protozoa',
			value: 'protozoa',
			disabled: true
		},
		{
			label: 'Archaea',
			value: 'archaea',
			disabled: true
		},
		{
			label: 'Bacteria',
			value: 'bacteria',
			disabled: true
		}
	];
</script>

<div class="flex flex-col gap-8 text-sm">
	{#each kingdoms as { label, value, disabled }}
		<label class="flex items-center gap-3">
			<input type="checkbox" {value} bind:group={$datasetOverview.taxonomicScope.kingdom} {disabled} name="kingdoms" />
			<span class="text-sm shrink-0">
				{label}&nbsp;
			</span>
		</label>
	{/each}
</div>
