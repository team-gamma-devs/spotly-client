// This file client/src/routes/app/manager/api/graduates/+server.ts

import { json } from '@sveltejs/kit';
import { BACKEND_URL } from '$env/static/private';
import { signedJsonFetch } from '$lib/server/authFetch';
import type { RequestHandler } from '@sveltejs/kit';

// Note: Both GET and POST use signedJsonFetch because the backend endpoint
// /manager/search_graduates expects a POST request with a JSON body in both cases
export const GET: RequestHandler = async ({ url, cookies }) => {
	const page = url.searchParams.get('page') || '1';
	const pageSize = url.searchParams.get('pageSize') || '20';
	const token = cookies.get('access_token');

	const body = {
		technologies: [],
		englishLevels: [],
		tutorsFeedback: []
	};

	const requestUrl = `${BACKEND_URL}/manager/search_graduates?page=${page}&pageSize=${pageSize}`;

	try {
		const response = await signedJsonFetch(
			requestUrl,
			{
				method: 'POST',
				body: JSON.stringify(body)
			},
			token
		);

		if (!response.ok) {
			console.error('Backend returned error:', response.status, response.statusText);
			return json({ 
				error: 'Failed to fetch graduates',
				items: [],
				pages: 0,
				page: 1,
				limit: 20
			}, { status: response.status });
		}

		const data = await response.json();
		return json(data);
	} catch (error) {
		console.error('Failed to fetch graduates:', error);
		return json({ 
			error: 'Failed to fetch graduates',
			items: [],
			pages: 0,
			page: 1,
			limit: 20
		}, { status: 500 });
	}
};

export const POST: RequestHandler = async ({ url, request, cookies }) => {
	const page = url.searchParams.get('page') || '1';
	const pageSize = url.searchParams.get('pageSize') || '20';
	const token = cookies.get('access_token');
	const filterData = await request.json();
	
	const body = {
		technologies: filterData.technologies || [],
		englishLevels: filterData.englishLevels || [],
		tutorsFeedback: filterData.tutorsFeedback || []
	};

	const requestUrl = `${BACKEND_URL}/manager/search_graduates?page=${page}&pageSize=${pageSize}`;

	try {
		const response = await signedJsonFetch(
			requestUrl,
			{
				method: 'POST',
				body: JSON.stringify(body)
			},
			token
		);

		if (!response.ok) {
			console.error('Backend returned error:', response.status, response.statusText);
			return json({ 
				error: 'Failed to fetch graduates',
				items: [],
				pages: 0,
				page: 1,
				limit: 20
			}, { status: response.status });
		}

		const data = await response.json();
		return json(data);
	} catch (error) {
		console.error('Failed to fetch graduates:', error);
		return json({ 
			error: 'Failed to fetch graduates',
			items: [],
			pages: 0,
			page: 1,
			limit: 20
		}, { status: 500 });
	}
};