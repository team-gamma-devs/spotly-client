// This file routes/app/manager/api/graduate-invitations/[id]/+server.ts

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { signedJsonFetch } from '$lib/server/authFetch';
import { dev } from '$app/environment';
import { BACKEND_URL } from '$env/static/private';

export const DELETE: RequestHandler = async ({ params, cookies }) => {
	try {
		const token = cookies.get('access_token');
		
		if (!dev) {
			if (!token) {
				return json(
					{ error: 'Not authenticated' },
					{ status: 401 }
				);
			}
		}

		const { id } = params;
		
		if (!id) {
			return json(
				{ error: 'Invitation ID is required' },
				{ status: 400 }
			);
		}

		const backendUrl = `${BACKEND_URL}/manager/invitation/${id}`;
		
		const response = await signedJsonFetch(
			backendUrl,
			{
				method: 'DELETE'
			},
			token
		);

		if (response.ok || response.status === 204) {
			return json({ success: true }, { status: 200 });
		}

		let errorDetail = 'Failed to delete invitation';


		try {
			const errorData = await response.json();
			errorDetail = errorData.detail || errorDetail;
		} catch {
		}

		console.error('Backend API error:', response.status, response.statusText);
		return json(
			{ error: errorDetail, status: response.status },
			{ status: response.status }
		);

	} catch (error) {
		console.error('Error deleting invitation:', error);
		return json(
			{ 
				error: 'Internal server error', 
				message: error instanceof Error ? error.message : 'Unknown error' 
			},
			{ status: 500 }
		);
	}
};