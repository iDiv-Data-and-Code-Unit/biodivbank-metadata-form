<!-- TODO: append new entry after important -->
<script lang="ts">
	import { nanoid } from 'nanoid';
	import { enhance } from '$app/forms';

	import countries from './countries.json';
	import Plus from '$lib/icons/Plus.svelte';
	import EditModal from './EditModal.svelte';
	import TextInput from '../TextInput.svelte';
	import OrcId from '../OrcId.svelte';
	import Select from '../Select.svelte';
	import Collapsible from '../Collapsible.svelte';
	import PrimaryContactModal from './PrimaryContactModal.svelte';
	import Ror from '../ROR.svelte';
	import DnDList from '../DnDList.svelte';
	import { convertToDataAuthor, convertToListAuthor } from '$lib/helper';
	import { generalInformation } from '$lib/stores/generalInformation';
	import type { ListAuthor, PrimaryContact, ImportAuthor } from '$lib/types/author';

	let authors: ListAuthor[] = [];

	// because of the different data structure of authors in the generalInformation store
	//	we need to convert the data to the correct format
	// authors for the form and authors for the generalInformation store
	authors = $generalInformation.authors
		.map((author) => {
			return convertToListAuthor(author);
		})
		.filter((a) => a.firstName !== '' && a.familyName !== '');

	$: authors, update();

	function update() {
		generalInformation.update((gi) => {
			//update the generalInformation store with the new authors
			gi.authors = authors.map((author) => {
				return convertToDataAuthor(author);
			});
			return gi;
		});
	}

	export let importedAuthors: ImportAuthor[] | null;

	let formEl: HTMLFormElement;
	let firstNameEl: HTMLInputElement;

	let firstName = '';
	let initials = '';
	let familyName = '';
	let orcId = '';
	let noOrcId = false;
	let isPrimaryContact = false;
	let primaryContact: PrimaryContact = {
		email: '',
		institutionName: '',
		institutionCountry: '',
		noRor: false,
		ror: ''
	};

	let isEditModalOpen = false;
	let isPrimaryContactModalOpen = false;
	let selectedAuthor: ListAuthor | null = null;

	function addAuthor() {
		authors = [
			...authors,
			{
				id: nanoid(),
				firstName,
				initials,
				familyName,
				orcId,
				noOrcId,
				isPrimaryContact,
				primaryContact
			}
		];
		formEl.reset();
		initials = '';
		firstNameEl.focus();
		selectedAuthor = null;
		noOrcId = false;
		isPrimaryContact = false;
		primaryContact = {
			email: '',
			institutionName: '',
			institutionCountry: '',
			noRor: false,
			ror: ''
		};
	}

	function addAuthors() {
		if (!importedAuthors) return;
		importedAuthors.forEach((author) => {
			authors = [
				...authors,
				{
					id: nanoid(),
					firstName: author.firstName,
					initials: author.initials ?? '',
					familyName: author.familyName,
					orcId: author.orcId ?? '',
					noOrcId: author.orcId ? false : true,
					isPrimaryContact: false,
					primaryContact: null
				}
			];
		});
	}

	$: {
		if (importedAuthors) {
			addAuthors();
		}
	}

	function openEdit(author: ListAuthor) {
		selectedAuthor = author;
		isEditModalOpen = true;
	}

	function editAuthor(
		id: string,
		firstName: string,
		initials: string,
		familyName: string,
		orcId: string,
		noOrcId: boolean
	) {
		authors = authors.map((author) => {
			if (author.id === id) {
				return { ...author, firstName, initials, familyName, orcId, noOrcId, primaryContact };
			}
			return author;
		});

		isEditModalOpen = false;
		selectedAuthor = null;
	}

	function openPrimaryContactDetails(author: ListAuthor) {
		changePrimaryContactStatus(author.id);
	}

	function editPrimaryContactDetails(
		id: string,
		isPrimaryContact: boolean,
		primaryContact: PrimaryContact | null
	) {
		authors = authors.map((author) => {
			if (author.id === id) {
				return { ...author, isPrimaryContact, primaryContact };
			}
			//console.log("🚀 ~ authors=authors.map ~ author:", author)
			return author;
		});
		isPrimaryContactModalOpen = false;
		selectedAuthor = null;
	}

	function changePrimaryContactStatus(id: string) {
		authors = authors.map((author) => {
			if (author.id === id) {
				if (!author.isPrimaryContact) {
					selectedAuthor = author;
					isPrimaryContactModalOpen = true;
				}
				return { ...author, isPrimaryContact: !author.isPrimaryContact };
			}
			return author;
		});
	}

	function cancelEditPrimaryContactModal() {
		selectedAuthor && changePrimaryContactStatus(selectedAuthor.id);
		isPrimaryContactModalOpen = false;
		selectedAuthor = null;
	}

	function isEmpty(author: ListAuthor) {
		return !author.firstName && !author.initials && !author.familyName && !author.orcId;
	}
</script>

<DnDList
	title="Authors list"
	emptyText="No creators added yet"
	bind:list={authors}
	{isEmpty}
	{openEdit}
