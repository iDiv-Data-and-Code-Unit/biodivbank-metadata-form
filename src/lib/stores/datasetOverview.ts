import type { DatasetOverview } from '$lib/types/schema';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';


// const initialStore: DatasetOverview = undefined;

let storedValue: DatasetOverview | undefined;
if (browser) {
	const localStorageValue = localStorage.getItem('datasetOverview') || '';
	storedValue = localStorageValue.length ? JSON.parse(localStorageValue) as DatasetOverview : undefined;
} else {
	storedValue = undefined;
}

export const datasetOverview = writable<DatasetOverview>(storedValue);

datasetOverview.subscribe((value) => {
	if (browser) {
		// If null or undefined, don't convert to string
		localStorage.setItem('datasetOverview', value ? JSON.stringify(value) : '');
	}
});
