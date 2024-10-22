import type { SamplingDesign } from '$lib/types/schema';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

let storedValue: SamplingDesign | undefined;
if (browser) {
	storedValue = (JSON.parse(localStorage.getItem('samplingDesign') as string) ||
	undefined) as SamplingDesign;
} else {
	storedValue = undefined;
}

export const samplingDesign = writable<SamplingDesign>(storedValue);

samplingDesign.subscribe((value) => {
	if (browser) {
		localStorage.setItem('samplingDesign', JSON.stringify(value));
	}
});
