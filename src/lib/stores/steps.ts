import { writable } from 'svelte/store';

function createSteps() {
	const { subscribe, update, set } = writable(1);
	const min = 1;
	const max = 5;

	return {
		subscribe,
		next: () => update((s) => Math.min(max, s + 1)),
		prev: () => update((s) => Math.max(min, s - 1)),
		min,
		max,
		set
	};
}

export const step = createSteps();
