import { writable } from 'svelte/store';

export type GeoStore = {
	countries: string[];
	marineRegions: string[];
};

const initialStore: GeoStore = {
	countries: [],
	marineRegions: []
};

export const geoStore = writable<GeoStore>(initialStore);
