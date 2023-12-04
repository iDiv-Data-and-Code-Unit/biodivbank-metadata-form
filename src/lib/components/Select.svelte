<script lang="ts">
	import clsx from 'clsx';

	export let placeholder: string;
	export let label: string;
	export let required: boolean = false;
	export let value: string = '';
	export let options: string[];
	let classes: string = '';
	export { classes as class };
	export let helpText = '';
</script>

<label class={clsx('w-full flex flex-col', classes)}>
	<span class="text-sm"
		>{label}
		{#if required}
			<span class="text-red-600">*</span>
		{/if}
	</span>
	{#if helpText}
		<span class="text-xs text-subtle-text">{helpText}</span>
	{/if}
	<select
		class={clsx(
			'bg-input rounded-md px-4 py-3 border-none w-full',
			!value && 'text-placeholder/50'
		)}
		{required}
		bind:value
	>
		<option value="" disabled class="text-placeholder">{placeholder}</option>
		{#each options as option}
			<option value={option}>{option}</option>
		{/each}
	</select>
</label>
