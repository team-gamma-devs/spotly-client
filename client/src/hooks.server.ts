import type { Handle } from '@sveltejs/kit';
import { BACKEND_URL } from '$env/static/private';
import { signedJsonFetch } from '$lib/server/authFetch';
import { mockUserState } from './lib/mocks/mockUserState';
import { supabase } from '$lib/supabaseClient';
import type { UserAuthMe } from '$lib/mocks/mockUserMe';

import { dev } from '$app/environment';

/**
 * Global SvelteKit Server Hook for session validation.
 *
 * This function executes on every server request to:
 * 1. Bypass authentication in development mode with a mock user.
 * 2. Check for the 'spotly_session' cookie.
 * 3. Validate the session token against the backend's /auth/me endpoint.
 * 4. Populate event.locals.user with the authenticated user data or null.
 * 5. Clean up expired/invalid cookies.
 *
 * @param {object} context - The SvelteKit hook context.
 * @param {import('@sveltejs/kit').RequestEvent} context.event - The current request event, containing cookies and locals.
 * @param {function} context.resolve - The function to continue processing the request through the SvelteKit middleware chain.
 * @returns {Promise<import('@sveltejs/kit').Response>} The resolved response object.
 */
export const handle: Handle = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get('access_token');
	// ************** DEVELOPMENT *******************
	if (dev) {
		event.locals.user = mockUserState;
		return resolve(event);
	}

	if (!sessionToken) {
		event.locals.user = null;
		return resolve(event);
	}

	try {
		const response = await signedJsonFetch(`${BACKEND_URL}/auth/me`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${sessionToken}`,
			},
		});

		if (response.ok) {
			const user: UserAuthMe = await response.json();
			event.locals.user = user;
		} else {
			// Sync this with logout/+page.server.ts
			console.error('Error in backend authentication response, Contact backend support.');
			event.locals.user = null;
			supabase.auth.signOut();
			event.cookies.delete('access_token', { path: '/' });
			event.cookies.delete('refresh_token', { path: '/' });
			event.cookies.delete('github_token', { path: '/' });
			event.cookies.delete('github_username', { path: '/' });
		}
	} catch (error) {
		console.error('Error validating session with backend:', error);
		event.locals.user = null;
		supabase.auth.signOut();
		event.cookies.delete('access_token', { path: '/' });
		event.cookies.delete('refresh_token', { path: '/' });
		event.cookies.delete('github_token', { path: '/' });
		event.cookies.delete('github_username', { path: '/' });
	}
	return resolve(event);
};
