import { writable } from 'svelte/store';
import { browser } from '$app/environment';

import type { LocalDataset } from '$lib/types/schema';

let storedValue: LocalDataset[] | undefined;
if (browser) {
	const localStorageValue = localStorage.getItem('localDatasets') || '';

	storedValue = localStorageValue.length ? JSON.parse(localStorageValue) as LocalDataset[] : undefined;
} else {
	storedValue = undefined;
}

export const localDatasetsStore = writable<LocalDataset[]>(storedValue);

localDatasetsStore.subscribe((value) => {
	if (browser) {
		// If null or undefined, don't convert to string
		localStorage.setItem('localDatasets', value ? JSON.stringify(value) : '');
	}
});
