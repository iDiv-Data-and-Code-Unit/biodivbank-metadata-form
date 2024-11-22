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
	<div class="relative h-96">
		<img src="/riverzone.svg" alt="" class="absolute h-80 bottom-0" />
		<label class={clsx('flex items-center gap-3 absolute top-40 left-52')}>
			<input
				type="checkbox"
				value="upstream"
				bind:group={$samplingDesign.samplingLocation.riverZone.zone}
				name="riverZone"
			/>
			<span class="text-sm shrink-0">
				Upstream / transition zone&nbsp;
				<span class="text-description text-xs">(rhithron)</span>
			</span>
		</label>

		<label class={clsx('flex items-center gap-3 absolute bottom-28 right-40')}>
			<input
				type="checkbox"
				value="downstream"
				bind:group={$samplingDesign.samplingLocation.riverZone.zone}
				name="riverZone"
			/>
			<span class="text-sm shrink-0">
				Downstream / floodplain zone&nbsp;
				<span class="text-description text-xs">(potamon)</span>
			</span>
		</label>

		<label class={clsx('flex items-center gap-3 absolute bottom-0 right-80')}>
			<input
				type="checkbox"
				value="mouth"
				bind:group={$samplingDesign.samplingLocation.riverZone.zone}
				name="riverZone"
			/>
			<span class="text-sm shrink-0"> Mouth </span>
		</label>
	</div>
	<div class="flex flex-col gap-2">
		<label class="flex items-center gap-3">
			<input
				type="checkbox"
				value="other"
				bind:group={$samplingDesign.samplingLocation.riverZone.zone}
				name="riverZone"
			/>
			<span class="text-sm shrink-0">Other </span>
		</label>
		<input
			type="text"
			placeholder="Tell us more..."
			class="bg-input rounded-md text-sm px-3 py-2 border-none w-1/2 placeholder:text-placeholder"
			bind:value={$samplingDesign.samplingLocation.riverZone.other}
			disabled={!$samplingDesign.samplingLocation.riverZone.zone.includes('other')}
		/>
	</div>
</Question>
