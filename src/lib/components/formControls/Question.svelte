<script lang="ts">
	import clsx from 'clsx';

	export let title: string = '';
	export let question: string = '';
	export let helpText: string = '';
	export let direction: 'row' | 'column' | 'grid' = 'row';
</script>

{#if title}
	<h4 class="font-medium text-lg">{title}</h4>
{/if}
{#if question}
	<h5 class="text-description col-span-2">
		{question}
	</h5>
{/if}
{#if helpText}
	<span class="text-description text-sm col-span-2">{helpText}</span>
{/if}
<div
	class={clsx(
		'flex text-sm mb-8',
		'col-span-2',
		direction === 'row'
			? 'gap-7'
			: direction === 'column'
			? 'flex-col gap-8'
			: 'grid grid-cols-2 gap-8'
	)}
>
	<slot />
</div>
