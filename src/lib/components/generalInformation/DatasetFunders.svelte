<script lang="ts">
	import { generalInformation } from '$lib/stores/generalInformation';
	import type { Funder } from '$lib/types/schema';
	import { nanoid } from 'nanoid';
	import TextInput from '../TextInput.svelte';
	import Icon from '@iconify/svelte';

	let funders = $generalInformation.funders;

	$: generalInformation.update((gi) => {
		gi.funders = funders;
		return gi;
	});

	let formEl: HTMLFormElement;
	let nameEl: HTMLInputElement;

	let name = '';
	let funderId = '';
	let noFunderId = false;
	let grantNumber: string = '';

	let isOpen = false;
	let selectedFunder: Funder | null = null;

	function addFunder() {
		funders = [...funders, { id: nanoid(), name, funderId, noFunderId, grantNumber }];
		formEl.reset();
		nameEl.focus();
	}

	function removeFunder(id: string) {
		funders = funders.filter((funder) => funder.id !== id);
	}

	function openEdit(funder: Funder) {
		selectedFunder = funder;
		isOpen = true;
	}

	function editFunder(
		id: string,
		name: string,
		funderId: string,
		noFunderId: boolean,
		grantNumber: string
	) {
		funders = funders.map((funder) => {
			if (funder.id === id) {
				return { ...funder, name, funderId, noFunderId, grantNumber };
			}
			return funder;
		});
		isOpen = false;
		selectedFunder = null;
	}
</script>

{#if funders.length}
	<div class="col-span-2 space-y-1">
		{#each funders as funder (funder.id)}
			<div
				class="bg-secondary-white py-4 px-6 text-subtle-text border border-interactive-surface grid grid-cols-4 items-center"
			>
				<div class="flex items-center gap-6">
					<span class="text-black-text">{funder.name}</span>
				</div>
				<span class="justify-self-center"
					>{funder.funderId ? funder.funderId : 'No funder ID provided'}</span
				>
				<span class="">{funder.grantNumber}</span>
				<div class="flex items-center gap-6 text-subtle-text justify-end">
					<button type="button" on:click={() => openEdit(funder)}>
						<Icon icon="heroicons:pencil" class="h-5 w-5" />
					</button>
					<button type="button" on:click={() => removeFunder(funder.id)}>
						<Icon icon="heroicons:trash" class="h-5 w-5" />
					</button>
				</div>
			</div>
		{/each}
	</div>
{:else}
	<div
		class="flex items-center justify-center p-4 col-span-2 bg-secondary-white border border-dashed border-secondary-light text-secondary-light"
	>
		No funders added yet
	</div>
{/if}
<div class="bg-divider h-px col-span-2 my-4" />
<form
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
			bind:value={funderId}
			placeholder="E.g. 501100001659"
			label="Crossref Funder ID"
			pattern="[0-9]&lbrace;12&rbrace;"
			disabled={noFunderId}
			maxlength={12}
			errorMsg="Please enter a valid Crossref Funder ID (12 digits)"
		/>
		<label class="flex items-center gap-3">
			<span class="text-sm shrink-0">No Crossref Funder ID available?</span>
			<input type="checkbox" class="!h-4 !w-4" bind:checked={noFunderId} />
		</label>
	</div>
	<TextInput bind:value={grantNumber} required placeholder="E.g. FZT 118" label="Grant number" />

	<button
		type="submit"
		class="text-sm shadow-md text-white bg-secondary p-2 mt-3 pr-4 self-start col-span-1 rounded-md flex items-center gap-5"
	>
		<Icon icon="heroicons:plus" class="h-6 w-6" />
		Add Funder
	</button>
</form>

<!-- {#if isOpen && selectedFunder}
	<EditModal bind:isOpen author={selectedAuthor} {editAuthor} />
{/if} -->
