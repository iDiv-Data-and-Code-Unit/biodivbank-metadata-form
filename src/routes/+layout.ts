import {setApiConfig} from '$lib/stores/apiStores';

export const prerender = false;
export const ssr = false;


export async function load({ url, fetch }) {

	const auth = url?.searchParams?.get('auth')


	if (import.meta.env.DEV) {
		// setApiConfig('http://localhost:44345', 'admin', '123456', auth?auth:'' );
		setApiConfig('https://rc.bexis2.uni-jena.de/', 'admin', '123456', auth?auth:'' );
	}
	else
	{
		setApiConfig('http://localhost:44345', '', '', auth?auth:'' );
	}
	return {};
}