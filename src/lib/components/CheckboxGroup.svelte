<script lang="ts">
	export let group: string[];
	export let inputs: { label: string; addition?: string; value: string }[];
	export let name: string;

	let otherValue: string = '';
	let checkboxRef: HTMLInputElement | null = null;
</script>

{#each inputs as { label, addition, value }}
	<label class="flex items-center gap-3">
		{#if label !== 'Other'}
			<input type="checkbox" {value} bind:group {name} />
		{:else}
			<input type="checkbox" value={otherValue} bind:this={checkboxRef} bind:group {name} />
		{/if}
		<span class="text-sm shrink-0">
			{label}&nbsp;
			{#if addition}
				<span class="text-description text-xs">({addition})</span>
			{/if}
		</span>
		{#if label === 'Other'}
			<input
				type="text"
				placeholder="Tell us more..."
				bind:value={otherValue}
				class="bg-input rounded-md text-sm px-3 py-2 border-none w-full placeholder:text-placeholder"
			/>
		{/if}
	</label>
{/each}
