<script lang="ts">
	import ChevronLeft from '$lib/icons/ChevronLeft.svelte';
	import ChevronRight from '$lib/icons/ChevronRight.svelte';
	import { step } from '$lib/stores/steps';

	export let direction: 'prev' | 'next';
</script>

<button
	on:click={direction === 'prev' ? step.prev : step.next}
	disabled={direction === 'prev' ? $step === step.min : $step === step.max}
	class="h-14 w-14 rounded-2xl shadow-md bg-secondary flex items-center justify-center text-white disabled:bg-gray-400"
	>{#if direction === 'prev'}
		<ChevronLeft />
	{:else}
		<ChevronRight />
	{/if}</button
>
