<script lang="ts">
	import { datasetOverview } from '$lib/stores/datasetOverview';

	let animalia = [
		{
			label: 'Macroinvertebrate',
			value: 'macroinvertebrate'
		},
		{
			label: 'Microinvertebrate',
			value: 'vicroinvertebrate'
		},
		{
			label: 'Vertebrate',
			value: 'vertebrate'
		}
	];

	let fungi = [
		{
			label: 'Blastoclads',
			value: 'blastoclads'
		},
		{
			label: 'Chytrids',
			value: 'chytrids'
		},
		{
			label: 'Club fungi',
			value: 'clubFungi'
		},
		{
			label: 'AM fungi (arbuscular mycorrhiza)',
			value: 'amFungi'
		},
		{
			label: 'Microsporans',
			value: 'microsporans'
		},
		{
			label: 'Neocallimastigomycetes',
			value: 'neocallimastigomycetes'
		},
		{
			label: 'Sac fungi',
			value: 'sacFungi'
		},
		{
			label: 'Zygomycetes',
			value: 'zygomycetes'
		}
	];

	let landPlants = [
		{
			label: 'Angiosperms',
			value: 'angiosperms'
		},
		{
			label: 'Clubmosses & spikemosses',
			value: 'clubmossesAndSpikemosses'
		},
		{
			label: 'Conifers',
			value: 'conifers'
		},
		{
			label: 'Cycads',
			value: 'cycads'
		},
		{
			label: 'Ferns',
			value: 'ferns'
		},
		{
			label: 'Gingko',
			value: 'gingko'
		},
		{
			label: 'Gnetophyta',
			value: 'gnetophyta'
		},
		{
			label: 'Hornworts',
			value: 'hornworts'
		},
		{
			label: 'Liverworts',
			value: 'liverworts'
		},
		{
			label: 'Mosses',
			value: 'mosses'
		}
	];

	let greenAlgae = [
		{
			label: 'Charophyta',
			value: 'charophyta'
		},
		{
			label: 'Chlorophyta',
			value: 'chlorophyta'
		}
	];

	let otherAlgae = [
		{
			label: 'Glaucophyta',
			value: 'glaucophyta'
		},
		{
			label: 'Rhodophyta (red algae)',
			value: 'rhodophyta'
		}
	];

	console.log($datasetOverview.taxonomicScope.kingdom,	$datasetOverview.taxonomicScope.subdivision);
	

</script>
{#if $datasetOverview.taxonomicScope.kingdom && $datasetOverview.taxonomicScope.subdivision}
{#if $datasetOverview.taxonomicScope.kingdom.includes('animalia') || $datasetOverview.taxonomicScope.kingdom.includes('fungi')}
	<div class="flex flex-col gap-8 text-sm">
		{#if $datasetOverview.taxonomicScope.kingdom.includes('animalia')}
			<h5 class="text-description">Animalia</h5>
			{#each animalia as { label, value }}
				<label class="flex items-center gap-3">
					<input
						type="checkbox"
						{value}
						bind:group={$datasetOverview.taxonomicScope.subdivision.animalia}
						name="subdivision"
					/>
					<span class="text-sm shrink-0">
						{label}&nbsp;
					</span>
				</label>
			{/each}
		{/if}
		{#if $datasetOverview.taxonomicScope.kingdom.includes('animalia') && $datasetOverview.taxonomicScope.kingdom.includes('fungi')}
			<div class="bg-divider h-px w-1/2" />
		{/if}
		{#if $datasetOverview.taxonomicScope.kingdom.includes('fungi')}
			<h5 class="text-description">Fungi</h5>
			<div class="grid grid-cols-2 gap-8">
				{#each fungi as { label, value }}
					<label class="flex items-center gap-3">
						<input
							type="checkbox"
							{value}
							bind:group={$datasetOverview.taxonomicScope.subdivision.fungi}
							name="subdivision"
						/>
						<span class="text-sm shrink-0">
							{label}&nbsp;
						</span>
					</label>
				{/each}
			</div>
		{/if}
	</div>
{/if}
{#if ($datasetOverview.taxonomicScope.kingdom.includes('animalia') || $datasetOverview.taxonomicScope.kingdom.includes('fungi')) && $datasetOverview.taxonomicScope.kingdom.includes('plantae')}
	<div class="bg-divider h-px w-1/2" />
{/if}
{#if $datasetOverview.taxonomicScope.kingdom.includes('plantae')}
	<div class="flex flex-col gap-8 text-sm">
		<h5 class="text-description">Land Plants</h5>
		<div class="grid grid-cols-2 gap-8">
			{#each landPlants as { label, value }}
				<label class="flex items-center gap-3">
					<input
						type="checkbox"
						{value}
						bind:group={$datasetOverview.taxonomicScope.subdivision.plantae}
						name="subdivision"
					/>
					<span class="text-sm shrink-0">
						{label}&nbsp;
					</span>
				</label>
			{/each}
		</div>
		<!-- <div class="bg-divider h-px w-1/2" /> -->

		<div class="grid grid-cols-2 gap-8 col-span-2">
			<div class="grid gap-8"><h5 class="text-description">Green algae</h5> 		not implemented
		<!--{#each greenAlgae as { label, value }}
			<label class="flex items-center gap-3">
				<input
					type="checkbox"
					{value}
					bind:group={$datasetOverview.taxonomicScope.subdivision["greenAlgae"]}
					name="subdivision"
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
					name="subdivision"
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
