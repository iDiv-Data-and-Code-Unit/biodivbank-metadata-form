<script lang="ts">
	import { datasetOverview } from '$lib/stores/datasetOverview';
	import {
		KingdomEnum,
		AnimaliaSubdivisionEnum,
		FungiSubdivisionEnum,
		PlantaeSubdivisionEnum
	} from '$lib/schemas/datasetOverview';

	const animalia = KingdomEnum.enum['Animalia'];
	const fungi = KingdomEnum.enum['Fungi'];
	const plantae = KingdomEnum.enum['Plantae'];

	if ($datasetOverview.taxonomicScope.subdivision == undefined) {
		console.log('.subdivisions is undefined');
	}
</script>

{#if $datasetOverview.taxonomicScope.kingdom && $datasetOverview.taxonomicScope.subdivision}
	{#if $datasetOverview.taxonomicScope.kingdom.includes(KingdomEnum.enum[animalia])}
		<div class="flex flex-col gap-8 text-sm">
			{#if $datasetOverview.taxonomicScope.kingdom.includes(KingdomEnum.enum[animalia])}
				<h5 class="text-description">Animalia</h5>
				{#each AnimaliaSubdivisionEnum.options as value}
					<label class="flex items-center gap-3">
						<input
							type="checkbox"
							{value}
							bind:group={$datasetOverview.taxonomicScope.subdivision.animalia}
							name=".subdivision"
						/>
						<span class="text-sm shrink-0">
							{value}&nbsp;
						</span>
					</label>
				{/each}
			{/if}
			{#if $datasetOverview.taxonomicScope.kingdom.includes(animalia) && $datasetOverview.taxonomicScope.kingdom.includes(fungi)}
				<div class="bg-divider h-px w-1/2" />
			{/if}

			{#if $datasetOverview.taxonomicScope.kingdom.includes(fungi)}
				<h5 class="text-description">Fungi</h5>
				<div class="grid grid-cols-2 gap-8">
					{#each FungiSubdivisionEnum.options as value}
						<label class="flex items-center gap-3">
							<input
								type="checkbox"
								{value}
								bind:group={$datasetOverview.taxonomicScope.subdivision.fungi}
								name=".subdivision"
							/>
							<span class="text-sm shrink-0">
								{value}&nbsp;
							</span>
						</label>
					{/each}
				</div>
			{/if}
		</div>
	{/if}

	{#if ($datasetOverview.taxonomicScope.kingdom.includes(animalia) || $datasetOverview.taxonomicScope.kingdom.includes(fungi)) && $datasetOverview.taxonomicScope.kingdom.includes('Plantae')}
		<div class="bg-divider h-px w-1/2" />
	{/if}

	{#if $datasetOverview.taxonomicScope.kingdom.includes(plantae)}
		<div class="flex flex-col gap-8 text-sm">
			<h5 class="text-description">Land Plants</h5>
			<div class="grid grid-cols-2 gap-8">
				{#each PlantaeSubdivisionEnum.options as value}
					<label class="flex items-center gap-3">
						<input
							type="checkbox"
							{value}
							bind:group={$datasetOverview.taxonomicScope.subdivision.plantae}
							name=".subdivision"
						/>
						<span class="text-sm shrink-0">
							{value}&nbsp;
						</span>
					</label>
				{/each}
			</div>
			<!-- <div class="bg-divider h-px w-1/2" /> -->

			<div class="grid grid-cols-2 gap-8 col-span-2">
				<div class="grid gap-8">
					<h5 class="text-description">Green algae</h5>
					not implemented
					<!--{#each greenAlgae as { label, value }}
			<label class="flex items-center gap-3">
				<input
					type="checkbox"
					{value}
					bind:group={$datasetOverview.taxonomicScope.subdivision["greenAlgae"]}
					name=".subdivision"
				/>
				<span class="text-sm shrink-0">
					{label}&nbsp;
				</span>
			</label>
		{/each}
		</div>
	
	<div class="grid gap-8"><h5 class="text-description">Other algae</h5>

		{#each otherAlgae as { label, value }}
			<label class="flex items-center gap-3">
				<input
					type="checkbox"
					{value}
					bind:group={$datasetOverview.taxonomicScope.subdivision}
					name=".subdivision"
				/>
				<span class="text-sm shrink-0">
					{label}&nbsp;
				</span>
			</label>
		{/each} -->
				</div>
			</div>

			<!-- <div class="bg-divider h-px w-1/2" /> -->
		</div>
	{/if}
{/if}
