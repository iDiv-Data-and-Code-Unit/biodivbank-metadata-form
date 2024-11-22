<script lang="ts">
	import Question from '../formControls/Question.svelte';
	import { samplingDesign } from '$lib/stores/samplingDesign';
	import TextInput from '../TextInput.svelte';
	import clsx from 'clsx';

	const checkHandler = (e: Event, type: any) => {
		const target = e.target as HTMLInputElement;
		const checked = target.checked;

		if (checked) {
			$samplingDesign.samplingLocation.riverCrossSection[0].type = [
				...$samplingDesign.samplingLocation.riverCrossSection[0].type,
				type
			];
		} else {
			$samplingDesign.samplingLocation.riverCrossSection[0].type =
				$samplingDesign.samplingLocation.riverCrossSection[0].type.filter((t) => t !== type);
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
				$samplingDesign.samplingLocation.riverCrossSection[0].bank ? 'w-32' : 'w-10'
			)}
		>
			Bank
			<select
				class="text-sm py-1 px-2 bg-white w-full rounded-md border border-description"
				bind:value={$samplingDesign.samplingLocation.riverCrossSection[0].bank}
			>
				<option value="" disabled />
				<option value="onBank">On bank</option>
				<option value="inSubstrate">In substrate</option>
			</select>
		</label>
		<label
			class={clsx(
				'absolute top-1 text-center',
				$samplingDesign.samplingLocation.riverCrossSection[0].surface
					? 'w-36 left-[15rem]'
					: 'w-10 left-[19rem]'
			)}
		>
			Surface
			<select
				class="text-sm py-1 px-2 bg-white w-full rounded-md border border-description"
				bind:value={$samplingDesign.samplingLocation.riverCrossSection[0].surface}
			>
				<option value="" disabled />
				<option value="onSurface">On surface</option>
				<option value="belowSurface">Below surface</option>
			</select>
		</label>
		<label class="flex items-center gap-3 absolute -top-10 right-10">
			<input
				type="checkbox"
				checked={$samplingDesign.samplingLocation.riverCrossSection[0].type.includes(
					'Riparian Zone'
				)}
				on:change={(e) => checkHandler(e, 'Riparian Zone')}
				value="Riparian Zone"
				bind:group={$samplingDesign.samplingLocation.riverCrossSection[0].type}
			/>
			<span class="text-sm shrink-0">Riparian zone&nbsp; </span>
		</label>
		<label class="flex flex-col items-center gap-3 absolute top-24 left-[19rem]">
			<span class="text-sm shrink-0"> Water&nbsp; </span>
			<input
				type="checkbox"
				checked={$samplingDesign.samplingLocation.riverCrossSection[0].type.includes('Water')}
				on:change={(e) => checkHandler(e, 'Water')}
				value="Water"
				bind:group={$samplingDesign.samplingLocation.riverCrossSection[0].type}
			/>
		</label>
		<label
			class={clsx(
				'absolute bottom-20 text-center',
				$samplingDesign.samplingLocation.riverCrossSection[0].bed
					? 'w-44 left-[15rem]'
					: 'w-10 left-[19rem]'
			)}
		>
			Bed
			<select
				bind:value={$samplingDesign.samplingLocation.riverCrossSection[0].bed}
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
					checked={$samplingDesign.samplingLocation.riverCrossSection[0].type.includes('Riffle')}
					on:change={(e) => checkHandler(e, 'Riffle')}
					value="Riffle"
					bind:group={$samplingDesign.samplingLocation.riverCrossSection[0].type}
				/>
				<span class="text-sm shrink-0">Riffle&nbsp; </span>
			</label>
			<label class="flex items-center gap-3">
				<input
					type="checkbox"
					checked={$samplingDesign.samplingLocation.riverCrossSection[0].type.includes('Rapids')}
					on:change={(e) => checkHandler(e, 'Rapids')}
					value="Rapids"
					bind:group={$samplingDesign.samplingLocation.riverCrossSection[0].type}
				/>
				<span class="text-sm shrink-0">Rapids&nbsp; </span>
			</label>
			<label class="flex items-center gap-3">
				<input
					type="checkbox"
					checked={$samplingDesign.samplingLocation.riverCrossSection[0].type.includes('Levée')}
					on:change={(e) => checkHandler(e, 'Levée')}
					value="Levée"
					bind:group={$samplingDesign.samplingLocation.riverCrossSection[0].type}
				/>
				<span class="text-sm shrink-0">Levée&nbsp; </span>
			</label>
			<label class="flex items-center gap-3">
				<input
					type="checkbox"
					checked={$samplingDesign.samplingLocation.riverCrossSection[0].type.includes('Oxbow lake')}
					on:change={(e) => checkHandler(e, 'Oxbow lake')}
					value="Oxbow lake"
					bind:group={$samplingDesign.samplingLocation.riverCrossSection[0].type}
				/>
				<span class="text-sm shrink-0">Oxbow lake&nbsp; </span>
			</label>
			<label class="flex items-center gap-3">
				<input
					type="checkbox"
					checked={$samplingDesign.samplingLocation.riverCrossSection[0].type.includes('Meander belt')}
					on:change={(e) => checkHandler(e, 'Meander belt')}
					value="Meander belt"
					bind:group={$samplingDesign.samplingLocation.riverCrossSection[0].type}
				/>
				<span class="text-sm shrink-0">Meander belt&nbsp; </span>
			</label>
			<label class="flex items-center gap-3">
				<input
					type="checkbox"
					checked={$samplingDesign.samplingLocation.riverCrossSection[0].type.includes('Flood plain')}
					on:change={(e) => checkHandler(e, 'Flood plain')}
					value="Flood plain"
					bind:group={$samplingDesign.samplingLocation.riverCrossSection[0].type}
				/>
				<span class="text-sm shrink-0">Flood plain&nbsp; </span>
			</label>
			<label class="flex items-center gap-3">
				<input
					type="checkbox"
					checked={$samplingDesign.samplingLocation.riverCrossSection[0].type.includes('Alluvial plain')}
					on:change={(e) => checkHandler(e, 'Alluvial plain')}
					value="Alluvial plain"
					bind:group={$samplingDesign.samplingLocation.riverCrossSection[0].type}
				/>
				<span class="text-sm shrink-0">Alluvial plain&nbsp; </span>
			</label>
		</div>
		<div class="col-span-2 flex flex-col gap-4">
			<label class="flex items-center gap-3">
				<input
					type="checkbox"
					checked={$samplingDesign.samplingLocation.riverCrossSection[0].type.includes('Other area?')}
					on:change={(e) => checkHandler(e, 'Other area?')}
					value="Other area?"
					bind:group={$samplingDesign.samplingLocation.riverCrossSection[0].type}
				/>
				<span class="text-sm shrink-0">Other area?&nbsp; </span>
			</label>
			<TextInput label="" placeholder="Please tell us more..." bind:value={$samplingDesign.samplingLocation.riverCrossSection[0].other} />
		</div>
	</div>
</Question>
