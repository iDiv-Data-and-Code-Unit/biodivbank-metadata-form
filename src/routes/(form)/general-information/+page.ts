import {setApiConfig, auth} from '$lib/stores/apiStores';

export const prerender = false;
export const ssr = false;

export async function load({ url, fetch }) {

	const authUrlParam = url?.searchParams?.get('auth')

 if(!auth && authUrlParam)
 {
   if (import.meta.env.DEV) {
    setApiConfig('http://localhost:44345', '', '', authUrlParam?authUrlParam:'' );
   }
   else
   {
    setApiConfig('https://idiv-biodivbank.uni-jena.de/', '', '', authUrlParam?authUrlParam:'' );
   }
  }
	return {};
}
