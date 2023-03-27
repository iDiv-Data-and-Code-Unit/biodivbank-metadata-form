<script lang="ts">
	import Question from '../formControls/Question.svelte';
	import Select from '../Select.svelte';

	let classificationSystem = [
		'Strahler',
		'Horton',
		'Shreve',
		'Hack',
		'Classical / Topological',
		'Other'
	];

	let streamOrder = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
</script>

<Question
	title="Stream order"
	question="Where was sampling conducted within the stream hierarchy? (Select all levels that apply)"
	direction="grid"
>
	<div class="flex flex-col gap-5">
		<img src="/streamorder.svg" alt="Stream order" />
		<p class="text-description">This illustration uses the Strahler system</p>
	</div>
	<div class="flex flex-col justify-end gap-8">
		<Select
			label="Classification system used"
			placeholder="Select a framework..."
			value=""
			options={classificationSystem}
		/>
		<Select
			label="Stream order"
			placeholder="Select a value that applies..."
			value=""
			options={streamOrder}
		/>
	</div>
</Question>
