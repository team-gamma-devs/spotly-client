import type { Handle } from '@sveltejs/kit';
import { BACKEND_URL } from '$env/static/private';
import { signedGetFetch, signedJsonFetch } from '$lib/server/authFetch';
import { supabase } from '$lib/services/supabaseClient';
import { mockUserMe } from '$lib/mocks/mockUserMe';
import type { UserMe } from '$lib/types/userMe';
import { dev } from '$app/environment';
import { mockUserState } from '$lib/mocks/mockUserState';

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
	// if (dev) {
	// 	event.locals.user = mockUserMe;
	// 	event.locals.userFull = null; // userFull is only fetched on dashboard pages
	// 	console.log("token: " + sessionToken);
	// 	console.log('[Inside Hook] Using mock user: ' + JSON.stringify(event.locals.user));
	// 	return resolve(event);
	// }

	if (!sessionToken) {
		event.locals.user = null;
		event.locals.userFull = null;
		return resolve(event);
	}

	try {
		console.log('Validating session with backend...');
		const response = await signedGetFetch(`${BACKEND_URL}/auth/me`, {}, sessionToken);

		if (response.ok) {
			const user: UserMe = await response.json();
			event.locals.user = user;
			event.locals.userFull = null; // userFull is only fetched on dashboard pages
		} else {
			console.error('Error in backend authentication response, Contact backend support.');
			event.locals.user = null;
			event.locals.userFull = null;
			supabase.auth.signOut();
			event.cookies.delete('access_token', { path: '/' });
			event.cookies.delete('refresh_token', { path: '/' });
			event.cookies.delete('github_token', { path: '/' });
			event.cookies.delete('github_username', { path: '/' });
		}
	} catch (error) {
		console.error('Error validating session with backend:', error);
		event.locals.user = null;
		event.locals.userFull = null;
		supabase.auth.signOut();
		event.cookies.delete('access_token', { path: '/' });
		event.cookies.delete('refresh_token', { path: '/' });
		event.cookies.delete('github_token', { path: '/' });
		event.cookies.delete('github_username', { path: '/' });
	}
	return resolve(event);
};
