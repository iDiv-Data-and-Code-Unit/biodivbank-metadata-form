<script lang="ts">
	export let label: string;
	export let value: string | Record<string, string[] | string> | Record<string, string>[];
	// export let multiple = false;
</script>

<div class="flex gap-72 [&:not(:first-child)]:pt-2">
	<h4 class="text-description w-52 shrink-0">{label}</h4>
	{#if typeof value === 'string'}
		<span>
			{value}
		</span>
	{:else if Array.isArray(value)}
		<ul class="space-y-1">
			{#each value as v}
				{#each Object.entries(v) as [k, s]}
					<li>
						<span>{k}</span>
						<span>-></span>
						<span>{s}</span>
					</li>
				{/each}
			{/each}
		</ul>
	{:else}
		<ul class="space-y-1">
			{#each Object.entries(value) as [k, v]}
				<li>
					<span>{k}</span>
					<span>-></span>
					{#if typeof v === 'string'}
						<span>{v}</span>
					{:else}
						<span>{v.join(', ')}</span>
					{/if}
				</li>
			{/each}
		</ul>
	{/if}
</div>
