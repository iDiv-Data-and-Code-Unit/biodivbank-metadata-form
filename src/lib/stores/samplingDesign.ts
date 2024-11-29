import type { SamplingDesign } from '$lib/types/schema';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const samplingDesign = writable<SamplingDesign>();

samplingDesign.subscribe((value) => {
	if (browser) {
		// If null or undefined, don't convert to string
		localStorage.setItem('samplingDesign', value ? JSON.stringify(value) : '');
	}
});
