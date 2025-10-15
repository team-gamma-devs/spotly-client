// import type { LayoutServerLoad } from './$types';
// When we handle auth, this will update the auth store.

import type { LayoutServerLoad } from './$types';

/**
 * This function runs on the server for every single page load.
 * It's the single source of truth for the user's session.
 */
export const load: LayoutServerLoad = async ({ cookies }) => {
    // We'll use a simple session cookie. In a real app, you'd verify this
    // against your database or by decoding a JWT.
    const userSession = cookies.get('spotly_session');

    if (!userSession) {
        // If there's no cookie, they are not authenticated.
        return {
            isAuthenticated: false,
            userRole: null
        };
    }

    // must ask fede what he's gonna use to store the session creds.
    // For now i'll parse a simple string, the cookie must contain the role.
    const { role } = JSON.parse(userSession); 

    return {
        isAuthenticated: true,
        userRole: role // graduate or manager.
    };
};