<script lang="ts">
	import MultiSelect from 'svelte-multiselect';

	import Question from '../formControls/Question.svelte';
	import Select from '../Select.svelte';
	import { samplingDesign } from '$lib/stores/samplingDesign';

	let classificationSystem = [
		'Strahler',
		'Horton',
		'Shreve',
		'Hack',
		'Classical / Topological',
		'Other'
	];

	let selected: string[] = [];

	let streamOrder = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
</script>

<Question
	title="Stream order"
	question="Where was sampling conducted within the stream hierarchy? (Select all levels that apply)"
	direction="grid"
>
	<div class="flex flex-col gap-5 mt-16">
		<img src="/streamorder.svg" alt="Stream order" />
		<p class="text-description">This illustration uses the Strahler system</p>
	</div>
	<div class="flex flex-col justify-end gap-8">
		<Select
			label="Classification system used"
			placeholder="Select a framework..."
			options={classificationSystem}
			bind:value={$samplingDesign.samplingLocation.streamOrder.classificationSystem}
		/>
		<MultiSelect
			id="stream-order"
			outerDivClass="!w-full !bg-input !rounded-md !px-4 !py-3 !border-none !text-base !text-placeholder"
			options={streamOrder}
			placeholder="Select all values that apply..."
			bind:selected={$samplingDesign.samplingLocation.streamOrder.values}
		/>
	</div>
</Question>
