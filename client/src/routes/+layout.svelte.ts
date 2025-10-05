// import type { LayoutServerLoad } from './$types';
// When we handle auth, this will update the auth store.

// export const load: LayoutServerLoad = async ({ cookies }) => {
//     // read your session cookie / token name (adjust to your auth)
//     const token = cookies.get('session') ?? cookies.get('auth_token');
//     // TODO: verify token server-side (DB / auth service) for real apps
//     const isAuthenticated = Boolean(token); <- this will use the store-based auth so components can subscribe to it.

//     return { isAuthenticated };
// };