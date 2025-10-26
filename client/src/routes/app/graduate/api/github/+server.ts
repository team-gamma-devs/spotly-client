import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { fetchGithubData } from '$lib/server/githubFetch';

/**
 * @module routes/app/graduate/api/github
 * 
 * @description
 * Handles a GET request to retrieve authenticated GitHub user data
 * from the server-side using stored credentials (cookies).
 *
 * This endpoint acts as a proxy between the frontend and GitHub’s API.
 * It retrieves data securely using the user's stored GitHub token in cookies,
 * then returns the response as JSON with short-term caching to reduce API load.
 *
 * @function GET
 * @type {import('@sveltejs/kit').RequestHandler}
 *
 * @param {object} event - The SvelteKit request event.
 * @param {import('@sveltejs/kit').Cookies} event.cookies - Provides access to HTTP cookies for retrieving GitHub credentials.
 *
 * @returns {Promise<Response>} JSON response containing GitHub user data, or an error message with appropriate status code.
 *
 * @throws {Error} Returns a JSON error response if fetching GitHub data fails.
 *
 * @example
 * // Example request:
 * // GET /app/graduate/api/github
 *
 * // Successful response (status 200):
 * {
 *   "login": "pepepelotas",
 *   "id": 123456,
 *   "repos": [ ... ],
 *   "followers": 42
 * }
 *
 * // Error response (status 500):
 * {
 *   "error": "Failed to fetch GitHub data"
 * }
 */
export const GET: RequestHandler = async ({ cookies }) => {
  try {
    const githubData = await fetchGithubData(cookies);

    return json(githubData, {
      headers: {
        'Cache-Control': 'private, max-age=60' // Prevents public caching, returned data is a JSON with 1 min cache time.
      }
    });
  } catch (error: any) {
    const status = error?.status || 500;
    return json(
      { error: error?.message || 'Failed to fetch GitHub data' },
      { status }
    );
  }
};