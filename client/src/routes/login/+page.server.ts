// You can invoke this action in the same route or from other pages using:
// <form method="POST" action="/login">

import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';
import { BACKEND_URL } from '$env/static/private';
import { authenticatedFetch } from '$lib/server/authFetch';


/**
 * Defines the form actions available for the login page.
 * The default action handles the user authentication request.
 * @type {Actions}
 */
export const actions: Actions = {
    /**
     * Handles the login form submission.
     * 1. Validates the email.
     * 2. Calls the backend authentication endpoint.
     * 3. On success, sets an HTTP-only session cookie.
     * 4. Redirects the user to the main application page.
     *
     * @param {object} context - The SvelteKit action context.
     * @param {Request} context.request - The incoming request object, used to get form data.
     * @param {Cookies} context.cookies - The cookies object for setting the session.
     * @returns {Promise<import('@sveltejs/kit').ActionFailure | void>} A failure response on error, otherwise sets a cookie and throws a redirect.
     */
    default: async ({ request, cookies }) => {
        const form = await request.formData();
        const email = form.get('email');

        if (!email || typeof email !== 'string') {
            return fail(400, { error: 'A valid email is required.' });
        }

        let accessToken: string;

        try {
            const body = { email };
            const response = await authenticatedFetch(`${BACKEND_URL}/auth/login`, {
                method: "POST",
                body: JSON.stringify(body),
            })

            if (!response.ok) {
                const errorData = await response.json();
                return fail(response.status, { error: errorData.detail || 'Login failed.' });
            }

            const loginData = await response.json();
            accessToken = loginData.access_token;

        } catch (error: any) {
            console.error("Error calling login endpoint:", error);

            if (error.cause?.code === "ECONNREFUSED") {
                return fail(503, {
                    error: "Authentication service is not available."
                })
            }
            return fail(500, { error: 'Could not connect to authentication service.' });
        }
        cookies.set('spotly_session', accessToken, {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // pnpm handles env with pnpm dev | run build, how delightful!!!
            maxAge: 60 * 60 * 24 * 7,
            sameSite: 'lax'
        });

        throw redirect(303, '/app/');
    }
};


