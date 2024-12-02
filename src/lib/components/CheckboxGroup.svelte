<script lang="ts">
	export let group: string[];
	export let inputs: ({
		label: string;
		addition?: string;
		value: string;
		otherPlaceholder?: string;
	} | null)[];
	export let name: string;
	export let other: string | undefined = '';

	let otherChecked: boolean = false;
</script>

{#each inputs as input}
	{#if input}
		<label class="flex items-center gap-3">
			{#if input.label !== 'Other'}
				<input type="checkbox" value={input.value} bind:group {name} />
			{:else}
				<input type="checkbox" value={input.value} bind:checked={otherChecked} bind:group {name} />
			{/if}
			<span class="text-sm shrink-0">
				{input.label}&nbsp;
				{#if input.addition}
					<span class="text-description text-xs">({input.addition})</span>
				{/if}
			</span>
			{#if input.label === 'Other'}
				<input
					type="text"
					placeholder={input.otherPlaceholder || 'Tell us more...'}
					bind:value={other}
					required={otherChecked}
					disabled={!otherChecked}
					class="bg-input rounded-md text-sm px-3 py-2 border-none w-full placeholder:text-placeholder"
				/>
			{/if}
		</label>
	{:else}
		<div class="h-px bg-min-contrast-gray col-span-2 opacity-30 w-1/3" />
	{/if}
{/each}
