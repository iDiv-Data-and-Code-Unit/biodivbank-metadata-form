<script lang="ts">
	import CheckboxGroup from '../CheckboxGroup.svelte';
	import Question from '../formControls/Question.svelte';
	import { datasetOverview } from '$lib/stores/datasetOverview';
	import { RealmCoreEnum, RealmTransitionalEnum } from '$lib/schemas/datasetOverview';

	let transRealms = [
		{
			value: RealmTransitionalEnum.enum['Freshwater-Marine'],
			desc: 'E.g. estuaries, coastal inlets, intermittently open lakes'
		},
		{
			value: RealmTransitionalEnum.enum['Marine-Freshwater-Terrestrial'],
			desc: 'E.g. coastal deltas, saltmarshes, intertidal forests'
		},
		{
			value: RealmTransitionalEnum.enum['Terrestrial-Freshwater'],
			desc: 'E.g. palustrine wetlands'
		},
		{
			value: RealmTransitionalEnum.enum['Subterranean-Freshwater'],
			desc: 'E.g. underground streams, groundwater, flooded mines'
		},
		{
			value: RealmTransitionalEnum.enum['Marine-Terrestrial'],
			desc: 'E.g. shorelines'
		},
		{
			value: RealmTransitionalEnum.enum['Subterranean-Marine'],
			desc: 'E.g. sea caves, anchialine pools & caves'
		}
	];
</script>

<Question title="Core Realms">
	<div class="grid grid-cols-2 gap-x-8 gap-y-10 w-full">
		{#each RealmCoreEnum.options as value}
			<label class="flex items-center gap-3">
				<input type="checkbox" {value} bind:group={$datasetOverview.realm.core} name="coreRealm" />
				<img class="h-12 w-12" src={`/${value.toLocaleLowerCase()}.svg`} alt="" />
				<span class="text-sm shrink-0">
					{value}&nbsp;
				</span>
			</label>
		{/each}
	</div>
</Question>

<Question title="Transitional Realms">
	<div class="grid grid-cols-2 gap-x-8 gap-y-10 w-full">
		{#each transRealms as { value, desc }}
			<label class="flex items-center gap-3">
				<input
					type="checkbox"
					{value}
					bind:group={$datasetOverview.realm.transitional}
					name="coreRealm"
				/>
				<div class="flex items-center">
					{#each value.toLowerCase().split('-') as realm}
						<img class="w-8 h-8 -ml-3 first:ml-0" src={`/${realm}.svg`} alt={realm} />
					{/each}
				</div>
				<div class="flex flex-col">
					<span class="text-sm">
						{value}&nbsp;
					</span>
					<span class="text-xs text-description">
						{desc}
					</span>
				</div>
			</label>
		{/each}
	</div>
</Question>
