// export const prerender = false;

// export async function load({ url, fetch }) {
// 	const response = await fetch(
// 		`https://rc.bexis2.uni-jena.de/api/metadata/${url.searchParams.get('id')}`,
// 		{
// 			method: 'GET',
// 			headers: {
// 				Accept: 'application/json',
// 				Authorization: 'Bearer ' + url.searchParams.get('auth')
// 			}
// 		}
// 	);
// 	console.log(response);

// 	const data = await response.json();
// 	console.log(data);

// 	return {};
// }
