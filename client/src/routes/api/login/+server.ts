// This file client/src/routes/api/login/+server.ts

import { json, error } from '@sveltejs/kit';
import { signedJsonFetch } from '$lib/server/authFetch';
import { BACKEND_URL } from '$env/static/private';
import type { RequestHandler } from './$types';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: RequestHandler = async ({ request }) => {
	let body;
	try {
		body = await request.json();
	} catch {
		return error(400, { message: 'Invalid request body' });
	}

	const { email } = body;

	if (!email || typeof email !== 'string') {
		return error(400, { message: 'A valid email is required' });
	}

	if (!emailRegex.test(email)) {
		return error(400, { message: 'Invalid email format' });
	}

	try {
		const response = await signedJsonFetch(
			`${BACKEND_URL}/auth/login`,
			{
				method: 'POST',
				body: JSON.stringify({ email }),
			}
		);

		if (!response.ok) {
			let errorData;
			try {
				errorData = await response.json();
			} catch {
				errorData = { detail: 'Login failed' };
			}

			return error(response.status, {
				message: errorData.detail || 'Login failed',
			});
		}

		// If the backend returns data (like isFirstTime flag), pass it through
		const responseData = await response.json();
		
		return json({
			success: true,
			message: `Access link sent to: ${email}`,
			...responseData, // Include any additional data from backend
		});

	} catch (err: any) {
		console.error('Error calling login endpoint:', err);

		if (err.cause?.code === 'ECONNREFUSED') {
			return error(503, {
				message: 'Authentication service is not available',
			});
		}

		return error(500, {
			message: 'Could not connect to authentication service',
		});
	}
};