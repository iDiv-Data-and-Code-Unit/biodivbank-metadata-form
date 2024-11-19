<script lang="ts">
	import clsx from 'clsx';
	import { onMount } from 'svelte';

	import Question from '../formControls/Question.svelte';
	import ArrowDown from '$lib/icons/ArrowDown.svelte';
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
	] as const;

	let startMonth = '';
	let endMonth = '';

	type dateType = {
		year: number | undefined;
		month: string;
		day: number | undefined;
	};

	let start: dateType = {
		year: undefined,
		month: '',
		day: undefined
	};

	let end: dateType = {
		year: undefined,
		month: '',
		day: undefined
	};

	onMount(() => {
		console.log('🚀 ~ initDates ~ newDate:', $datasetOverview.temporalScope);
		//initDates();
		const s = new Date($datasetOverview.temporalScope!.start);
		start.month = months[s.getMonth()]; // Months are zero-indexed
		start.year = s.getFullYear();
		start.day = s.getDate();

		const e = new Date($datasetOverview.temporalScope!.end);
		end.month = months[e.getMonth()]; // Months are zero-indexed
		end.year = e.getFullYear();
		end.day = e.getDate();

		// const newDate = new Date($datasetOverview.temporalScope.start.getFullYear, $datasetOverview.temporalScope.start.getMonth, $datasetOverview.temporalScope.start.getDay);
	});

	const maxDays = (date: dateType) =>
		months.reduce(
			(acc, month) => {
				const year = date.year || currentYear;
				const monthIndex = months.indexOf(month);
				const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

				acc[month] = daysInMonth;
				return acc;
			},
			months.map((month) => ({ [month]: 0 })).reduce((acc, curr) => ({ ...acc, ...curr }), {})
		);

	const updateDate = (type: 'start' | 'end', date: dateType) => {
		if (date.day != undefined && date.month != '' && date.year != undefined) {
			const m = months.indexOf(date.month as (typeof months)[number]);
			$datasetOverview.temporalScope = {
				...$datasetOverview.temporalScope!,
				[type]: new Date(date.year, m, date.day)
			};
		}
	};

	const onMonthChange = (type: 'start' | 'end') => {
		if (type === 'start') {
			start.day = start.day
				? start.day > maxDaysStartMonth[start.month]
					? maxDaysStartMonth[start.month]
					: start.day
				: 1;
			maxDaysStartMonth = maxDays(start);
		} else {
			end.day = end.day
				? end.day > maxDaysEndMonth[end.month]
					? maxDaysEndMonth[end.month]
					: end.day
				: 1;
		}
	};

	$: currentYear = new Date().getFullYear();
	$: maxDaysStartMonth = maxDays(start);
	$: maxDaysEndMonth = maxDays(end);
	$: start, updateDate('start', start);
	$: end, updateDate('end', end);
	$: start.year, onMonthChange('start');
	$: end.year, onMonthChange('end');
</script>

<Question question="What is the temporal extent of the dataset?" direction="column">
	<!-- <div class="col-span-2 flex flex-col gap-4 items-center"> -->
	<div class="w-full">
		<div class="flex gap-4 items-center">
			<h4 class="shrink-0">Start date</h4>
			<input
				class="bg-input rounded-md px-4 py-3 border-none w-full placeholder:text-placeholder"
				placeholder="Year"
				type="number"
				bind:value={start.year}
				required
				min={1}
				max={currentYear}
			/>
			<select
				class={clsx(
					'bg-input rounded-md px-4 py-3 border-none w-full',
					!startMonth && 'text-placeholder'
				)}
				bind:value={start.month}
				on:change={() => onMonthChange('start')}
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
				min={1}
				max={maxDaysStartMonth[start.month]}
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
				min={1}
				max={currentYear}
				required
			/>
			<select
				class={clsx(
					'bg-input rounded-md px-4 py-3 border-none w-full',
					!endMonth && 'text-placeholder'
				)}
				bind:value={end.month}
				on:change={() => onMonthChange('end')}
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
				min={1}
				max={maxDaysEndMonth[end.month]}
			/>
		</div>
	</div>
	<!-- </div> -->
</Question>
