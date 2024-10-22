<script lang="ts">
	import ArrowDown from '$lib/icons/ArrowDown.svelte';
	import clsx from 'clsx';
	import Question from '../formControls/Question.svelte';
	import { datasetOverview } from '$lib/stores/datasetOverview';
	import { onMount } from 'svelte';

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

 type dateType	= {
	year: number | undefined,
	month: string,
	day: number| undefined,
	}

	let start:dateType ={
		year: undefined,
		month: '',
		day: undefined
	}

	let end:dateType ={
		year: undefined,
		month: '',
		day: undefined
	}

	$:start, updateStart(start);
	$:end, updateEnd(end)

	function updateStart(s)
	{
			console.log("🚀 ~ updateStart ~ start", start);
			if(start.day	!= undefined && start.month != "" && start.year != undefined)
			{
				const sm = months.indexOf(start.month)+1;
				$datasetOverview.temporalScope = {...$datasetOverview.temporalScope, start : new Date(start.year,sm, start.day)};
			}
	}

	function updateEnd(e)
	{
			console.log("🚀 ~ updateEnd ~ start", end);
			if(end.day	!= undefined && end.month != "" && end.year != undefined)
			{
				const sm = months.indexOf(end.month)+1;
				$datasetOverview.temporalScope = {...$datasetOverview.temporalScope, end : new Date(end.year,sm, end.day)};

			}

			console.log($datasetOverview.temporalScope);
			
	}




 onMount(() => {

		console.log("🚀 ~ initDates ~ newDate:", $datasetOverview.temporalScope);
		//initDates();
		const s = new Date($datasetOverview.temporalScope.start);
		start.month = months[s.getMonth()]; // Months are zero-indexed
  start.year = s.getFullYear();
  start.day	= s.getDate();

		const e = new Date($datasetOverview.temporalScope.end);
		end.month = months[e.getMonth()]; // Months are zero-indexed
  end.year = e.getFullYear();
  end.day	= e.getDate();

		// const newDate = new Date($datasetOverview.temporalScope.start.getFullYear, $datasetOverview.temporalScope.start.getMonth, $datasetOverview.temporalScope.start.getDay);	
		
	});



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
				type="number"
				bind:value={start.day}
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
				type="number"
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
				type="number"
				bind:value={end.day}
			/>
		</div>
	</div>
	<!-- </div> -->
</Question>
