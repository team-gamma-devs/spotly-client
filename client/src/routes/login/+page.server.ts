// This file: client/src/routes/login/+page.server.ts

import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	/**
	 * Handles the login form submission.
	 * Calls the internal API endpoint which handles backend communication.
	 */
	login: async ({ request, fetch }) => {
		const formData = await request.formData();
		const email = formData.get('email');

		try {
			const response = await fetch('/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				return fail(response.status, {
					error: errorData.message || 'Login failed',
				});
			}

			const data = await response.json();
			
			return {
				success: true,
				msg: data.message || `Access link sent to: ${email}`,
			};

		} catch (error) {
			console.error('Error during login:', error);
			return fail(500, {
				error: 'An unexpected error occurred during login',
			});
		}
	},
};