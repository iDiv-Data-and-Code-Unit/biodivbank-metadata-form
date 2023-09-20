<script lang="ts">
	import { step } from '$lib/stores/steps';
	import Icon from '@iconify/svelte';

	export let direction: 'prev' | 'next';
</script>

<button
	on:click={direction === 'prev' ? step.prev : step.next}
	disabled={direction === 'prev' ? $step === step.min : $step === step.max}
	class="h-14 w-14 rounded-2xl shadow-md bg-secondary flex items-center justify-center text-white disabled:bg-input-disabled"
	>{#if direction === 'prev'}
		<Icon icon="heroicons:chevron-left" class="h-6 w-6" />
		<!--		<ChevronLeft />-->
	{:else}
		<Icon icon="heroicons:chevron-right" class="h-6 w-6" />
	{/if}</button
>
