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
	let isOpen = false;
	let selectedGroup: { group: string; reason: string } | null = null;

	function openEdit(group: { group: string; reason: string }) {
		selectedGroup = group;
		isOpen = true;
	}
	function removeGroup(ur: { group: string; reason: string }) {
		samplingDesign.update((sd) => {
			sd.underRepresented = sd.underRepresented.filter((u) => u !== ur);
			return sd;
		});
	}
</script>

<Question
	question="Are there taxa or other groups which may have been under-represented in the dataset, for example due to the timing or seasonality of sampling, or the precise methods used?"
	direction="column"
>
	{#if $samplingDesign.underRepresented.length}
		<div class="col-span-2 space-y-1">
			{#each $samplingDesign.underRepresented as ur}
				<div
					class="bg-secondary-white py-4 px-6 text-subtle-text border border-interactive-surface grid grid-cols-7 items-center"
				>
					<div class="flex items-center gap-6 col-span-2">
						<span class="text-black-text">{ur.group}</span>
					</div>
					<span class="col-span-4 text-ellipsis overflow-clip whitespace-nowrap"
						>{ur.reason}</span
					>
					<div class="flex items-center gap-6 text-subtle-text justify-end">
						<button type="button" on:click={() => openEdit(ur)}>
							<Pen class="h-5 w-5" />
						</button>
						<button type="button" on:click={() => removeGroup(ur)}>
							<Trash class="h-5 w-5" />
						</button>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<div
			class="flex items-center justify-center p-4 col-span-2 bg-secondary-white border border-dashed border-secondary-light text-secondary-light"
		>
			No entries yet
		</div>
	{/if}

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
				}}><Plus />Add</button
			>
		</div></Collapsible
	>
</Question>


