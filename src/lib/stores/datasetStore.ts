import { writable } from "svelte/store";

export const datasetIdStore = writable(0);
export const metadataStore = writable({});
export const metadataStructureIdStore = writable(0);

