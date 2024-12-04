<script lang="ts">
	import { datasetOverview } from '$lib/stores/datasetOverview';
	import { KingdomEnum } from '$lib/schemas/datasetOverview';
</script>

<div class="grid grid-cols-2 gap-8 text-sm">
	<div class="flex flex-col gap-8">
		{#each KingdomEnum.options.slice(0, 3) as value}
			<label class="flex items-center gap-3">
				<input
					type="checkbox"
					{value}
					bind:group={$datasetOverview.taxonomicScope.kingdom}
					name="kingdoms"
				/>
				<span class="text-sm shrink-0">
					{value}&nbsp;
				</span>
			</label>
		{/each}
	</div>
	<div class="flex flex-col gap-8">
		{#each KingdomEnum.options.slice(3) as value}
			<label class="flex items-center gap-3">
				<input
					type="checkbox"
					{value}
					bind:group={$datasetOverview.taxonomicScope.kingdom}
					name="kingdoms"
					disabled
				/>
				<span class="text-sm shrink-0">
					{value}&nbsp;
				</span>
			</label>
		{/each}
	</div>
</div>
