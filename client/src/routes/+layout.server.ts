// import type { LayoutServerLoad } from './$types';
// When we handle auth, this will update the auth store.
import type { LayoutServerLoad } from './$types';

/**
 * Server-side load function for the root layout.
 *
 * It makes everything returned available globally.
 *
 * @param {object} context - The SvelteKit load context.
 * @param {object} context.locals - The server-side locals object, containing the `user` data.
 * @param {object} context.cookies - The cookies object to check for GitHub authentication.
 * @returns {Promise<{ user: any; githubUsername: string | null }>} An object containing the user data and GitHub username.
 */

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
  const githubUsername = cookies.get('github_username');
  
  return {
    user: locals.user, // Basic user data for the server hook to ensure auth state.
    userFull: locals.userFull || null, // Full user data is only fetched on dashboard pages, null elsewhere.
    githubUsername: githubUsername || null, // if the user has connected its github account.
  };
};
