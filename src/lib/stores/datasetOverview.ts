import type { DatasetOverview } from '$lib/types/schema';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const initialStore: DatasetOverview = {
	originalOrCompiledDataset: 'singleSource',
	currentOrLegacyDataset: 'current',
	dataSource: [],
	temporalScopeStart: '',
	temporalScopeEnd: '',
	spatialScope: '',
	country: '',
	coordinateType: '',
	longitude: '',
	latitude: '',
	fieldStation: '',
	fieldStationROR: '',
	fieldStationNoROR: false,
	coreRealms: [],
	transitionalRealms: [],
	coreRealmBiomes: [],
	transitionalRealmBiomes: [],
	kingdoms: [],
	subDivisions: []
};

let storedValue: DatasetOverview;
if (browser) {
	storedValue = (JSON.parse(localStorage.getItem('datasetOverview') as string) ||
		initialStore) as DatasetOverview;
} else {
	storedValue = initialStore;
}

export const datasetOverview = writable<DatasetOverview>(storedValue);

datasetOverview.subscribe((value) => {
	if (browser) {
		localStorage.setItem('datasetOverview', JSON.stringify(value));
	}
});
