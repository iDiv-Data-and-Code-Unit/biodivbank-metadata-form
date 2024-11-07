
import {Api} from '$lib/services/Api';
/****************/
/* Overview Variable Template*/
/****************/

//host/api/metadata/${$params.id}?simplifiedJson=1
export const getMetadata = async (id:number) => {
	try {
		const response = await Api.get('api/metadata/'+id+'?simplifiedJson=1');
		console.log("🚀 ~ getMetadata ~ response:", response)

		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

	// console.log(JSON.stringify(body, null, 2));
		// const result = await axios.put(`https://rc.bexis2.uni-jena.de/api/Metadata/${$params.id}`, {
		// 	headers: {
		// 		Authorization: 'Bearer ' + $params.auth,
		// 		'Access-Control-Allow-Origin': '*'
		// 	},
		// 	body
		// });
		// console.log(result);
export const saveMetadata = async (id:number, metadata:any) => {
	try {
		const response = await Api.put('api/metadata/'+id, metadata);

		return response.data;
		
	} catch (error) {
		console.error(error);
		throw error;
	}
};
