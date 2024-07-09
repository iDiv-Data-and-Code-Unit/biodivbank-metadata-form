<script lang="ts">
	import type { ListAuthor, PrimaryContact } from '$lib/types/author';
	import {
		Dialog,
		DialogOverlay,
		DialogTitle,
		DialogDescription
	} from '@rgossiaux/svelte-headlessui';
	import TextInput from '../TextInput.svelte';
	import countries from './countries.json';
	import Select from '../Select.svelte';
	import Ror from '../ROR.svelte';

	export let isOpen: boolean;
	export let author: ListAuthor;
	export let editPrimaryContactDetails: (
		id: string,
		isPrimaryContact: boolean,
		primaryContact: PrimaryContact | null
	) => void;
	export let cancelEditPrimaryContactModal: () => void;

	let primaryContactDetails: PrimaryContact = author?.primaryContact ?? {
		email: '',
		institutionName: '',
		institutionCountry: '',
		noRor: false,
		ror: ''
	};

	function onSubmit() {
		if (author) {
			editPrimaryContactDetails(author.id, true, primaryContactDetails);
		}
	}

	$: console.log(author);
</script>

{#key `${author.id}-primaryContact`}
	<Dialog
		id={`editPrimaryContactDetails-${author.id}`}
		open={isOpen}
		class="fixed inset-0 flex justify-center items-center z-50"
	>
		<DialogOverlay class="fixed inset-0 bg-black/25" />

		<div class="relative bg-white p-5 rounded-md">
			<DialogTitle class="text-lg mb-3">Edit Primary Contact Details</DialogTitle>
			<DialogDescription>
				<form on:submit|preventDefault={onSubmit}>
					<TextInput
						class="col-start-1"
						label="Email address"
						required
						placeholder="E.g. name@organization.domain"
						bind:value={primaryContactDetails.email}
					/>
					<div class="col-span-2 flex justify-between items-center gap-3">
						<TextInput
							label="Institution name"
							required
							placeholder="E.g. Institute of Biodiversity Studies"
							bind:value={primaryContactDetails.institutionName}
						/>
						<Select
							label="Institution country"
							required
							placeholder="Select country..."
							options={countries.map((c) => c.en)}
							bind:value={primaryContactDetails.institutionCountry}
						/>
					</div>
					<div>
						<Ror
							bind:value={primaryContactDetails.ror}
							bind:notAvailable={primaryContactDetails.noRor}
							name="ror-author-list"
							label="Institution ROR ID"
							maxLength={9}
							placeholder="XXXXXXXXX"
							invalidInputErrorMsg="A ROR ID must contain 9 alphanumeric characters."
							invalidatedErrorMsg="ROR ID does not exist, please check that you have typed it in correctly."
							confirmCheckboxMsg="No ROR ID available?"
							validatedMsg="ROR ID found."
						/>
					</div>
					<div class="flex gap-4 pt-4">
						<button
							type="button"
							class="text-lg py-2 px-3 self-start col-span-2 rounded-md"
							on:click={cancelEditPrimaryContactModal}
						>
							Cancel
						</button>
						<button
							type="submit"
							class="text-lg text-white bg-secondary py-2 px-3 self-start col-span-2 rounded-md"
						>
							Save
						</button>
					</div>
				</form>
			</DialogDescription>
		</div>
	</Dialog>
{/key}
