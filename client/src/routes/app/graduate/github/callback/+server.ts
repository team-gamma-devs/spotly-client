import { redirect, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { CLIENT_SECRET, CLIENT_ID } from '$env/static/private';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');
	const errorParam = url.searchParams.get('error');
	const errorDescription = url.searchParams.get('error_description');

	// Validate state for CSRF protection
	if (state !== 'random_state_string') {
		return redirect(
			302,
			'/app/graduate/github/result?success=false&error=invalid_state&message=Invalid+state+parameter'
		);
	}

	// Handle GitHub OAuth errors
	if (errorParam) {
		console.error(`GitHub OAuth Error: ${errorParam}`);
		console.error(`Error Description: ${errorDescription}`);

		const errorMessages: Record<string, string> = {
			access_denied:
				'You cancelled the GitHub authorization. Please try again if you want to continue.',
			incorrect_client_credentials:
				'GitHub app configuration error. Please contact support.',
			redirect_uri_mismatch: 'Configuration error. Please contact support.',
			bad_verification_code: 'Authorization expired. Please try logging in again.'
		};

		const userMessage =
			errorMessages[errorParam] || `GitHub authorization failed: ${errorDescription}`;

		return redirect(
			302,
			`/app/graduate/github/result?success=false&error=${errorParam}&message=${userMessage.replace(/ /g, '+')}`
		);
	}

	// Ensure code is present
	if (!code) {
		console.error('Code not found!');
		return redirect(
			302,
			'/app/graduate/github/result?success=false&error=no_code&message=Authorization+code+not+found'
		);
	}

	try {
		// Exchange code for access token
		const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				client_id: CLIENT_ID,
				client_secret: CLIENT_SECRET,
				code: code
			})
		});

		if (!tokenResponse.ok) {
			const responseText = await tokenResponse.text();
			console.error(`Failed HTTP request: ${responseText}`);
			return redirect(
				302,
				'/app/graduate/github/result?success=false&error=token_error&message=Failed+to+exchange+code'
			);
		}

		const tokenData = await tokenResponse.json();
		const accessToken = tokenData.access_token;

		if (!accessToken) {
			console.error('Access token not found in response');
			return redirect(
				302,
				'/app/graduate/github/result?success=false&error=no_token&message=Access+token+not+found'
			);
		}

		// Get user information
		const userResponse = await fetch('https://api.github.com/user', {
			headers: {
				Authorization: `token ${accessToken}`,
				Accept: 'application/json'
			}
		});

		if (!userResponse.ok) {
			console.error("Couldn't get user info");
			return redirect(
				302,
				'/app/graduate/github/result?success=false&error=user_info_error&message=Could+not+retrieve+user+info'
			);
		}

		const userData = await userResponse.json();
		const username = userData.login;

		console.log(`Successfully authenticated user: ${username}`);

		// Store the access token and username in httpOnly cookies for security
		cookies.set('github_token', accessToken, {
			path: '/',
			httpOnly: true,
			secure: false, // Set to true in production with HTTPS
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 30 // 30 days
		});

		cookies.set('github_username', username, {
			path: '/',
			httpOnly: false, // Can be read by client
			secure: false, // Set to true in production
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 30 // 30 days
		});

		// Redirect to success page with username
		throw redirect(302, `/app/graduate/github/result?success=true&username=${username}`);
	} catch (err) {
		// Re-throw SvelteKit redirects
		if (err && typeof err === 'object' && 'status' in err && 'location' in err) {
			throw err;
		}
		
		console.error(`Unexpected error during authentication:`, err);
		throw redirect(
			302,
			'/app/graduate/github/result?success=false&error=server_error&message=An+unexpected+error+occurred'
		);
	}
};