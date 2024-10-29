import type { SamplingDesign } from '$lib/types/schema';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

let storedValue: SamplingDesign | undefined;
if (browser) {
	const localStorageValue = localStorage.getItem('samplingDesign') || '';
	storedValue = localStorageValue.length ? JSON.parse(localStorageValue) as SamplingDesign : undefined;
} else {
	storedValue = undefined;
}

export const samplingDesign = writable<SamplingDesign>(storedValue);

samplingDesign.subscribe((value) => {
	if (browser) {
		// If null or undefined, don't convert to string
		localStorage.setItem('samplingDesign', value ? JSON.stringify(value) : '');
	}
});
