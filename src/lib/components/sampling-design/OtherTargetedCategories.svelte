<script lang="ts">
	import TextInput from '../TextInput.svelte';
	import Select from '../Select.svelte';
	import Question from '../formControls/Question.svelte';
	import Plus from '$lib/icons/Plus.svelte';
	import CheckboxGroup from '../CheckboxGroup.svelte';
	import { samplingDesign } from '../../stores/samplingDesign';

	const inputs = [
		{ label: 'Sex', value: 'sex' },
		{ label: 'Life stage / age class', value: 'lifeStage' },
		{ label: 'Reproductive condition', value: 'reproductiveCondition' },
		{ label: 'Growth form', value: 'growthForm' },
		{ label: 'Other category', value: 'other' }
	];

	const placeholders = {
		sex: {
			targeted: 'E.g. female',
			excluded: 'E.g. male'
		},
		lifeStage: {
			targeted: 'E.g. adult',
			excluded: 'E.g. larva, nestling, seedling'
		},
		reproductiveCondition: {
			targeted: 'E.g. fruit-bearing',
			excluded: 'E.g. non-reproductive'
		},
		growthForm: {
			targeted: 'E.g. tree, shrub',
			excluded: 'E.g. sub-shrub'
		},
		other: {
			targeted: '',
			excluded: ''
		}
	};
</script>

<Question
	question="Was a particular sex, age class or life stage, growth form, etc, specifically targeted for sampling? Were any groups intentionally excluded from sampling?"
	helpText="Multiple examples of a category can be entered in the textbox; separate the words or phrases using a comma."
	direction="column"
>
	<CheckboxGroup
		name="Category"
		bind:group={$samplingDesign.otherTargetedSelectedCategories}
		{inputs}
	/>
	{#each $samplingDesign.otherTargetedSelectedCategories as category}
		<h4 class="col-span-2 font-medium -mb-3">
			{inputs.find((i) => i.value === category)?.label}
		</h4>
		{#if category === 'other'}
			<TextInput
				bind:value={$samplingDesign.otherTargetedCategories.other.name}
				label="Category"
				placeholder="Please specify"
				class="col-span-2"
			/>
		{/if}
		<TextInput
			bind:value={$samplingDesign.otherTargetedCategories[category].targeted}
			label="Targeted"
			placeholder={placeholders[category].targeted}
			class="col-span-2"
		/>
		<TextInput
			bind:value={$samplingDesign.otherTargetedCategories[category].excluded}
			label="Excluded"
			placeholder={placeholders[category].excluded}
			class="col-span-2"
		/>
	{/each}
</Question>
