import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	importAuthors: async ({ request }) => {
		const data = await request.formData();
		const file = data.get('csv') as File;
		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		const csvFilePath = path.resolve('test.csv');

		const headers = ['firstName', 'initials', 'familyName', 'orcId'];

		const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

		const authors = parse(
			buffer,
			{
				delimiter: ',',
				columns: true
			}
			// (error, result: Author[]) => {
			// 	if (error) {
			// 		console.error(error);
			// 	}
			// 	console.log('Result', result);
			// }
		);
		return { authors };
	}
};
