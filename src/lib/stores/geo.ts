import { writable } from 'svelte/store';

export type GeoStore = {
	countries: string[];
	marineRegions: string[];
	layer: any;
};

const initialStore: GeoStore = {
	countries: [],
	marineRegions: [],
	layer: null
};

export const geoStore = writable<GeoStore>(initialStore);
