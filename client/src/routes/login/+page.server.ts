import { fail, redirect,  } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';
import { BACKEND_URL } from '$env/static/private';
import { signedJsonFetch } from '$lib/server/authFetch';

/**
 * Defines the form actions available for the login page.
 */
export const actions: Actions = {
	/**
	 * Handles the login form submission.
	 * 1. Validates the email.
	 * 2. Calls the backend authentication endpoint.
	 * 3. Checks for an `isFirstTime` flag in the response.
	 * 4. If `isFirstTime` is true:
	 *    - Redirects to the CV upload page with a temporary signup token.
	 * 5. If `isFirstTime` is false:
	 *    - Sets a secure, HttpOnly session cookie with the JWT.
	 *    - Redirects the user to their dashboard.
	 */
	login: async ({ request, cookies }) => {
		const form = await request.formData();
		const email = form.get('email');

		console.log("THIS IS THE EMAIL: " + email);

		if (!email || typeof email !== 'string') {
			return fail(400, { error: 'A valid email is required.' });
		}

		try {
			const body = { email };

			const response = await signedJsonFetch(`${BACKEND_URL}/auth/login`, {
				method: 'POST',
				body: JSON.stringify(body),
			});

			console.log(`THIS IS THE RESPONSE: ${JSON.stringify(response)}`);

			if (!response.ok) {
				const errorData = await response.json();
				return fail(response.status, { error: errorData.detail || 'Login failed.' });
			} else {
						return { success: true, msg: `Access link sent to: ${email}` };
			}

			

			// if (loginData.isFirstTime) {
			// 	const signupToken = loginData.signup_token;
			// 	if (!signupToken) {
			// 		return fail(500, { error: 'Signup token was not provided for a new user.' });
			// 	}
			// 	throw redirect(303, `/app/graduate/upload_cv?token=${signupToken}`);
			// } else {
			// 	const accessToken = loginData.access_token;
			// 	if (!accessToken) {
			// 		return fail(500, { error: 'Access token was not provided for an existing user.' });
			// 	}

			// 	cookies.set('spotly_session', accessToken, {
			// 		path: '/',
			// 		httpOnly: true,
			// 		secure: process.env.NODE_ENV === 'production', // pnpm handles env with pnpm dev | run build, how delightful!!!
			// 		maxAge: 60 * 60 * 24 * 7, // 1 week
			// 		sameSite: 'lax',
			// 	});

			// 	throw redirect(303, '/app/graduate');
			// }

		} catch (error: any) {
			console.error('Error calling login endpoint:', error);

			if (error.cause?.code === 'ECONNREFUSED') {
				return fail(503, {
					error: 'Authentication service is not available.',
				});
			}
			return fail(500, { error: 'Could not connect to authentication service.' });
		}
	},
};
