// import { redirect } from '@sveltejs/kit';
// import type { Actions } from '@sveltejs/kit';

// NOTE: In Dev it will always inject the user.

// This endpoint handles the POST request from our logout form.
// No need to clear the event.local.user because the server hook already cleans up the session if no cookie found
// POST /logout
// → Delete cookie
// → Redirect to /
// → New GET / request
// → handle hook runs
// → No cookie found
// → event.locals.user = null

import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';
import type { Actions } from './$types';
import { supabase } from '$lib/supabaseClient';

export const actions: Actions = {
	default: async ({ cookies }) => {
		cookies.delete('access_token', { path: '/' });
		cookies.delete('refresh_token', { path: '/' });
		cookies.delete('github_token', { path: '/' });
		cookies.delete('github_username', { path: '/' });
		supabase.auth.signOut();

		console.log('Goodbye...');

		throw redirect(303, '/login');
	}
};
