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

export const generalInformation = writable<GeneralInformation>();

generalInformation.subscribe((value) => {
	if (browser) {
		// If null or undefined, don't convert to string
		localStorage.setItem('generalInformation', value ? JSON.stringify(value) : '');
	}
});
