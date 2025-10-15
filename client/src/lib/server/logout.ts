import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

// This endpoint handles the POST request from our logout form.
export const POST: RequestHandler = async ({ cookies }) => {
    cookies.delete('spotly_session', { path: '/' });
    throw redirect(303, '/');
};