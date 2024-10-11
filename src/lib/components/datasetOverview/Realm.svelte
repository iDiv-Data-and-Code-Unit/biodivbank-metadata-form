<script lang="ts">
	import { datasetOverview } from '$lib/stores/datasetOverview';
	import CheckboxGroup from '../CheckboxGroup.svelte';
	import Question from '../formControls/Question.svelte';

	let realms = [
		{ label: 'Freshwater', value: 'freshwater' },
		{ label: 'Marine', value: 'marine' },
		{ label: 'Terrestrial', value: 'terrestrial' },
		{ label: 'Subterranean', value: 'subterranean' }
	];

	let transRealms = [
		{
			label: 'Freshwater-Marine',
			value: 'freshwaterMarine',
			desc: 'E.g. estuaries, coastal inlets, intermittently open lakes'
		},
		{
			label: 'Marine-Freshwater-Terrestrial',
			value: 'marineFreshwaterTerrestrial',
			desc: 'E.g. coastal deltas, saltmarshes, intertidal forests'
		},
		{
			label: 'Terrestrial-Freshwater',
			value: 'terrestrialFreshwater',
			desc: 'E.g. palustrine wetlands'
		},
		{
			label: 'Subterranean-Freshwater',
			value: 'subterraneanFreshwater',
			desc: 'E.g. underground streams, groundwater, flooded mines'
		},
		{ label: 'Marine-Terrestrial', value: 'marineTerrestrial', desc: 'E.g. shorelines' },
		{
			label: 'Subterranean-Marine',
			value: 'subterraneanMarine',
			desc: 'E.g. sea caves, anchialine pools & caves'
		}
	];
</script>

<Question title="Core Realms">
	<div class="grid grid-cols-2 gap-x-8 gap-y-10 w-full">
		{#each realms as { label, value }}
			<label class="flex items-center gap-3">
				<input type="checkbox" {value} bind:group={$datasetOverview.realm.core} name="coreRealm" />
				<img class="h-12 w-12" src={`/${value}.svg`} alt="" />
				<span class="text-sm shrink-0">
					{label}&nbsp;
				</span>
			</label>
		{/each}
	</div>
</Question>

<Question title="Transitional Realms">
	<div class="grid grid-cols-2 gap-x-8 gap-y-10 w-full">
		{#each transRealms as { label, value, desc }}
			<label class="flex items-center gap-3">
				<input
					type="checkbox"
					{value}
					bind:group={$datasetOverview.realm.transitional}
					name="coreRealm"
				/>
				<div class="flex items-center">
					{#each label.toLowerCase().split('-') as realm}
						<img class="w-8 h-8 -ml-3 first:ml-0" src={`/${realm}.svg`} alt={realm} />
					{/each}
				</div>
				<div class="flex flex-col">
					<span class="text-sm">
						{label}&nbsp;
					</span>
					<span class="text-xs text-description">
						{desc}
					</span>
				</div>
			</label>
		{/each}
	</div>
</Question>
