
import { type ListAuthor } from "./types/author";
import { nanoid } from "nanoid";
import type { authorType } from "./schemas/generalInformation";
import { string } from "zod";



export function convertToModel(metadata: any) {

		console.log(metadata, typeof metadata)
		const newMetadata = transformJSONFromApi(metadata);
		// const metadataToApi = transformJSONToApi(newMetadata);

  // console.log(newMetadata,metadataToApi);
	
		console.log("********************************************");
		console.log("*************metadata********************",metadata, newMetadata);
		console.log("********************************************");
			return newMetadata;

}

export function convertToApiModel(metadata: any, metadataStructureId:number) {


		const convertedMetadata = transformJSONToApi(metadata);
		console.log("********************************************");
		console.log("*************metadata********************",metadata, convertedMetadata);
		console.log("********************************************");
	
			return {
				'@id':	metadataStructureId,
				generalInformation: convertedMetadata.generalInformation ,
				datasetOverview: convertedMetadata.datasetOverview,
				samplingDesignAndLocation: convertedMetadata.samplingDesign
			};
}


function transformJSONFromApi(data) {
	if (typeof data !== "object" || data === null) {
			return data; // Base case: Handle non-object or null values
	}

	let result = {};

	for (const key in data) {
		//console.log("SIMPLE ~ transformJSONFromApi ~ key:", key);
			if (data.hasOwnProperty(key)) {
					const value = data[key];
					if (Array.isArray(value)) {

						 //check if array has only one simple item and  this is empty
							if(value.length == 1 && typeof value[0] === "object" && value[0]['#text'] == ""){
								result[key] = [];
							}
							else
							{
								result[key] = value.map(
									item => transformJSONFromApi(item)
								);
							}

					} else if (typeof value === "object") {

							result[key] = transformJSONFromApi(value);

					} else {

						 if(key!='@ref' && key!='@partyid' && key =='#text'){
								//console.log("SIMPLE ~ transformJSONFromApi ~ result:",value);
								try
								{
									result = JSON.parse(value)||undefined;
								}
								catch(e)
								{
									 result = value;
								}
							}
					}
			}
	}

	return result;
}

function transformJSONToApi(data) {
	if (typeof data !== "object" || data === null) {
			return data; // Base case: Handle non-object or null values
	}

	let result = {

	};

	for (const key in data) {
			if (data.hasOwnProperty(key)) {

					let value = data[key];

					// console.log("all key:", key, value, typeof value, value instanceof Date, value instanceof String, ""+value);
					
					if (Array.isArray(value)) {
							result[key] = value.map(item => 
								transformJSONToApi(item)
							);
					} else if (typeof value === "object") {

						// if value is a date
						if(value instanceof Date)
						{
								result[key] = {		
									'@ref': '',
									'@partyId': '',
									...formatData(value)
								}
						}
						else
						{
									console.log("Object, key:", key, value, typeof value);

									result[key] = {		
										'@ref': '',
										'@partyId': '',
										...transformJSONToApi(value)
									}
						}
							
					} else {
						 console.log("simple, key:", key, value, typeof value);
							result[key] = formatData(value);
							
					}
			}
	}

	return result;
}
	
function formatData<T>(value: T) {
	return {
		'@ref': '',
		'@partyId': '',
		'#text': ""+value
	};
}

/**** Authors *** */

export function convertToDataAuthor(author: ListAuthor) {

	const	dataAuthor:authorType	= {
		firstName: author.firstName,
		initials: author.initials,
		familyName: author.familyName,
		noOrcId: author.noOrcId,
		orcId: author.orcId||'',
		isPrimaryContact: author.isPrimaryContact,
		email: author.primaryContact?.email||'',
		institutionName: author.primaryContact?.institutionName||'',
		institutionCountry: author.primaryContact?.institutionCountry||'',
		rorId: author.primaryContact?.ror||'',
		noRorId: author.primaryContact?.noRor||false
	};

	return	dataAuthor;

}

export function convertToListAuthor(author: authorType) {

	const	listAuthor:ListAuthor	= {
			id: nanoid(),
			firstName: author.firstName,
			initials: author.initials||'',
			familyName: author.familyName,
			orcId: author.orcId||'',
			noOrcId: author.noOrcId,
			isPrimaryContact: author.isPrimaryContact,
			primaryContact: {
			email: author.email||'',
			institutionName: author.institutionName||'',
			institutionCountry: author.institutionCountry||'',
			ror: author.rorId||'',
			noRor: author.noRorId
		}

	};
	return	listAuthor;

}

/**** Authors END *** */

