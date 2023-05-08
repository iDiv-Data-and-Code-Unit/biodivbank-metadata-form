<script lang="ts">
	import { samplingDesign } from '$lib/stores/samplingDesign';
	import clsx from 'clsx';
	import Question from '../formControls/Question.svelte';

	let riverZones = [
		{ label: 'Source zone', addition: 'crenon', value: 'sourceZone' },
		{ label: 'Upstream / transition zone', addition: 'rhithron', value: 'upstream' },
		{ label: 'Downstream / floodplain zone', addition: 'potamon', value: 'downstream' },
		{ label: 'Mouth', value: 'mouth' }
	];

	const gridMap: Record<number, string> = {
		0: 'col-start-2',
		1: 'col-start-4 row-start-3',
		2: 'col-start-6 row-start-5',
		3: 'col-start-8 row-start-6'
	};
</script>

<Question
	title="River zone"
	question="In which river zone(s) did you sample?"
	direction="column"
	helpText="Because you selected &quot;Rivers and streams&quot;"
>
	<div class="relative grid grid-cols-12 h-96">
		<img src="/riverzone.svg" alt="" class="absolute h-80 bottom-0" />
		{#each riverZones as { value, addition, label }, idx}
			<label class={clsx('flex items-center gap-3', gridMap[idx])}>
				<input type="checkbox" {value} bind:group={$samplingDesign.riverZone} name="riverZone" />
				<span class="text-sm shrink-0">
					{label}&nbsp;
					{#if addition}
						<span class="text-description text-xs">({addition})</span>
					{/if}
				</span>
			</label>
		{/each}
	</div>
	<div class="flex flex-col gap-2">
		<label class="flex items-center gap-3">
			<input
				type="checkbox"
				value="other"
				bind:group={$samplingDesign.riverZone}
				name="riverZone"
			/>
			<span class="text-sm shrink-0"> Other </span>
		</label>
		<input
			type="text"
			placeholder="Tell us more..."
			class="bg-input rounded-md text-sm px-3 py-2 border-none w-1/2 placeholder:text-placeholder"
		/>
	</div>
</Question>
