<script lang="ts">
	import Pen from '$lib/icons/Pen.svelte';
	import Plus from '$lib/icons/Plus.svelte';
	import Trash from '$lib/icons/Trash.svelte';
	import { generalInformation } from '$lib/stores/generalInformation';
 import type	{ funderType, resourceType } from '$lib/schemas/generalInformation';
 import { ResourceTypeEnum } from '$lib/schemas/generalInformation';
	import { nanoid } from 'nanoid';
	import Select from '../Select.svelte';
	import TextInput from '../TextInput.svelte';
	import { z } from 'zod';
	import Collapsible from '../Collapsible.svelte';


//10.13140/RG.2.2.25398.78400

 interface localResourceType extends resourceType {
			internalId: string;
	}

	let resourceTypes:string[] = ResourceTypeEnum.options;

	let resources:localResourceType[] = $generalInformation.resources.map((r) => {
		// add internalId to object
		return { ...r, internalId: nanoid() };
	}).filter(e=>	e.doi !== '' && e.doi !== undefined);
	$:resources,generalInformation.update((gi) => {
		gi.resources = resources.map((s) => {
				const d:resourceType = {...s};
				delete	d.internalId;
				return d;
			}).filter(e=> e.doi !== '');

			return gi;
	});

	// $: generalInformation.update((gi) => {
	// 	gi.resources = resources.map((s) => {
	// 			const d:resourceType = {...s};
	// 			delete	d.internalId;
	// 			return d;
	// 		}).filter(e=> e.doi !== '');

	// 		return gi;
	// });

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

		let resourceType = ResourceTypeEnum.parse(type);
		// console.log("🚀 ~ addResource ~ resourceType:", resourceType)
		// console.log("🚀 ~ addResource ~ doi:", doi)

		const { success } = urlSchema.safeParse(doi);

		try {
			const res = await fetch(`https://doi.org/api/handles/${doi}`);
			const json = await res.json();

			if(json.responseCode !== 1 || !success) {
				
				error = 'Please enter a valid DOI or URL';
				if (json.responseCode === 100 || !success) {
					if (!success) {
						error = 'Please enter a valid DOI or URL';
						return;
					}
				}
			}

		} catch (error) {
			console.log(error);
			error = 'Unexpected Error';
			return;
		}

		resources = [...resources, { internalId: nanoid(), type: resourceType, otherType, doi }];
		type = '';
		formEl.reset();
		nameEl.focus();

		console.log(resources);
		console.log($generalInformation.resources);
		
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
				return { ...resource, type, doi };
			}
			return resource;
		});
		isOpen = false;
		selectedResource = null;
	}
</script>

<!-- <div class="bg-divider h-px col-span-2 my-4" /> -->
{#if resources.length}
	<div class="col-span-2 space-y-1">
		{#each resources as resource (resource.internalId)}
			<div
				class="bg-secondary-white py-4 px-6 text-subtle-text border border-interactive-surface grid grid-cols-12 gap-4 items-center"
			>
				<div class="flex items-center gap-6 font-medium col-span-6">
					<span class="text-black-text">{resource.type}</span>
				</div>
				<span class="text-black-text col-span-5"
					><span class="text-subtle-text">doi:</span><a
						class="underline"
						target="_blank"
						href={`https://doi.org/${resource.doi}`}>{resource.doi}</a
					></span
				>
				<div class="flex items-center gap-6 text-subtle-text justify-end">
					<button type="button" on:click={() => openEdit(resource)}>
						<Pen class="h-5 w-5" />
					</button>
					<button type="button" on:click={() => removeResource(resource.internalId)}>
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
		No resource identifiers added yet
	</div>
{/if}
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
				<TextInput label="" placeholder="Please specify resource type" bind:value={otherType} />
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
		</form></Collapsible>
</div>
<!-- {#if isOpen && selectedFunder}
	<EditModal bind:isOpen author={selectedAuthor} {editAuthor} />
{/if} -->
