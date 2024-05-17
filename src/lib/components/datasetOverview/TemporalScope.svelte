<script lang="ts">
	import ArrowDown from '$lib/icons/ArrowDown.svelte';
	import clsx from 'clsx';
	import Question from '../formControls/Question.svelte';
	import { datasetOverview } from '$lib/stores/datasetOverview';

	let months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	let startMonth = '';
	let endMonth = '';
</script>

<Question question="What is the temporal extent of the dataset?" direction="column">
	<!-- <div class="col-span-2 flex flex-col gap-4 items-center"> -->
	<div class="w-full">
		<div class="flex gap-4 items-center">
			<h4 class="shrink-0">Start date</h4>
			<input
				class="bg-input rounded-md px-4 py-3 border-none w-full placeholder:text-placeholder"
				placeholder="Year"
				type="text"
				bind:value={$datasetOverview.temporalScopeStart.year}
			/>
			<select
				class={clsx(
					'bg-input rounded-md px-4 py-3 border-none w-full',
					!startMonth && 'text-placeholder'
				)}
				bind:value={$datasetOverview.temporalScopeStart.month}
			>
				<option value="" disabled class="text-placeholder">Month</option>
				{#each months as month}
					<option>{month}</option>
				{/each}
			</select>
			<input
				class="bg-input rounded-md px-4 py-3 border-none w-full placeholder:text-placeholder"
				placeholder="Day"
				type="text"
				bind:value={$datasetOverview.temporalScopeStart.day}
			/>
		</div>
	</div>
	<ArrowDown classes="h-6 w-6" />
	<div class="w-full">
		<div class="flex gap-4 items-center">
			<h4 class="shrink-0">End date</h4>
			<input
				class="bg-input rounded-md px-4 py-3 border-none w-full placeholder:text-placeholder"
				placeholder="Year"
				type="text"
				bind:value={$datasetOverview.temporalScopeEnd.year}
			/>
			<select
				class={clsx(
					'bg-input rounded-md px-4 py-3 border-none w-full',
					!endMonth && 'text-placeholder'
				)}
				bind:value={$datasetOverview.temporalScopeEnd.month}
			>
				<option value="" disabled class="text-placeholder">Month</option>
				{#each months as month}
					<option>{month}</option>
				{/each}
			</select>
			<input
				class="bg-input rounded-md px-4 py-3 border-none w-full placeholder:text-placeholder"
				placeholder="Day"
				type="text"
				bind:value={$datasetOverview.temporalScopeEnd.day}
			/>
		</div>
	</div>
	<!-- </div> -->
</Question>
