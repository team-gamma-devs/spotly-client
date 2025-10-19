import type { Handle } from '@sveltejs/kit';
import { BACKEND_URL } from '$env/static/private';
import { signedJsonFetch } from '$lib/server/authFetch';

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

    // ************** DEVELOPMENT *******************
    if (dev) {
        event.locals.user = {
            _id: "dev-user-123",
            first_name: "Pepe",
            last_name: "Pelotas",
            email: "pepe@pelotas.com",
            avatar_url: "pfp-fallback.svg",
            cohort: 23,
            github_info: "",
            cv_info: "",
            tutors_feedback: [""],
            tech_stack: ["react", "mongodb", "pepe", "tailwind"],
            role: "manager",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        }
        return resolve(event);
    }

    const sessionToken = event.cookies.get('spotly_session');

    if (!sessionToken) {
        event.locals.user = null;
        return resolve(event);
    }

    try {
        const response = await signedJsonFetch(`${BACKEND_URL}/auth/me`, {
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