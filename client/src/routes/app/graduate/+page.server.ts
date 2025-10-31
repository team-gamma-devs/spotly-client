import type { PageServerLoad } from './$types';
import { BACKEND_URL } from '$env/static/private';
import { signedJsonFetch } from '$lib/server/authFetch';
import { error, redirect } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { mockUserState } from '$lib/mocks/mockUserState';
import { mockUserMe } from '$lib/mocks/mockUserMe';

export const load: PageServerLoad = async ({ locals, cookies }) => {
  // ************** If the user is not logged in, redirect to login ****************
  if (dev) {
    console.log(`Inside Dashboard Locals\n
      userMe: ${JSON.stringify(mockUserMe)}\n
      userFull: ${JSON.stringify(mockUserState)}`);
    locals.userFull = mockUserState;
    return { userFull: mockUserState };
  }

  if (!locals.user) throw redirect(303, '/login');

	const jwtToken = cookies.get('access_token');
  // ************** If the JWT token is not found, redirect to login ****************
	if (!jwtToken) throw redirect(303, '/login');

  // ************** otherwise get the full user from the backend ****************
	const response = await signedJsonFetch(`${BACKEND_URL}/auth/me/full_user`, {
		method: 'GET',
		headers: { Authorization: `Bearer ${jwtToken}` }
	});

	if (!response.ok) throw error(response.status, 'Failed to load profile');

	const userFull = await response.json();
	locals.userFull = userFull; // Store in locals so root layout can access it

	return { userFull };
};