<script lang="ts">
	import Collapsible from './Collapsible.svelte';

	export let question = 'Question';
	export let steps = 1;

	let isStep2Empty = true;
	let isStep3Empty = true;
</script>

<div class="grid gap-8 w-full">
	<div class="grid gap-2">
		<h3 class="text-base">{question}</h3>
		<div class="bg-divider h-px mt-1 mb-3" />
		<div class="pl-4"><slot /></div>
	</div>

	{#if steps > 1}
		<div class="grid gap-2">
			<h3 class="text-base" class:text-input-disabled={!isStep2Empty}>Step 2</h3>
			<div class="bg-divider h-px mt-1 mb-3" />
			<div bind:clientHeight={isStep2Empty} class="pl-4"><slot name="step-2" /></div>
		</div>
	{/if}

	{#if steps > 2}
		<div class="grid gap-2">
			<h3 class="text-base" class:text-input-disabled={!isStep3Empty}>Step 3</h3>
			<div class="bg-divider h-px mt-1 mb-3" />
			<div bind:clientHeight={isStep3Empty} class="pl-4"><slot name="step-3" /></div>
		</div>
	{/if}
</div>
