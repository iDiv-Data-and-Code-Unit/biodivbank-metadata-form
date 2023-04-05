<script lang="ts">
	import Question from '../formControls/Question.svelte';
	import { samplingDesign } from '$lib/stores/samplingDesign';

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
</Question>
