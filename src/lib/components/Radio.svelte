<script lang="ts">
	export let group: string;
	export let label: string;
	export let addition: string = '';
	export let value: string;
	export let name: string;
	export let layout: 'inline' | 'stacked' = 'inline';
</script>

<label class="flex items-center gap-3">
	<input type="radio" {value} bind:group {name} />
	{#if layout === 'inline'}
		<span class="text-sm shrink-0">
			{label}&nbsp;
			{#if addition}
				<span class="text-description text-xs">({addition})</span>
			{/if}
		</span>
	{:else}
		<div class="flex flex-col">
			<span>{label}</span>
			{#if addition}
				<span class="text-description text-xs">{addition}</span>
			{/if}
		</div>
	{/if}
</label>
