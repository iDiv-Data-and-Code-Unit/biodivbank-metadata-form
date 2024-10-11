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

	let start ={
		year: '',
		month: '',
		day: ''
	}

	let end ={
		year: '',
		month: '',
		day: ''
	}

	$:start, updateStart(start,$datasetOverview.temporalScope.start)
	$:end, updateEnd(end,$datasetOverview.temporalScope.end)

	initDate(start, $datasetOverview.temporalScope.start);
	initDate(end, $datasetOverview.temporalScope.end);

	function initDate(newdate:any, destination:string){
		let date = destination.split("/");
		newdate.year = date[0];
		newdate.month = date[1];
		newdate.day = date[2];
	}

	function updateStart(newdate:any, destination:string){
		destination = newdate.year + "/" + newdate.month + "/" + newdate.day;
		$datasetOverview.temporalScope.start = destination
	}

	function updateEnd(newdate:any, destination:string){
		destination = newdate.year + "/" + newdate.month + "/" + newdate.day;
		$datasetOverview.temporalScope.end = destination
	}


</script>

<Question question="What is the temporal extent of the dataset?" direction="column">
	<!-- <div class="col-span-2 flex flex-col gap-4 items-center"> -->
	<div class="w-full">
		<div class="flex gap-4 items-center">
			<h4 class="shrink-0">Start date</h4>
			not implemented {$datasetOverview.temporalScope.start}
			<input
				class="bg-input rounded-md px-4 py-3 border-none w-full placeholder:text-placeholder"
				placeholder="Year"
				type="text"
				bind:value={start.year}
			/>
			<select
				class={clsx(
					'bg-input rounded-md px-4 py-3 border-none w-full',
					!startMonth && 'text-placeholder'
				)}
				bind:value={start.month}
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
				bind:value={start.day}
			/>
		</div>
	</div>
	<ArrowDown classes="h-6 w-6" />
	<div class="w-full">
		<div class="flex gap-4 items-center">
			<h4 class="shrink-0">End date</h4>
			not implemented  {$datasetOverview.temporalScope.end}
			<input
				class="bg-input rounded-md px-4 py-3 border-none w-full placeholder:text-placeholder"
				placeholder="Year"
				type="text"
				bind:value={end.year}
			/>
			<select
				class={clsx(
					'bg-input rounded-md px-4 py-3 border-none w-full',
					!endMonth && 'text-placeholder'
				)}
				bind:value={end.month}
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
				bind:value={end.day}
			/>
		</div>
	</div>
	<!-- </div> -->
</Question>