>
	<span slot="lead" let:item>
		<input
			type="checkbox"
			checked={item.isPrimaryContact}
			on:click={() => openPrimaryContactDetails(item)}
			aria-roledescription="Author's primary contact status"
		/>
	</span>
	<svelte:fragment slot="content" let:item>
		<span class="text-black-text col-span-4 text-start"
			>{item.firstName} {item.initials} {item.familyName}</span
		>
		<span class="col-span-2">{!!item.orcId ? item.orcId : 'No ORCiD provided'}</span>
	</svelte:fragment>
	<svelte:fragment slot="description">
		<p class="text-subtle-text text-sm flex gap-1.5 items-center pt-2">
			Select the <input
				type="checkbox"
				class="!w-4 !h-4"
				checked
				on:click|preventDefault={() => false}
			/> to indicate which authors are primary contacts. At least one author must be a primary contact
			for the dataset.
		</p>
	</svelte:fragment>
</DnDList>

<div class="h-px col-span-2 my-2" />
<div class="col-span-2">
	<Collapsible title="Add an author *" open={true}>
		<form
			class="flex flex-col col-span-2 gap-4"
			on:submit|preventDefault={addAuthor}
			bind:this={formEl}
		>
			<div class="grid grid-cols-6 xl:flex-row gap-4 mt-1">
				<TextInput
					bind:value={firstName}
					required
					placeholder="E.g. Tarak"
					bind:el={firstNameEl}
					label="First name"
					class="col-span-2"
				/>
				<TextInput
					bind:value={initials}
					placeholder="L."
					label="initials(s)"
					pattern={'^ *?[A-Z]\\.(\\s[A-Z]\\.)* *?$'}
					errorMsg="Please enter initials in capitals separated \nby a dot and a space. Eg: E. G."
				/>
				<TextInput
					bind:value={familyName}
					required
					placeholder="Tidjani Kadal"
					label="Family name(s)"
					class="col-span-3"
				/>
			</div>
			<div class="w-1/2 grid gap-5">
				<OrcId
					bind:value={orcId}
					bind:notAvailable={noOrcId}
					name="orcId-author-list"
					label="ORCiD"
					maxLength={19}
					pattern={`\\d{4}-\\d{4}-\\d{4}-\\d{4}`}
					placeholder="Eg: 0000-0000-0000-0000"
					invalidInputErrorMsg="An ORCiD must contain four 4-digit numbers, separated by hyphens."
					invalidatedErrorMsg="ORCiD does not exist, please check that you have typed it in correctly."
					confirmCheckboxMsg="No ORCiD available?"
					validatedMsg="ORCiD found."
					required={!noOrcId}
				/>
				<label class="flex items-center gap-3"
					><span class="text-sm shrink-0">Primary contact?</span>
					<input type="checkbox" class="!w-4 !h-4" bind:checked={isPrimaryContact} />
				</label>
			</div>

			{#if isPrimaryContact}
				<TextInput
					class="col-start-1"
					label="Email address"
					required
					pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
					placeholder="E.g. name@organization.domain"
					bind:value={primaryContact.email}
				/>
				<div class="col-span-2 flex justify-between items-center gap-3">
					<TextInput
						label="Institution name"
						required
						placeholder="E.g. Institute of Biodiversity Studies"
						bind:value={primaryContact.institutionName}
					/>
					<Select
						label="Institution country"
						required
						placeholder="Select country..."
						options={countries.map((c) => c.en)}
						bind:value={primaryContact.institutionCountry}
					/>
				</div>
				<div>
					<Ror
						bind:value={primaryContact.ror}
						bind:notAvailable={primaryContact.noRor}
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
			{/if}
			<button
				type="submit"
				class="text-sm shadow-md text-white bg-secondary p-2 mt-3 pr-4 self-start col-span-1 rounded-md flex items-center gap-5"
			>
				<Plus />
				Add
			</button>
		</form>
	</Collapsible>
</div>
<!-- <div class="h-px bg-divider col-span-2" /> -->
<div class="col-span-2">
	<Collapsible title="Import authors"
		><form method="POST" action="?/importAuthors" use:enhance class="col-span-2">
			<div class="flex flex-col justify-start w-max gap-8">
				<input accept="text/csv" type="file" name="csv" id="csv" />
				<button class="text-sm shadow-md text-white bg-secondary p-2 px-4 rounded-md w-max gap-5"
					>Import</button
				>
			</div>
		</form>
		<div class="text-min-contrast-gray text-sm mb-4" slot="description">
			<p>
				You can also import authors from a CSV file. Download a template
				<a class="underline" href="/download?ext=csv">CSV</a>
				or
				<a class="underline" href="/download?ext=xlsx">Excel</a>
				file.
			</p>
		</div>
	</Collapsible>
</div>

{#if isEditModalOpen && selectedAuthor}
	<EditModal bind:isOpen={isEditModalOpen} author={selectedAuthor} {editAuthor} />
{/if}

{#if isPrimaryContactModalOpen && selectedAuthor}
	<PrimaryContactModal
		bind:isOpen={isPrimaryContactModalOpen}
		author={selectedAuthor}
		{editPrimaryContactDetails}
		{cancelEditPrimaryContactModal}
	/>
{/if}
