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
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ cookies }) => {
    cookies.delete('spotly_session', { path: '/' });
    console.log("Deleting...")
    throw redirect(303, '/');
};