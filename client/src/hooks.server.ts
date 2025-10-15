// import type { Handle } from '@sveltejs/kit';
// import { getUserFromRequest } from '$lib/server/auth';

// export const handle: Handle = async ({ event, resolve }) => {
//   // resolve user first then handle the font preload crap, don't throw on failure.
//   try {
//     event.locals.user = await getUserFromRequest(event);
//   } catch (e) {
//     console.warn('auth: failed to resolve user', e);
//     event.locals.user = null;
//   }

//   const response = await resolve(event, {
//     preload: ({ type }) => type === 'font'
//   });

//   return response;
// };

import type { Handle } from '@sveltejs/kit';
import { BACKEND_URL } from '$env/static/private';
import { authenticatedFetch } from '$lib/server/auth_req';

/**
 * This hook runs on every request to SvelteKit's server.
 * It's the central point for validating the user's session.
 */
export const handle: Handle = async ({ event, resolve }) => {
    // 1. Get the session token from the browser's cookie
    const sessionToken = event.cookies.get('spotly_session');

    if (!sessionToken) {
        // No token? They are not logged in.
        event.locals.user = null;
        return resolve(event);
    }

    // 2. Ask your FastAPI backend to validate the session token
    // This is a secure, server-to-server API call.
    try {
        // We use authenticatedFetch to sign this server-to-server request
        const response = await authenticatedFetch(`${BACKEND_URL}/auth/me`, {
            method: 'GET',
            // We pass the user's session token to the backend for validation
            headers: {
                'Authorization': `Bearer ${sessionToken}`
            }
        });

        if (response.ok) {
            const user = await response.json();
            event.locals.user = user; // The user is valid
        } else {
            // The backend said the token is invalid (expired, etc.)
            event.locals.user = null;
            event.cookies.delete('spotly_session', { path: '/' }); // Clean up bad cookie
        }
    } catch (error) {
        console.error("Error validating session with backend:", error);
        event.locals.user = null; // Treat as logged out for safety
    }

    // 3. Continue to the requested page, now with `event.locals.user` populated
    return resolve(event);
};