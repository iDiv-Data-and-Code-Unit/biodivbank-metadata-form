<script lang="ts">
	import type { ListAuthor } from '$lib/types/author';
	import {
		Dialog,
		DialogOverlay,
		DialogTitle,
		DialogDescription
	} from '@rgossiaux/svelte-headlessui';
	import IndieOrcId from '../OrcId.svelte';
	import TextInput from '../TextInput.svelte';

	export let isOpen: boolean;
	export let author: ListAuthor | null;

	let firstName = author?.firstName ?? '';
	let initials = author?.initials ?? '';
	let familyName = author?.familyName ?? '';
	let orcId = author?.orcId ?? '';
	let orcIdNotAvailable: boolean = false;

	export let editAuthor: (
		id: string,
		firstName: string,
		initials: string,
		familyName: string,
		orcId: string
	) => void;

	function onSubmit() {
		if (author) {
			editAuthor(author.id, firstName, initials, familyName, orcId);
		}
	}
</script>

{#key author}
	<Dialog
		open={isOpen}
		on:close={() => (isOpen = false)}
		class="fixed inset-0 flex justify-center items-center z-50"
	>
		<DialogOverlay class="fixed inset-0 bg-black/25" />

		<div class="relative bg-white p-5 rounded-md">
			<DialogTitle class="text-lg mb-3">Edit Author</DialogTitle>
			<DialogDescription>
				<form class="flex flex-col col-span-4  gap-4" on:submit|preventDefault={onSubmit}>
					<div class="inline-flex flex-col xl:flex-row gap-4 mt-1">
						<TextInput
							label="First name"
							required
							bind:value={firstName}
							placeholder="E.g. Tarak"
						/>
						<TextInput
							bind:value={initials}
							placeholder="L."
							label="Initial(s)"
							pattern={'^ *?[A-Z]\\.(\\s[A-Z]\\.)* *?$'}
						/>
						<TextInput
							label="Family name"
							required
							bind:value={familyName}
							placeholder="Tidjani Kadal"
						/>
					</div>
					<IndieOrcId
						bind:value={orcId}
						bind:notAvailable={orcIdNotAvailable}
						name="orcId-author-list"
						label="ORCiD"
						maxLength={19}
						pattern="\d\d\d\d[-]\d\d\d\d[-]\d\d\d\d[-]\d\d\d\d"
						placeholder="Eg: 0000-0000-0000-0000"
						invalidInputErrorMsg="Only 4-digit numbers seperated by minus are permitted."
						invalidatedErrorMsg="OrcId does not exist, please check that you have typed it in correctly."
						confirmCheckboxMsg="No OrcID available?"
						validatedMsg="OrcId found."
					/>
					<div class="flex gap-4">
						<button
							type="button"
							class="text-lg py-2 px-3 self-start col-span-2 rounded-md"
							on:click={() => (isOpen = false)}
						>
							Cancel
						</button>
						<button
							type="submit"
							class="text-lg text-white bg-secondary py-2 px-3 self-start col-span-2 rounded-md"
						>
							Edit Author
						</button>
					</div>
				</form>
			</DialogDescription>
		</div>
	</Dialog>
{/key}
