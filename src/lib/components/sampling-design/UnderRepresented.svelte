<script lang="ts">
	import toast from 'svelte-french-toast';

	import Pen from '$lib/icons/Pen.svelte';
	import Plus from '$lib/icons/Plus.svelte';
	import Trash from '$lib/icons/Trash.svelte';
	import Collapsible from '../Collapsible.svelte';
	import DnDList from '../DnDList.svelte';
	import TextInput from '../TextInput.svelte';
	import Question from '../formControls/Question.svelte';
	import { samplingDesign } from '$lib/stores/samplingDesign';

	let group = '';
	let reason = '';
	let isOpen = false;
	let selectedGroup: { group: string; reason: string } | null = null;

	function openEdit(group: { group: string; reason: string }) {
		selectedGroup = group;
		isOpen = true;
	}

	const addHandler = () => {
		if (!group || !reason) {
			return;
		}

		samplingDesign.update((sd) => {
			if (sd.samplingScope.underRepresentedTaxa.some((item) => item.group === group)) {
				toast.error('Group already added');
				return sd;
			}
			sd.samplingScope.underRepresentedTaxa.push({ group, reason });
			group = '';
			reason = '';
			return sd;
		});
	};
</script>

<Question
	question="Are there taxa or other groups which may have been under-represented in the dataset, for example due to the timing or seasonality of sampling, or the precise methods used?"
	direction="column"
>
	<DnDList
		title="Under-represented taxa"
		emptyText="No entries yet"
		idKey="group"
		bind:list={$samplingDesign.samplingScope.underRepresentedTaxa}
		isEmpty={() => !$samplingDesign.samplingScope.underRepresentedTaxa.length}
		{openEdit}
		disableDnD
	>
		<svelte:fragment slot="content" let:item>
			<div class="flex items-center gap-6 col-span-3">
				<span class="text-black-text">{item.group}</span>
			</div>
			<span class="col-span-4 text-ellipsis overflow-clip whitespace-nowrap">{item.reason}</span>
		</svelte:fragment>
	</DnDList>

	<div class="h-px col-span-2 my-4" />
	<Collapsible title="Add a group" open={true}>
		<div class="space-y-8">
			<TextInput
				label="Under-represented group"
				placeholder="E.g. nocturnal Aves, or e.g. fish ≤ 2 cm"
				bind:value={group}
				required
			/>
			<TextInput
				helpText="Multiple examples of a category can be entered in the textbox; separate the words or phrases using a comma"
				label="Reason"
				placeholder="E.g. sampling was conducted during day, or e.g. due to mesh size of nets"
				bind:value={reason}
				required
			/>
			<button
				class="text-sm shadow-md text-white bg-secondary p-2 mt-3 pr-4 self-start col-span-1 rounded-md flex items-center gap-5"
				on:click={addHandler}><Plus />Add</button
			>
		</div></Collapsible
	>
</Question>
