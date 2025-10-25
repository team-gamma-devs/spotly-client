import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { CLIENT_ID, REDIRECT_URI } from '$env/static/private';

export const GET: RequestHandler = async () => {
	const authUrl = new URL('https://github.com/login/oauth/authorize');
	authUrl.searchParams.set('client_id', CLIENT_ID);
	authUrl.searchParams.set('redirect_uri', REDIRECT_URI);
	authUrl.searchParams.set('scope', 'user:email read:user');
	authUrl.searchParams.set('state', 'random_state_string');

	return redirect(302, authUrl.toString());
};