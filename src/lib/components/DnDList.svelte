<script lang="ts">
	import clsx from 'clsx';
	import { flip } from 'svelte/animate';

	import Handle from '$lib/icons/Handle.svelte';
	import Pen from '$lib/icons/Pen.svelte';
	import Trash from '$lib/icons/Trash.svelte';

	export let title: string = '';
	export let list: any[] = [];
	export let emptyText: string = 'No items added yet';
	export let idKey: string = 'id';
	export let disableDnD: boolean = false;
	export let openEdit: (item: any) => void;
	export let isEmpty: (item: any) => boolean;

	let grabbed = false;
	let target: EventTarget | null = null;
	let hovering: number | null = null;

	function dragStart(event: DragEvent, idx: number) {
		if (target instanceof Element && target?.id.startsWith('handle')) {
			if (event.dataTransfer) {
				event.dataTransfer.effectAllowed = 'move';
				event.dataTransfer.dropEffect = 'move';
				event.dataTransfer.setData('text/plain', idx.toString());
				grabbed = true;
			}
		} else {
			event.preventDefault();
			grabbed = false;
		}
	}

	function drop(event: DragEvent, idx: number) {
		if (event.dataTransfer) {
			event.dataTransfer.dropEffect = 'move';
			const start = parseInt(event.dataTransfer.getData('text/plain'));
			const newList = list;

			if (start < idx) {
				newList.splice(idx + 1, 0, newList[start]);
				newList.splice(start, 1);
			} else {
				newList.splice(idx, 0, newList[start]);
				newList.splice(start + 1, 1);
			}
			list = newList;
			hovering = null;
			grabbed = false;
		}
	}

	function removeItem(id: string) {
		list = list.filter((item) => item[idKey] !== id);
	}
</script>

{#if list?.length}
	<div class="col-span-2 space-y-1">
		{#each list as item, idx (item[idKey])}
			<div
				on:mousedown={(e) => {
					target = e.target;
				}}
				animate:flip
				draggable={true}
				on:dragstart={(e) => dragStart(e, idx)}
				on:dragover|preventDefault
				on:dragenter={(e) => {
					hovering = idx;
				}}
				on:drop|preventDefault={(e) => drop(e, idx)}
				class={clsx(
					'bg-interactive-surface py-4 px-6 text-subtle-text border border-interactive-surface grid grid-cols-8 items-center',
					hovering === idx && 'border-red-600'
				)}
				role="button"
				tabindex="0"
				aria-grabbed={grabbed}
				aria-roledescription={title}
			>
				{#if !isEmpty(item)}
					{#if !disableDnD || $$slots.lead}
						<div class="flex items-center gap-10">
							{#if !disableDnD}
								<div id="handle" class="cursor-grab">
									<Handle />
								</div>
							{/if}

							<slot name="lead" {item} />
						</div>
					{/if}
					<slot name="content" {item} />
					<slot name="end" {item}>
						<div class="flex items-center gap-6 text-subtle-text justify-end">
							<button type="button" on:click={() => (openEdit ? openEdit(item) : () => {})}>
								<Pen class="h-5 w-5" />
							</button>
							<button type="button" on:click={() => removeItem(item[idKey])}>
								<Trash class="h-5 w-5" />
							</button>
						</div>
					</slot>
				{/if}
			</div>
		{/each}
		<slot name="description" />
	</div>
{:else}
	<div
		class="flex items-center justify-center p-4 col-span-2 bg-secondary-white border border-dashed border-secondary-light text-secondary-light"
	>
		{emptyText}
	</div>
{/if}
