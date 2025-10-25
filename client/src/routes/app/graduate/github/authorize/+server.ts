import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { CLIENT_ID, REDIRECT_URI } from '$env/static/private';

export const GET: RequestHandler = async () => {
  // Add the required scopes for GitHub API access
  const scopes = [
    'read:user',      // Read user profile data
    'user:email',     // Read user email addresses  
    'repo'            // Access to repositories (both public and private)
  ].join(' ');

  const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
  githubAuthUrl.searchParams.set('client_id', CLIENT_ID);
  githubAuthUrl.searchParams.set('redirect_uri', REDIRECT_URI);
  githubAuthUrl.searchParams.set('scope', scopes);
  githubAuthUrl.searchParams.set('state', crypto.randomUUID()); // CSRF protection

  throw redirect(302, githubAuthUrl.toString());
};