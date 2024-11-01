<script lang="ts">
	import Question from '../formControls/Question.svelte';
	import { samplingDesign } from '$lib/stores/samplingDesign';
	import TextInput from '../TextInput.svelte';
	import clsx from 'clsx';

	const checkHandler = (e: Event, type: any) => {
		const target = e.target as HTMLInputElement;
		const checked = target.checked;

		if (checked) {
			$samplingDesign.samplingLocation.riverCrossSection.type = [
				...$samplingDesign.samplingLocation.riverCrossSection.type,
				type
			];
		} else {
			$samplingDesign.samplingLocation.riverCrossSection.type =
				$samplingDesign.samplingLocation.riverCrossSection.type.filter((t) => t !== type);
		}
	};
</script>

<Question
	title="River cross section"
	question="Indicate where sampling took place in the river or stream"
	direction="grid"
>
	<div class="relative h-80 col-span-2 mt-8">
		<img src="/crosssection.svg" alt="" class="absolute w-3/4" />
		<label
			class={clsx(
				'absolute top-1 left-7 text-center',
				$samplingDesign.samplingLocation.riverCrossSection.bank ? 'w-32' : 'w-10'
			)}
		>
			Bank
			<select
				class="text-sm py-1 px-2 bg-white w-full rounded-md border border-description"
				bind:value={$samplingDesign.samplingLocation.riverCrossSection.bank}
			>
				<option value="" disabled />
				<option value="onBank">On bank</option>
				<option value="inSubstrate">In substrate</option>
			</select>
		</label>
		<label
			class={clsx(
				'absolute top-1 text-center',
				$samplingDesign.samplingLocation.riverCrossSection.surface
					? 'w-36 left-[15rem]'
					: 'w-10 left-[19rem]'
			)}
		>
			Surface
			<select
				class="text-sm py-1 px-2 bg-white w-full rounded-md border border-description"
				bind:value={$samplingDesign.samplingLocation.riverCrossSection.surface}
			>
				<option value="" disabled />
				<option value="onSurface">On surface</option>
				<option value="belowSurface">Below surface</option>
			</select>
		</label>
		<label class="flex items-center gap-3 absolute -top-10 right-10">
			<input
				type="checkbox"
				checked={$samplingDesign.samplingLocation.riverCrossSection.type.includes('Riparian Zone')}
				on:change={(e) => checkHandler(e, 'Riparian Zone')}
			/>
			<span class="text-sm shrink-0"> Riparian zone&nbsp; </span>
		</label>
		<label class="flex flex-col items-center gap-3 absolute top-24 left-[19rem]">
			<span class="text-sm shrink-0"> Water&nbsp; </span>
			<input
				type="checkbox"
				checked={$samplingDesign.samplingLocation.riverCrossSection.type.includes('Water')}
				on:change={(e) => checkHandler(e, 'Water')}
			/>
		</label>
		<label
			class={clsx(
				'absolute bottom-20 text-center',
				$samplingDesign.samplingLocation.riverCrossSection.bed
					? 'w-44 left-[15rem]'
					: 'w-10 left-[19rem]'
			)}
		>
			Bed
			<select
				bind:value={$samplingDesign.samplingLocation.riverCrossSection.bed}
				class="text-sm py-1 px-2 bg-white w-full rounded-md border border-description"
			>
				<option value="" disabled />
				<option value="BenthicWaterLayer">Benthic water layer</option>
				<option value="onSubstrate">On substrate</option>
				<option value="inSubstrate">In substrate</option>
			</select>
		</label>
	</div>
	<div class="relative grid grid-cols-4 gap-8 col-span-2 -mt-16">
		<div class="col-span-2 grid grid-cols-2 gap-8">
			<label class="flex items-center gap-3">
				<input
					type="checkbox"
					checked={$samplingDesign.samplingLocation.riverCrossSection.type.includes('Water')}
					on:change={(e) => checkHandler(e, 'Water')}
				/>
				<span class="text-sm shrink-0">Riffle&nbsp; </span>
			</label>
			<label class="flex items-center gap-3">
				<input
					type="checkbox"
					checked={$samplingDesign.samplingLocation.riverCrossSection.type.includes('Water')}
					on:change={(e) => checkHandler(e, 'Water')}
				/>
				<span class="text-sm shrink-0">Rapids&nbsp; </span>
			</label>
			<label class="flex items-center gap-3">
				<input
					type="checkbox"
					checked={$samplingDesign.samplingLocation.riverCrossSection.type.includes('Water')}
					on:change={(e) => checkHandler(e, 'Water')}
				/>
				<span class="text-sm shrink-0">Levée&nbsp; </span>
			</label>
			<label class="flex items-center gap-3">
				<input
					type="checkbox"
					checked={$samplingDesign.samplingLocation.riverCrossSection.type.includes('Water')}
					on:change={(e) => checkHandler(e, 'Water')}
				/>
				<span class="text-sm shrink-0">Oxbow lake&nbsp; </span>
			</label>
			<label class="flex items-center gap-3">
				<input
					type="checkbox"
					checked={$samplingDesign.samplingLocation.riverCrossSection.type.includes('Water')}
					on:change={(e) => checkHandler(e, 'Water')}
				/>
				<span class="text-sm shrink-0">Meander belt&nbsp; </span>
			</label>
			<label class="flex items-center gap-3">
				<input
					type="checkbox"
					checked={$samplingDesign.samplingLocation.riverCrossSection.type.includes('Water')}
					on:change={(e) => checkHandler(e, 'Water')}
				/>
				<span class="text-sm shrink-0">Flood plain&nbsp; </span>
			</label>
			<label class="flex items-center gap-3">
				<input
					type="checkbox"
					checked={$samplingDesign.samplingLocation.riverCrossSection.type.includes('Water')}
					on:change={(e) => checkHandler(e, 'Water')}
				/>
				<span class="text-sm shrink-0">Alluvial plain&nbsp; </span>
			</label>
		</div>
		<div class="col-span-2 flex flex-col gap-4">
			<label class="flex items-center gap-3">
				<input
					type="checkbox"
					checked={$samplingDesign.samplingLocation.riverCrossSection.type.includes('Water')}
					on:change={(e) => checkHandler(e, 'Water')}
				/>
				<span class="text-sm shrink-0">Other area?&nbsp; </span>
			</label>
			<TextInput label="" placeholder="Please tell us more..." />
		</div>
	</div>
</Question>
