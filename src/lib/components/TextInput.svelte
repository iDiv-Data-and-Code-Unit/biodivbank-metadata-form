<script lang="ts">
	type InputEvent = Event & {
		currentTarget: HTMLInputElement;
	};
	import clsx from 'clsx';

	export let placeholder: string;
	export let label: string;
	export let required: boolean = false;
	export let disabled: boolean = false;
	export let value: string = '';
	export let el: HTMLInputElement | null = null;
	export let pattern: string | null = null;
	export let maxlength: number | null = null;
	export let helpText: string | null = null;
	export let errorMsg: string = '';
	export let leading: string | null = null;
	let classes: string = '';
	export { classes as class };
	let errorInputEl: HTMLElement;

	$: {
		console.log(value);
	}

	function validatePattern(e: InputEvent) {
		if (pattern) {
			if (e.currentTarget.validity.patternMismatch) {
				e.currentTarget.setCustomValidity(errorMsg);
				errorInputEl.innerText = e.currentTarget.validationMessage;
			} else {
				e.currentTarget.setCustomValidity('');
				errorInputEl.innerText = '';
			}
		}
	}
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
	<div class="flex items-center">
		{#if leading}
			<span
				class="select-none bg-divider h-full flex items-center px-3 rounded-l-md text-subtle-text"
				>{leading}</span
			>
		{/if}
		<input
			bind:this={el}
			class={clsx(
				'bg-input px-4 py-3 border-none w-full placeholder:text-placeholder/50 disabled:bg-input-disabled',
				leading ? 'rounded-r-md' : 'rounded-md'
			)}
			{placeholder}
			{required}
			{pattern}
			{disabled}
			{maxlength}
			type="text"
			bind:value
			on:blur={validatePattern}
		/>
	</div>
	{#if maxlength}
		<span class="text-xs text-subtle-text text-right">{value.length}/{maxlength}</span>
	{/if}
	{#if pattern}
		<span bind:this={errorInputEl} class="text-xs text-error" />
	{/if}
</label>
