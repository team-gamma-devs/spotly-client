import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { CLIENT_ID, CLIENT_SECRET } from '$env/static/private';

/**
 * Handles the OAuth 2.0 callback from GitHub after the user authorizes the application.
 *
 * This endpoint exchanges the temporary `code` provided by GitHub for an access token,
 * retrieves the authenticated user's data from the GitHub API, and stores relevant information
 * in secure HTTP-only cookies for future authenticated requests.
 *
 * @module routes/app/graduate/github/callback
 * @function GET
 * @type {import('@sveltejs/kit').RequestHandler}
 *
 * @param {object} event - The SvelteKit request event.
 * @param {URL} event.url - The URL instance representing the current request.
 * @param {import('@sveltejs/kit').Cookies} event.cookies - Cookie management interface.
 *
 * @returns {Promise<Response | never>} Redirects to the result page depending on the outcome.
 *
 * @throws {Redirect} - Throws a redirect to `/app/graduate/github/result` with an appropriate query parameter
 * indicating success or the type of error encountered.
 *
 * @example
 * // Example redirect URL GitHub calls after user authorization:
 * // /api/github/callback?code=123456
 *
 * // On success, redirects to:
 * // /app/graduate/github/result?success=true
 *
 * // On failure, redirects to:
 * // /app/graduate/github/result?error=oauth_failed
 */
export const GET: RequestHandler = async ({ url, cookies }) => {
  const code = url.searchParams.get('code');

  if (!code) {
    return new Response('Missing authorization code', { status: 400 });
  }

  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code
      })
    });

    const tokenData = await tokenResponse.json();

    // DEBUG: log response
    // console.log('GitHub OAuth Token Response:', {
    //   hasAccessToken: !!tokenData.access_token,
    //   tokenType: tokenData.token_type,
    //   scope: tokenData.scope,
    //   tokenPreview: tokenData.access_token?.slice(0, 20) + '...',
    //   fullResponse: tokenData
    // });

    if (!tokenData.access_token) {
      console.error('No access token in response');
      throw redirect(303, '/app/graduate/github/result?error=no_token');
    }

    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    if (!userResponse.ok) {
      const errorText = await userResponse.text();
      console.error('Failed to fetch user info:', {
        status: userResponse.status,
        response: errorText
      });
      throw redirect(303, '/app/graduate/github/result?error=user_fetch_failed');
    }

    const userData = await userResponse.json();

    // DEBUG: Log basic user info
    // console.log('GitHub User Data:', {
    //   login: userData.login,
    //   id: userData.id
    // });

    cookies.set('github_token', tokenData.access_token, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30 // 30 days
    });

    cookies.set('github_username', userData.login, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30
    });

    // DEBUG: ookies are set?
    // console.log('Cookies set successfully:', {
    //   token: cookies.get('github_token')?.slice(0, 20) + '...',
    //   username: cookies.get('github_username')
    // });

    throw redirect(303, '/app/graduate/github/result?success=true');
  } catch (error: any) {
    console.error('GitHub OAuth callback error:', error);

    if (error.status === 303) throw error;
    throw redirect(303, '/app/graduate/github/result?error=oauth_failed');
  }
};
