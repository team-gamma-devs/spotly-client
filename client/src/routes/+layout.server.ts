// import type { LayoutServerLoad } from './$types';
// When we handle auth, this will update the auth store.
import type { LayoutServerLoad } from './$types';

/**
 * Server-side load function for the root layout.
 *
 * This function retrieves the user object from `event.locals` (which was
 * populated during the authentication check in hooks.server.ts) and passes it
 * to the client-side layout component. This ensures the user's authentication
 * status is available globally across the application.
 *
 * @param {object} context - The SvelteKit load context.
 * @param {object} context.locals - The server-side locals object, containing the `user` data.
 * @param {object} context.cookies - The cookies object to check for GitHub authentication.
 * @returns {Promise<{ user: any; githubUsername: string | null }>} An object containing the user data and GitHub username.
 */
export const load: LayoutServerLoad = async ({ locals, cookies }) => {
	const githubUsername = cookies.get('github_username');
	
	return {
		user: locals.user,
		githubUsername: githubUsername || null,
	};
};
