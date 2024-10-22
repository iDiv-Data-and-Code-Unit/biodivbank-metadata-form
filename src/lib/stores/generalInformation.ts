import type { GeneralInformation } from '$lib/types/schema';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// const undefined: GeneralInformation = {
// 	dataProvider: {
// 		firstName: '',
// 		initials: '',
// 		familyName: '',
// 		orcidId: '',
// 		noOrcidId: false,
// 		email: '',
// 		institutionName: '',
// 		institutionCountry: '',
// 		ror: '',
// 		noRor: false
// 	},
// 	dataset: {
// 		title: '',
// 		abstract: '',	
// 		yearPublished: '',
// 		accessPolicy: '',
// 		license: ''
// 	},
// 	embargoEndDate: '',
// 	authors: [],
// 	funders: [],
// 	resources: []
// };

let storedValue: GeneralInformation | undefined;
if (browser) {
	storedValue = (JSON.parse(localStorage.getItem('generalInformation') as string) ||
		undefined) as GeneralInformation;
} else {
	storedValue = undefined;
}

export const generalInformation = writable<GeneralInformation>(storedValue);

generalInformation.subscribe((value) => {
	if (browser) {
		localStorage.setItem('generalInformation', JSON.stringify(value));
	}
});
