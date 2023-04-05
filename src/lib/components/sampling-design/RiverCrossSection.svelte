<script lang="ts">
	import Question from '../formControls/Question.svelte';
	import { samplingDesign } from '$lib/stores/samplingDesign';
	import TextInput from '../TextInput.svelte';

	let riparianZone = false;
	let water = false;
</script>

<Question
	title="River cross section"
	question="Indicate where sampling took place in the river or stream"
	direction="grid"
>
	<div class="relative grid grid-cols-12 grid-rows-4 col-span-2">
		<img src="/crosssection.svg" alt="" class="absolute w-3/4" />
		<label class="relative col-start-2 col-span-2">
			Bank
			<select
				class="text-sm p-1 bg-white w-full rounded-sm border border-description"
				bind:value={$samplingDesign.riverCrossSection.bank}
			>
				<option value="" disabled />
				<option value="onBank">On bank</option>
				<option value="inSubstrate">In substrate</option>
			</select>
		</label>
		<label class="relative col-start-5 col-span-2">
			Surface
			<select
				class="text-sm p-1 bg-white w-full rounded-sm border border-description"
				bind:value={$samplingDesign.riverCrossSection.surface}
			>
				<option value="" disabled />
				<option value="onSurface">On surface</option>
				<option value="belowSurface">Below surface</option>
			</select>
		</label>
		<label class="flex items-center gap-3 col-start-10">
			<input type="checkbox" bind:checked={$samplingDesign.riverCrossSection.riparianZone} />
			<span class="text-sm shrink-0"> Riparian zone&nbsp; </span>
		</label>
		<label class="flex items-center gap-3 col-start-5 row-start-3 relative">
			<input type="checkbox" bind:checked={$samplingDesign.riverCrossSection.water} />
			<span class="text-sm shrink-0"> Water&nbsp; </span>
		</label>
		<label class="relative col-start-5 col-span-3 row-start-4 self-end">
			Bed
			<select
				bind:value={$samplingDesign.riverCrossSection.bed}
				class="text-sm p-1 bg-white w-full rounded-sm border border-description"
			>
				<option value="" disabled />
				<option value="BenthicWaterLayer">Benthic water layer</option>
				<option value="onSubstrate">On substrate</option>
				<option value="inSubstrate">In substrate</option>
			</select>
		</label>
	</div>
	<div class="relative grid grid-cols-4 gap-8 col-span-2 mt-8">
		<div class="col-span-2 grid grid-cols-2 gap-8">
			<label class="flex items-center gap-3">
				<input type="checkbox" bind:checked={$samplingDesign.riverCrossSection.water} />
				<span class="text-sm shrink-0">Riffle&nbsp; </span>
			</label>
			<label class="flex items-center gap-3">
				<input type="checkbox" bind:checked={$samplingDesign.riverCrossSection.water} />
				<span class="text-sm shrink-0">Rapids&nbsp; </span>
			</label>
			<label class="flex items-center gap-3">
				<input type="checkbox" bind:checked={$samplingDesign.riverCrossSection.water} />
				<span class="text-sm shrink-0">Levée&nbsp; </span>
			</label>
			<label class="flex items-center gap-3">
				<input type="checkbox" bind:checked={$samplingDesign.riverCrossSection.water} />
				<span class="text-sm shrink-0">Oxbow lake&nbsp; </span>
			</label>
			<label class="flex items-center gap-3">
				<input type="checkbox" bind:checked={$samplingDesign.riverCrossSection.water} />
				<span class="text-sm shrink-0">Meander belt&nbsp; </span>
			</label>
			<label class="flex items-center gap-3">
				<input type="checkbox" bind:checked={$samplingDesign.riverCrossSection.water} />
				<span class="text-sm shrink-0">Flood plain&nbsp; </span>
			</label>
			<label class="flex items-center gap-3">
				<input type="checkbox" bind:checked={$samplingDesign.riverCrossSection.water} />
				<span class="text-sm shrink-0">Alluvial plain&nbsp; </span>
			</label>
		</div>
		<div class="col-span-2 flex flex-col gap-4">
			<label class="flex items-center gap-3">
				<input type="checkbox" bind:checked={$samplingDesign.riverCrossSection.water} />
				<span class="text-sm shrink-0">Other area?&nbsp; </span>
			</label>
			<TextInput label="" placeholder="Please tell us more..." />
		</div>
	</div>
</Question>
