<script lang="ts">
	export let title: string;
	export let description: string | string[] = '';
</script>

<div class="grid grid-cols-3 gap-x-8">
	<div>
		<h2 class="text-xl font-medium text-black mb-3">{title}</h2>
		{#if typeof description === 'string'}
			<span class="text-description text-sm">{description}</span>
		{:else}
			<div class="flex flex-col gap-2">
				{#each description as desc}
					<span class="text-description text-sm">{@html desc}</span>
				{/each}
			</div>
		{/if}
	</div>
	<div class="col-start-2 col-span-2 grid grid-cols-2 gap-x-8 mb-8 last:mb-0 gap-y-8">
		<slot />
	</div>
</div>
