import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { CLIENT_ID, REDIRECT_URI } from '$env/static/private';

/**
 * @module routes/app/graduate/github/authorize
 * @description
 * SvelteKit endpoint that initiates the GitHub OAuth authorization flow.
 * 
 * When a user accesses this route, they are redirected to GitHub’s OAuth authorization page
 * where they can grant the requested permissions. After authorization, GitHub will redirect
 * the user back to the `REDIRECT_URI` with an authorization code.
 *
 * The `state` parameter is included to prevent CSRF attacks by verifying it during the callback phase.
 */

/**
 * GitHub OAuth Authorization Handler.
 *
 * @type {RequestHandler}
 * @throws {import('@sveltejs/kit').Redirect} Redirects the user to GitHub’s OAuth URL (HTTP 302).
 * @returns {never} This function never returns directly; it always throws a redirect.
 */
export const GET: RequestHandler = async () => {
  /** 
   * Scopes requested from GitHub. These define the permissions the app will have
   * once the user authorizes it. Scopes are typically configured in the GitHub app,
   * but are included here for redundancy.
   */
  const scopes: string = ['read:user', 'user:email', 'repo'].join(' ');

  /**
   * Construct the GitHub OAuth authorization URL with required query parameters.
   */
  const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');

  githubAuthUrl.searchParams.set('client_id', CLIENT_ID);
  githubAuthUrl.searchParams.set('redirect_uri', REDIRECT_URI);
  githubAuthUrl.searchParams.set('scope', scopes);
  githubAuthUrl.searchParams.set('state', crypto.randomUUID());

  throw redirect(302, githubAuthUrl.toString());
};
