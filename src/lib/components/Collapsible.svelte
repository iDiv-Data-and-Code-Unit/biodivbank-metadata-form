<script lang="ts">
	import { Collapsible } from 'bits-ui';
	import { slide } from 'svelte/transition';

	import ChevronDown from '$lib/icons/ChevronDown.svelte';

	export let title = 'Title';
	export let open = false;
</script>

<Collapsible.Root class="w-full rounded-xl space-y-3" bind:open>
	<div class="flex items-center justify-between space-x-10 w-full">
		<div class="grid gap-1">
			<button
				class="text-[15px] font-medium text-start cursor-pointer"
				on:click|preventDefault={() => (open = !open)}
			>
				{title}
			</button>
			<slot name="description" />
		</div>

		<button
			class="transition-all cursor-pointer"
			on:click|preventDefault={() => (open = !open)}
			class:rotate-180={open}
		>
			<ChevronDown />
		</button>
		<span class="sr-only">Toggle</span>
	</div>
	<div class="bg-divider h-px" />
	<Collapsible.Content class="space-y-2 text-[15px] tracking-[0.01em]" transition={slide}>
		<slot />
	</Collapsible.Content>
</Collapsible.Root>
