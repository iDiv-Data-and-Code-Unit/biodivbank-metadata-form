<script lang="ts">
	import { createCombobox } from 'svelte-headlessui';
	import Transition from 'svelte-transition';
	import Selector from '$lib/icons/Selector.svelte';
	import Check from '$lib/icons/Check.svelte';
	import Deselect from '$lib/icons/Cross.svelte';
	import type { DatasetOverview } from '$lib/types/schema';
	import { datasetOverview } from '$lib/stores/datasetOverview';
	import clsx from 'clsx';
	import { geoStore } from '$lib/stores/geo';

	export let options: string[];
	export let emptyMsg: string;
	export let label: string;
	export let resource: 'countries' | 'marineRegions';

	// $: console.log($datasetOverview.countries);
	// $: console.log($datasetOverview.marineRegions);

	const combobox = createCombobox({ label: 'People', selected: $datasetOverview[resource] });

	// TODO: doesnt respect items added by map click
	function onSelect(e: Event) {
		// console.log('event', e.detail.selected);
		$datasetOverview[resource] = (e as CustomEvent).detail.selected;
		const selectedThings = Object.entries($geoStore.layer._layers).map((x) => x[1]);
		// .filter((x) => e.detail.selected.includes(x.feature.properties['title_EN']));
		if (resource === 'countries') {
			selectedThings.forEach((x) => {
				// @ts-expect-error
				if ($datasetOverview.countries.includes(x.feature.properties['title_EN'])) {
					// @ts-expect-error
					x.setStyle({ fillColor: '#0f9d38', fillOpacity: 0.5 });
				} else {
					// @ts-expect-error
					if (x.feature.properties.regiontype === 'ADM') {
						// @ts-expect-error
						x.setStyle({ fillColor: '#B4F8C8', fillOpacity: 0.2 });
					}
				}
			});
		} else {
			selectedThings.forEach((x) => {
				// @ts-expect-error
				if ($datasetOverview.marineRegions.includes(x.feature.properties['title_EN'])) {
					// @ts-expect-error
					x.setStyle({ fillColor: '#289f9c', fillOpacity: 0.5 });
				} else {
					// @ts-expect-error
					if (x.feature.properties.regiontype === 'LME') {
						// @ts-expect-error
						x.setStyle({ fillColor: '#A0E7E5', fillOpacity: 0.2 });
					}
				}
			});
		}
	}

	$: filtered = options.filter((option) =>
		option
			.toLowerCase()
			.replace(/\s+/g, '')
			.includes($combobox.filter.toLowerCase().replace(/\s+/g, ''))
	);
</script>

<div class="relative">
	{label}
	<span class="inline-block w-full rounded-md shadow-sm">
		<button
			use:combobox.button
			on:select={onSelect}
			class="relative w-full cursor-default rounded-md border border-input bg-input py-2 pl-2 pr-10 text-left transition duration-150 ease-in-out focus-within:border-secondary focus:outline-none text-sm sm:leading-5"
		>
			<input
				use:combobox.input
				on:select={onSelect}
				placeholder="Search&hellip;"
				class="w-auto border-none py-1 leading-5 text-gray-900 focus:ring-0 text-sm bg-input"
			/>
			<span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
				<Selector class="h-5 w-5 text-gray-400" />
			</span>
		</button>
	</span>

	<Transition
		show={$combobox.expanded}
		leave="transition ease-in duration-100"
		leaveFrom="opacity-100"
		leaveTo="opacity-0"
	>
		<ul
			use:combobox.items
			class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-[9999]"
		>
			{#each filtered as value}
				{@const active = $combobox.active === value}
				{@const selected = $datasetOverview[resource].includes(value)}
				<li
					class="relative cursor-default select-none py-2 pl-4 pr-9 focus:outline-none {active
						? 'bg-secondary/20 '
						: 'text-gray-900'}"
					use:combobox.item={{ value }}
				>
					<span class="block truncate {selected ? 'font-semibold' : 'font-normal'}">{value}</span>
					{#if selected}
						<span
							class="absolute inset-y-0 right-0 flex items-center pr-3 {active
								? ''
								: 'text-secondary'}"
						>
							<Check class="h-5 w-5" />
						</span>
					{/if}
				</li>
			{:else}
				<li class="relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900">
					<span class="block truncate font-normal">Nothing found</span>
				</li>
			{/each}
		</ul>
	</Transition>
	<div class="flex flex-wrap gap-2 mt-4">
		{#each $datasetOverview[resource] as selected}
			<span
				use:combobox.deselect={selected}
				class={clsx(
					' cursor-pointer text-white px-2 py-1 rounded-md flex gap-1 items-center',
					resource === 'marineRegions' ? 'bg-secondary' : 'bg-primary'
				)}
			>
				<span>{selected}</span>
				<Deselect class="h-3 w-3" />
			</span>
		{:else}
			<span class="flex items-center gap-1 rounded px-2 py-0.5 text-min-contrast-gray">
				{emptyMsg}
			</span>
		{/each}
	</div>
</div>

<!-- on:click={() => {
	if ($datasetOverview[resource].includes(value)) {
		$datasetOverview[resource] = $datasetOverview[resource].filter((v) => v !== value);
	} else {
		$datasetOverview[resource] = [...$datasetOverview[resource], value];
	}
}} -->
