import {setApiConfig} from '$lib/stores/apiStores';

export const prerender = true;
export const ssr = false;


export async function load({ fetch }) {
	if (import.meta.env.DEV) {
		setApiConfig('http://localhost:44345', 'admin', '123456');
	}

	return {};
}

