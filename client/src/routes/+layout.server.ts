// import type { LayoutServerLoad } from './$types';
// When we handle auth, this will update the auth store.

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
    // `locals.user` was securely populated by the `hooks.server.ts` file.
    // just pass it along to the client-side layout.
    return {
        user: locals.user
    };
};