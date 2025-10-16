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

import { dev } from '$app/environment';

/**
 * This hook runs on every request to SvelteKit's server.
 * It's the central point for validating the user's session.
 */
export const handle: Handle = async ({ event, resolve }) => {

    // ************** DEVELOPMENT *******************
    if (dev) {
        event.locals.user = {
            id: 'dev-user-123',
            full_name: 'Dev User',
            email: 'dev@example.com',
            role: 'manager',
            cohort: 15,
            token_state: true,
            log_state: true,
            created_at: new Date().toISOString(),
            expires_at: new Date().toISOString()
        };
        return resolve(event);
    }

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
            event.locals.user = user;
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