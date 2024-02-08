import type { Map } from 'maplibre-gl';
import { writable } from 'svelte/store';

function createMap() {
	const { subscribe, set } = writable<Map>(undefined);

	return {
		subscribe,
		set: async (map: Map) => set(map)
	};
}

export const map = createMap();
