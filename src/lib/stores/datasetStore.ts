import { writable } from "svelte/store";

export const datasetIdStore = writable<number>();
export const metadataStore = writable({});
export const metadataStructureIdStore = writable();

