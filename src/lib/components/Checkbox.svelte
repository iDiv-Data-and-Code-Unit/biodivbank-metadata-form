<script lang="ts">
	export let label: string;
	export let addition: string = '';
	export let value: string;
	export let custom: boolean = false;
	export let group: string[];
	export let name: string;
</script>

<label class="flex items-center gap-3">
	<input type="checkbox" {value} bind:group {name} />
	<span class="text-sm shrink-0">
		{label}&nbsp;
		{#if addition}
			<span class="text-description text-xs">({addition})</span>
		{/if}
	</span>
	{#if custom}
		<input
			type="text"
			placeholder="Tell us more..."
			class="bg-input rounded-md text-sm px-3 py-2 border-none w-full placeholder:text-placeholder"
		/>
	{/if}
</label>
