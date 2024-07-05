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
			<h4
				class="text-[15px] font-medium text-start cursor-pointer"
				on:click|preventDefault={() => (open = !open)}
			>
				{title}
			</h4>
			<slot name="description" />
		</div>

		<div
			class="transition-all cursor-pointer"
			on:click|preventDefault={() => (open = !open)}
			class:rotate-180={open}
		>
			<ChevronDown />
		</div>
		<span class="sr-only">Toggle</span>
	</div>
	<div class="bg-divider h-px" />
	<Collapsible.Content class="space-y-2 font-mono text-[15px] tracking-[0.01em]" transition={slide}>
		<slot />
	</Collapsible.Content>
</Collapsible.Root>
