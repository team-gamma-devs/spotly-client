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