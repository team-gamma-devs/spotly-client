// import { redirect } from '@sveltejs/kit';
// import type { RequestHandler } from '@sveltejs/kit';

// This endpoint handles the POST request from our logout form.
// Will probably be handled elsewhere
// No need to clear the event.local.user because the server hook already cleans up the session if no cookie found
// POST /logout 
// → Delete cookie 
// → Redirect to / 
// → New GET / request 
// → handle hook runs 
// → No cookie found 
// → event.locals.user = null
// export const POST: RequestHandler = async ({ cookies }) => {
//     cookies.delete('spotly_session', { path: '/' });
//     throw redirect(303, '/');
// };
