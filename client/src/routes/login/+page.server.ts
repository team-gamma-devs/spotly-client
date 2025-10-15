// You can invoke this action in the same route or from other pages using:
// <form method="POST" action="/login">

import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';
import { BACKEND_URL } from '$env/static/private';
import { authenticatedFetch } from '$lib/server/auth_req';

export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const form = await request.formData();
        const email = form.get('email');

        if (!email || typeof email !== 'string') {
            return fail(400, { error: 'A valid email is required.' });
        }

        let accessToken: string;

        try {
            const body = { email };
            const response = await authenticatedFetch(`${BACKEND_URL}/auth/`, {
                method: "POST",
                body: JSON.stringify(body),
            })

            if (!response.ok) {
                const errorData = await response.json();
                return fail(response.status, { error: errorData.detail || 'Login failed.' });
            }

            const loginData = await response.json();
            accessToken = loginData.access_token;

        } catch (error) {
            console.error("Error calling login endpoint:", error);
            return fail(500, { error: 'Could not connect to authentication service.' });
        }
        cookies.set('spotly_session', accessToken, {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // pnpm handles env with pnpm dev | run build, how delightful!!!
            maxAge: 60 * 60 * 24 * 7,
            sameSite: 'lax'
        });

        throw redirect(303, '/app/dashboard');
    }
};


