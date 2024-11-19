<script lang="ts">
	import { nanoid } from 'nanoid';
	import { z } from 'zod';

	import Collapsible from '../Collapsible.svelte';
	import Select from '../Select.svelte';
	import TextInput from '../TextInput.svelte';
	import Plus from '$lib/icons/Plus.svelte';
	import DnDList from '../DnDList.svelte';
	import { generalInformation } from '$lib/stores/generalInformation';
	import { ResourceTypeEnum } from '$lib/schemas/generalInformation';
	import type { resourceType } from '$lib/schemas/generalInformation';

	//10.13140/RG.2.2.25398.78400

	interface localResourceType extends resourceType {
		internalId: string;
	}
	// get list of options from enum
	let resourceTypes: string[] = ResourceTypeEnum.options;

	// init set resources from store
	let resources: localResourceType[] = $generalInformation.resources
		.map((r) => {
			// add internalId to object
			return { ...r, internalId: nanoid() };
		})
		.filter((e) => e.doi !== '' && e.doi !== undefined);

	// every change	in resources will update generalInformation
	$: resources, updateResources();

	function updateResources() {
		generalInformation.update((gi) => {
			gi.resources = resources
				.map((s) => {
					const d: resourceType = { ...s };
					// delete d.internalId;   // no internalId in resourceType
					return d;
				})
				.filter((e) => e.doi !== '');
			console.log('store:', gi.resources);

			return gi;
		});
	}

	let formEl: HTMLFormElement;
	let nameEl: HTMLInputElement;

	let type = '';
	let otherType = '';
	let doi = '';

	let isOpen = false;
	let selectedResource: localResourceType | null = null;

	let error: string | null = null;

	const urlSchema = z.string().url();

	async function addResource() {
		//https://doi.pangaea.de/10.1594/PANGAEA.972890

		//check with urlSchema.safeParse if doi a	url or not
		const isUrl = urlSchema.safeParse(doi).success;
		if (isUrl) {
			// it is a address
			const urlParts = doi.split('/');
			if (urlParts.length < 2) {
				error = 'Please enter a valid DOI or URL';
				return;
			} else {
				doi = urlParts[urlParts.length - 1] + '/' + urlParts[urlParts.length - 2];
			}
		}

		// get enum of resourceType
		let resourceType = ResourceTypeEnum.parse(type);

		try {
			const res = await fetch(`https://doi.org/api/handles/${doi}`);
			const json = await res.json();

			if (res.status !== 200 || json.responseCode !== 1) {
				error = 'Please enter a valid DOI or URL';
				return;
			}
		} catch (error) {
			console.log(error);
			error = 'Unexpected Error';
			return;
		}

		resources = [...resources, { internalId: nanoid(), type: resourceType, otherType, doi }];
		updateResources();
		type = '';
		formEl.reset();
		nameEl.focus();

		// console.log(resources);
		// console.log($generalInformation.resources);
	}

	function removeResource(internalId: string) {
		resources = resources.filter((resource) => resource.internalId !== internalId);
	}

	function openEdit(resource: localResourceType) {
		selectedResource = resource;
		isOpen = true;
	}

	function editResource(internalId: string, type: string, doi: string) {
		resources = resources.map((resource) => {
			if (resource.internalId === internalId) {
				return { ...resource, type, doi } as localResourceType;
			}
			return resource;
		});
		isOpen = false;
		selectedResource = null;
	}
</script>

<DnDList
	title="Resources list"
	emptyText="No resource identifiers added yet"
	idKey="internalId"
	bind:list={resources}
	{openEdit}
	disableDnD
	isEmpty={(resource) => resource.doi === ''}
>
	<svelte:fragment slot="content" let:item>
		<div class="flex items-center font-medium col-span-4">
			<span class="text-black-text">{item.type}</span>
		</div>
		<span class="text-black-text col-span-3"
			><span class="text-subtle-text">doi:</span><a
				class="underline"
				target="_blank"
				href={`https://doi.org/${item.doi}`}>{item.doi}</a
			></span
		>
	</svelte:fragment>
</DnDList>

<div class="col-span-2">
	<Collapsible open={true} title="Add a resource"
		><form
			class="flex flex-col col-span-2 gap-4"
			on:submit|preventDefault={addResource}
			bind:this={formEl}
		>
			<Select
				label="Resource type"
				placeholder="Select a resource type"
				required
				bind:value={type}
				options={resourceTypes}
			/>
			{#if type === 'Other'}
				<TextInput
					label="Type"
					placeholder="Please specify resource type"
					bind:value={otherType}
					required
				/>
			{/if}
			<TextInput
				bind:value={doi}
				placeholder="E.g. 10.25829/x33q1z"
				bind:el={nameEl}
				required
				label="DOI (or URL)"
			/>
			{#if error}
				<p class="text-error text-sm">{error}</p>
			{/if}

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

<!-- TODO: Edit is not working right now -->
<!-- {#if isOpen && selectedFunder}
	<EditModal bind:isOpen author={selectedAuthor} {editAuthor} />
{/if} -->
