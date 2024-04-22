<script lang="ts">
	import { samplingDesignAndLocationSchema } from '$lib/schemas/samplingDesignAndLocation';
	import { samplingDesign } from '$lib/stores/samplingDesign';
	import TextInput from '../TextInput.svelte';

	export let group: string[];
	export let inputs: { label: string; addition?: string; value: string }[];
	export let name: string;

	let otherValue: string = '';
	let checkboxRef: HTMLInputElement | null = null;

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
			targeted: 'E.g. frui-bearing',
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

{#each inputs as input}
	<label class="flex items-center gap-3">
		{#if input.label !== 'Other'}
			<input type="checkbox" value={input.value} bind:group {name} />
		{:else}
			<input type="checkbox" value={otherValue} bind:this={checkboxRef} bind:group {name} />
		{/if}
		<span class="text-sm shrink-0">
			{input.label}&nbsp;
			{#if input.addition}
				<span class="text-description text-xs">({input.addition})</span>
			{/if}
		</span>
		{#if input.label === 'Other'}
			<input
				type="text"
				placeholder="Tell us more..."
				bind:value={otherValue}
				class="bg-input rounded-md text-sm px-3 py-2 border-none w-full placeholder:text-placeholder"
			/>
		{/if}
	</label>
	{#if $samplingDesign.otherTargetedSelectedCategories.includes(input.value)}
		{#if input.value === 'other'}
			<TextInput
				bind:value={$samplingDesign.otherTargetedCategories.other.name}
				label="Category"
				placeholder="Please specify"
				class="col-span-2"
			/>
		{/if}
		<TextInput
			bind:value={$samplingDesign.otherTargetedCategories[input.value].targeted}
			label="Targeted"
			placeholder={placeholders[input.value].targeted}
			class="col-span-2"
		/>
		<TextInput
			bind:value={$samplingDesign.otherTargetedCategories[input.value].excluded}
			label="Excluded"
			placeholder={placeholders[input.value].excluded}
			class="col-span-2"
		/>
	{/if}
{/each}
