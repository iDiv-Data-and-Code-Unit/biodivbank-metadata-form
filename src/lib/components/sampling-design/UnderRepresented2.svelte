<script lang="ts">
	import Pen from '$lib/icons/Pen.svelte';
	import Plus from '$lib/icons/Plus.svelte';
	import Trash from '$lib/icons/Trash.svelte';
	import { samplingDesign } from '$lib/stores/samplingDesign';
	import Collapsible from '../Collapsible.svelte';
	import TextInput from '../TextInput.svelte';
	import Question from '../formControls/Question.svelte';

	let group = '';
	let reason = '';
</script>

<Question
	question="Are there taxa or other groups which may have been under-represented in the dataset, for example due to the timing or seasonality of sampling, or the precise methods used?"
	direction="column"
>
	<div class="grid grid-cols-under-rep">
		<h4 class="mb-1">Under-represented group</h4>
		<h4>Reason</h4>
		<!-- <h4 class="justify-self-end">Actions</h4> -->
		<div class="col-span-3 h-px bg-black mb-2" />
		{#if !$samplingDesign.underRepresented.length}
			<span class="col-span-3 justify-self-center text-min-contrast-gray">No entries yet</span>
		{:else}
			{#each $samplingDesign.underRepresented as ur}
				<span class="text-description text-base mb-2 last:mb-0">{ur.group}</span>
				<span class="text-description text-base"
					>{ur.reason.length >= 20 ? ur.reason.substring(0, 20) + '...' : ur.reason}</span
				>
				<div class="justify-self-end flex gap-4">
					<!-- <button><Pen class="h-6 w-6 text-description" /></button> -->
					<button
						on:click={() => {
							samplingDesign.update((sd) => {
								sd.underRepresented = sd.underRepresented.filter((u) => u !== ur);
								return sd;
							});
						}}><Trash class="h-6 w-6 text-description" /></button
					>
				</div>
			{/each}
		{/if}
	</div>
	<div class="h-px col-span-2 my-4" />
	<Collapsible title="Add a group" open={true}>
    <div class="space-y-8">
		<TextInput
			label="Under-represented group"
			placeholder="E.g. nocturnal Aves, or e.g. fish ≤ 2 cm"
			bind:value={group}
		/>
		<TextInput
			helpText="Multiple examples of a category can be entered in the textbox; separate the words or phrases using a comma"
			label="Reason"
			placeholder="E.g. sampling was conducted during day, or e.g. due to mesh size of nets"
			bind:value={reason}
		/>
		<button
			class="text-sm shadow-md text-white bg-secondary p-2 mt-3 pr-4 self-start col-span-1 rounded-md flex items-center gap-5"
			on:click={() => {
				if (!group || !reason) {
					return;
				}
				samplingDesign.update((sd) => {
					sd.underRepresented.push({ group, reason });
					return sd;
				});
				group = '';
				reason = '';
			}}><Plus />Add group</button
		></div></Collapsible
	>
</Question>
