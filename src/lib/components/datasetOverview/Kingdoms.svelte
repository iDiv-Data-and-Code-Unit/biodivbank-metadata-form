<script lang="ts">
	import { datasetOverview } from '$lib/stores/datasetOverview';
	import { KingdomEnum } from '$lib/schemas/datasetOverview';

</script>

<div class="flex flex-col gap-8 text-sm">
	{#each KingdomEnum.options as value}
		<label class="flex items-center gap-3">
			<input type="checkbox" {value} bind:group={$datasetOverview.taxonomicScope.kingdom} name="kingdoms" />
			<span class="text-sm shrink-0">
				{value}&nbsp;
			</span>
		</label>
	{/each}
</div>
