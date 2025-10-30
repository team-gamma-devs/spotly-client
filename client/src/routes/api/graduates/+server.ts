import { json } from '@sveltejs/kit';
import { BACKEND_URL } from '$env/static/private';
import { signRequest } from '$lib/server/authFetch';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const page = url.searchParams.get('page') || '1';
	const pageSize = url.searchParams.get('pageSize') || '20';

	const body = {
		technologies: [],
		englishLevels: [],
		tutorsFeedback: []
	};

	const bodyString = JSON.stringify(body);
	const timestamp = Date.now().toString();
	const signature = signRequest(bodyString, Number(timestamp));
	const token = cookies.get('access_token');

	const requestUrl = `${BACKEND_URL}/manager/search_graduates?page=${page}&pageSize=${pageSize}`;
	const requestOptions = {
		method: 'POST',
		headers: {
			'X-Signature': signature,
			'X-Timestamp': timestamp,
			'X-Frontend-Origin': 'vercel-spotly-client',
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json'
		},
		body: bodyString
	};

	// console.log('=== Request Details ===');
	// console.log('URL:', requestUrl);
	// console.log('Method:', requestOptions.method);
	// console.log('Headers:', requestOptions.headers);
	// console.log('Body:', requestOptions.body);
	// console.log('=====================');

	try {
		const response = await fetch(requestUrl, requestOptions);

		// console.log('=== Response Details ===');
		// console.log('Status:', response.status);
		// console.log('Status Text:', response.statusText);
		// console.log('======================');

		if (!response.ok) {
			console.error('Backend returned error:', response.status, response.statusText);
			return json({ 
				error: 'Failed to fetch graduates',
				graduates: [],
				totalPages: 0
			}, { status: response.status });
		}

		const data = await response.json();
		// console.log('Response Data:', data);
		
		return json(data);
	} catch (error) {
		console.error('Failed to fetch graduates:', error);
		return json({ 
			error: 'Failed to fetch graduates',
			graduates: [],
			totalPages: 0
		}, { status: 500 });
	}
};