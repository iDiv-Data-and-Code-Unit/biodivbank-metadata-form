import type { DatasetOverview } from '$lib/types/schema';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const datasetOverview = writable<DatasetOverview>();

datasetOverview.subscribe((value) => {
	if (browser) {
		// If null or undefined, don't convert to string
		localStorage.setItem('datasetOverview', value ? JSON.stringify(value) : '');
	}
});
