<script lang="ts">
	import ArrowDown from '$lib/icons/ArrowDown.svelte';
	import clsx from 'clsx';

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

<div class="col-span-2 flex flex-col gap-4 items-center">
	<div class="w-full">
		<div class="flex gap-4 items-center">
			<h4 class="shrink-0">Start date</h4>
			<input
				class="bg-input rounded-md px-4 py-3 border-none w-full placeholder:text-placeholder"
				placeholder="Year"
				type="text"
			/>
			<select
				class={clsx(
					'bg-input rounded-md px-4 py-3 border-none w-full',
					!startMonth && 'text-placeholder'
				)}
				bind:value={startMonth}
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
			/>
			<select
				class={clsx(
					'bg-input rounded-md px-4 py-3 border-none w-full',
					!endMonth && 'text-placeholder'
				)}
				bind:value={endMonth}
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
			/>
		</div>
	</div>
</div>
