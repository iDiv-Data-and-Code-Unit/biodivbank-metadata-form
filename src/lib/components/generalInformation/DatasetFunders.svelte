<script lang="ts">
	// TODO: validate crossref funder id
	import toast from 'svelte-french-toast';
	import { nanoid } from 'nanoid';

	import TextInput from '../TextInput.svelte';
	import Collapsible from '../Collapsible.svelte';
	import Plus from '$lib/icons/Plus.svelte';
	import DnDList from '../DnDList.svelte';
	import { generalInformation } from '$lib/stores/generalInformation';
	import type { funderType } from '$lib/schemas/generalInformation';

	let funders: funderType[] = $generalInformation.funders.filter((funder) => !isEmpty(funder));

	$: generalInformation.update((gi) => {
		gi.funders = funders;
		return gi;
	});

	let formEl: HTMLFormElement;
	let nameEl: HTMLInputElement;

	let id = '';
	let name = '';
	let noFunderId = false;
	let grantNumber: string = '';

	let isOpen = false;
	let selectedFunder: funderType | null = null;

	function addFunder() {
		if (funders.some((funder) => funder.id === id)) {
			toast.error('Funder already added');
			return;
		}
		funders = [
			...funders,
			{ id: id.length === 12 && !noFunderId ? id : nanoid(), name, noFunderId, grantNumber }
		];
		formEl.reset();
		nameEl.focus();
		noFunderId = false;
	}

	function removeFunder(id: any) {
		funders = funders.filter((funder) => funder.id !== id);
	}

	function openEdit(funder: funderType) {
		selectedFunder = funder;
		isOpen = true;
	}

	function editFunder(id: string, name: string, noFunderId: boolean, grantNumber: string) {
		funders = funders.map((funder) => {
			if (funder.id === id) {
				return { ...funder, name, noFunderId, grantNumber };
			}
			return funder;
		});
		isOpen = false;
		selectedFunder = null;
	}

	function isEmpty(funder: funderType) {
		return !funder.id && !funder.name && !funder.grantNumber;
	}
</script>

<DnDList
	title="Funders list"
	emptyText="No funders added yet"
	bind:list={funders}
	{isEmpty}
	{openEdit}
>
	<svelte:fragment slot="content" let:item>
		<div class="flex items-center gap-6">
			<span class="text-black-text">{item.name}</span>
		</div>
		<span class="col-span-3">{!item.noitemId ? item.id : 'No funder ID provided'}</span>
		<span class="col-span-2">{item.grantNumber}</span>
	</svelte:fragment>
</DnDList>

<div class="col-span-2">
	<Collapsible open={true} title="Add a funder"
		><form
			class="flex flex-col col-span-2 gap-4"
			on:submit|preventDefault={addFunder}
			bind:this={formEl}
		>
			<TextInput
				bind:value={name}
				required
				placeholder="E.g. Deutsche Forschungsgemeinschaft"
				maxlength={100}
				bind:el={nameEl}
				label="Funder name"
			/>
			<div>
				<TextInput
					bind:value={id}
					placeholder="E.g. 501100001659"
					label="Crossref Funder ID"
					pattern="[0-9]&lbrace;12&rbrace;"
					disabled={noFunderId}
					maxlength={12}
					errorMsg="Please enter a valid Crossref Funder ID (12 digits)"
					required={!noFunderId}
				/>
				<label class="flex items-center gap-3">
					<span class="text-sm shrink-0">No Crossref Funder ID available?</span>
					<input type="checkbox" class="!h-4 !w-4" bind:checked={noFunderId} />
				</label>
			</div>
			<TextInput
				bind:value={grantNumber}
				required
				placeholder="E.g. FZT 118"
				label="Grant number"
			/>

			<button
				type="submit"
				class="text-sm shadow-md text-white bg-secondary p-2 mt-3 pr-4 self-start col-span-1 rounded-md flex items-center gap-5"
			>
				<Plus />
				Add
			</button>
		</form></Collapsible
	>
</div>

<!-- TODO: Edit doesn't work right now -->

<!-- {#if isOpen && selectedFunder}
	<EditModal bind:isOpen author={selectedFunder} {editAuthor} />
{/if} -->
