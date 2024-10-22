import { type geoReferenceType } from '$lib/types/schema';
import { writable } from 'svelte/store';

export type GeoStore = {
	countries: string[];
	marineRegions: string[];
	layer: any;
	georef:geoReferenceType;
};

const initialStore: GeoStore = {
	countries: [],
	marineRegions: ['nothing'],
	layer: null,
	georef:{
		coordinateType: 'Custom shape',
		longitude: '',
		latitude: ''
	}
};

export const geoStore = writable<GeoStore>(initialStore);
