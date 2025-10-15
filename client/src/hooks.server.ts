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
import { authenticatedFetch } from '$lib/server/authFetch';

/**
 * This hook runs on every request to SvelteKit's server.
 * It's the central point for validating the user's session.
 */
export const handle: Handle = async ({ event, resolve }) => {
    const sessionToken = event.cookies.get('spotly_session');

    if (!sessionToken) {
        event.locals.user = null;
        return resolve(event);
    }

    try {
        const response = await authenticatedFetch(`${BACKEND_URL}/auth/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${sessionToken}`
            }
        });

        if (response.ok) {
            const user = await response.json();
            event.locals.user = user; // The user is valid
        } else {
            event.locals.user = null;
            event.cookies.delete('spotly_session', { path: '/' });
        }
    } catch (error) {
        console.error("Error validating session with backend:", error);
        event.locals.user = null;
    }
    return resolve(event);
};