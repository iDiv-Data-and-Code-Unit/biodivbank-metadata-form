<script lang="ts">
	import clsx from 'clsx';

	export let placeholder: string;
	export let label: string;
	export let required: boolean = false;
	export let value: string = '';
	export let maxlength: number | null = null;
	export let helpText: string | null = null;
	export let rows: number = 5;
	let classes: string = '';
	export { classes as class };
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
	<textarea
		class="bg-input rounded-md px-4 py-3 border-none w-full placeholder:text-placeholder"
		{placeholder}
		{required}
		{maxlength}
		{rows}
		bind:value
	/>
	{#if maxlength}
		<span class="text-xs text-subtle-text text-right">{value.length}/{maxlength}</span>
	{/if}
</label>
