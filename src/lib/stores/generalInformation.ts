import type { GeneralInformation } from '$lib/types/schema';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const initialStore: GeneralInformation = {
	firstName: '',
	initials: '',
	familyName: '',
	orcidId: '',
	noOrcidId: false,
	email: '',
	institutionName: '',
	institutionCountry: '',
	ror: '',
	noRor: false,
	datasetTitle: '',
	datasetAbstract: '',
	yearPublished: '',
	accessPolicy: '',
	embargoEndDate: '',
	authors: [],
	funders: [],
	resources: []
};

let storedValue: GeneralInformation;
if (browser) {
	storedValue = (JSON.parse(localStorage.getItem('generalInformation') as string) ||
		initialStore) as GeneralInformation;
} else {
	storedValue = initialStore;
}

export const generalInformation = writable<GeneralInformation>(storedValue);

generalInformation.subscribe((value) => {
	if (browser) {
		localStorage.setItem('generalInformation', JSON.stringify(value));
	}
});
