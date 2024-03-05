import fs from 'fs/promises';

export async function GET({ url }) {
	const ext = url.searchParams.get('ext');
	console.log(ext);

	const file = await fs.readFile(`files/template.${ext}`);
	console.log(file);
	return new Response(file, {
		status: 200,
		headers: {
			'Content-Type': ext === 'xlsx' ? 'application/xlsx' : 'text/csv',
			'Content-Disposition': `attachment; filename=template.${ext}`
		}
	});
}
