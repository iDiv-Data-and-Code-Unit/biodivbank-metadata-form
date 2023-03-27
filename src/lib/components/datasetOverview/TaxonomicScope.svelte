<script lang="ts">
	import { datasetOverview } from '$lib/stores/datasetOverview';
	import Kingdoms from './Kingdoms.svelte';
	import Phylum from './Phylum.svelte';

	const maxStep: number = 3;
	let step: number = 1;
</script>

<div class="w-full grid grid-cols-2 gap-8">
	{#if step === 2}
		<button class="justify-self-start underline" on:click={() => (step = 1)}>Kingdoms</button>
	{:else if step === 3}
		<div class="flex gap-3">
			<button class="justify-self-start underline" on:click={() => (step = 1)}>Kingdoms</button>
			<span>&gt;</span>
			<button class="justify-self-start underline" on:click={() => (step = 2)}>Phylum</button>
		</div>
	{/if}
	{#if step === 1}
		<Kingdoms />
	{:else if step === 2}
		<div class="col-span-2 grid grid-cols-2 gap-8">
			<Phylum />
		</div>
	{:else if step === 3}
		<div class="col-start-1">
			<p>Class</p>
		</div>
	{/if}

	{#if step < maxStep}
		<button
			class="col-start-1 justify-self-start text-center text-sm shadow-md text-white bg-secondary p-2 px-4 col-span-1 rounded-md flex items-center gap-5"
			on:click={() => (step = Math.min(step + 1, maxStep))}>Next</button
		>
	{/if}
</div>
