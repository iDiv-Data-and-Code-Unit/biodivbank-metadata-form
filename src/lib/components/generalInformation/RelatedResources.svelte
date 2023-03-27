<script lang="ts">
	import Pen from '$lib/icons/Pen.svelte';
	import Plus from '$lib/icons/Plus.svelte';
	import Trash from '$lib/icons/Trash.svelte';
	import { generalInformation } from '$lib/stores/generalInformation';
	import type { Resource } from '$lib/types/schema';
	import { nanoid } from 'nanoid';
	import Select from '../Select.svelte';
	import TextInput from '../TextInput.svelte';

	let resourceTypes = [
		'Journal article',
		'Data paper',
		'Preprint',
		'Dataset',
		'Code (statistical script, model, package, software)',
		'Computational notebook',
		'Workflow',
		'Then a slight gap or separator, before the rest of the list',
		'Audio',
		'Audiovisual',
		'Book',
		'Book chapter',
		'Conference proceeding',
		'Dissertation',
		'Image',
		'Physical sample',
		'Other'
	];

	let resources = $generalInformation.resources;

	$: generalInformation.update((gi) => {
		gi.resources = resources;
		return gi;
	});

	let formEl: HTMLFormElement;
	let nameEl: HTMLInputElement;

	let type = '';
	let otherType = '';
	let DOI = '';

	let isOpen = false;
	let selectedResource: Resource | null = null;

	function addResource() {
		let resourceType = type;
		if (type === 'Other') {
			resourceType = otherType;
		}
		resources = [...resources, { id: nanoid(), type: resourceType, DOI }];
		formEl.reset();
		nameEl.focus();
	}

	function removeResource(id: string) {
		resources = resources.filter((resource) => resource.id !== id);
	}

	function openEdit(resource: Resource) {
		selectedResource = resource;
		isOpen = true;
	}

	function editResource(id: string, type: string, DOI: string) {
		resources = resources.map((resource) => {
			if (resource.id === id) {
				return { ...resource, type, DOI };
			}
			return resource;
		});
		isOpen = false;
		selectedResource = null;
	}
</script>

{#if resources.length}
	<div class="col-span-2 space-y-1">
		{#each resources as resource (resource.id)}
			<div
				class="bg-secondary-white py-4 px-6 text-subtle-text border border-interactive-surface grid grid-cols-3 items-center"
			>
				<div class="flex items-center gap-6">
					<span class="text-black-text">{resource.type}</span>
				</div>
				<span class="justify-self-center">{resource.DOI}</span>
				<div class="flex items-center gap-6 text-subtle-text justify-end">
					<button type="button" on:click={() => openEdit(resource)}>
						<Pen class="h-5 w-5" />
					</button>
					<button type="button" on:click={() => removeResource(resource.id)}>
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
		No resources added yet
	</div>
{/if}
<div class="bg-divider h-px col-span-2 my-4" />
<form
	class="flex flex-col col-span-2  gap-4"
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
		bind:value={DOI}
		placeholder="E.g. 10.25829/x33q1z"
		bind:el={nameEl}
		required
		label="DOI"
		leading="https://doi.org/"
	/>

	<button
		type="submit"
		class="text-sm shadow-md text-white bg-secondary p-2 mt-3 pr-4 self-start col-span-1 rounded-md flex items-center gap-5"
	>
		<Plus />
		Add Resource
	</button>
</form>

<!-- {#if isOpen && selectedFunder}
	<EditModal bind:isOpen author={selectedAuthor} {editAuthor} />
{/if} -->
