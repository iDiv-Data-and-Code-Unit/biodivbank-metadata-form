<script lang="ts">
	export let group: string[];
	export let inputs: (string | null)[];
	export let name: string;

	let otherValue: string = '';
	let checkboxRef: HTMLInputElement | null = null;
</script>

{#each inputs as input}
	{#if input}
		<label class="flex items-center gap-3">
			{#if input !== 'Other'}
				<input type="checkbox" value={input} bind:group {name} />
			{:else}
				<input type="checkbox" value={otherValue} bind:this={checkboxRef} bind:group {name} />
			{/if}
			<span class="text-sm shrink-0">
				{input}&nbsp;
				{#if input}
					<!-- <span class="text-description text-xs">({input})</span> -->
				{/if}
			</span>
			{#if input === 'Other'}
				<input
					type="text"
					placeholder={'Tell us more...'}
					bind:value={otherValue}
					class="bg-input rounded-md text-sm px-3 py-2 border-none w-full placeholder:text-placeholder"
				/>
			{/if}
		</label>
	{:else}
		<div class="h-px bg-min-contrast-gray col-span-2 opacity-30 w-1/3" />
	{/if}
{/each}
