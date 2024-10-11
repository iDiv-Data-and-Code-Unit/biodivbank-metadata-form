import type { DatasetOverview } from '$lib/types/schema';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';


// const initialStore: DatasetOverview = undefined;

let storedValue: DatasetOverview |	undefined;
if (browser) {
	storedValue = (JSON.parse(localStorage.getItem('datasetOverview') as string) ||
		undefined) as DatasetOverview;
} else {
	storedValue = undefined;
}

export const datasetOverview = writable<DatasetOverview>(storedValue);

datasetOverview.subscribe((value) => {
	if (browser) {
		localStorage.setItem('datasetOverview', JSON.stringify(value));
	}
});
