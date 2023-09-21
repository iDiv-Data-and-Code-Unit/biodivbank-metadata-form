<script lang="ts">
	import clsx from 'clsx';
	import { Form, getFormField } from 'formsnap';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface $$Props extends HTMLInputAttributes {
		label: string;
		description?: string;
	}

	export let description = '';
	export let label: string;
	export let leading = '';

	const { attrStore, hasValidation, value } = getFormField();

	$: console.log($attrStore);
	$: console.log($hasValidation);
</script>

<div class="flex flex-col">
	<Form.Label class="text-sm">
		{label}
		{#if $attrStore['aria-required']}
			<span class="text-error">*</span>
		{/if}
		{#if description}
			<Form.Description class="text-xs text-subtle-text">{description}</Form.Description>
		{/if}
	</Form.Label>
	<div class="flex items-center">
		{#if leading}
			<span
				class="select-none bg-divider h-full flex items-center px-3 rounded-l-md text-subtle-text"
				>{leading}</span
			>
		{/if}
		<Form.Input
			class={clsx(
				'bg-input px-4 py-3 border-none w-full placeholder:text-placeholder disabled:bg-input-disabled',
				leading ? 'rounded-r-md' : 'rounded-md'
			)}
			{...$$restProps}
		/>
	</div>
	<Form.Validation />
</div>
