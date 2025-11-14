import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { mockUserState } from '$lib/mocks/mockUserState';
import { mockUserMe } from '$lib/mocks/mockUserMe';

export const load: PageServerLoad = async ({ locals, fetch }) => {
  // ************** Development mode with mock data ****************
  // if (dev) {
  //   console.log(`Inside Dashboard Locals\n
  //     userMe: ${JSON.stringify(mockUserMe)}\n
  //     userFull: ${JSON.stringify(mockUserState)}`);
  //   locals.userFull = mockUserState;
  //   return { userFull: mockUserState };
  // }

  // ************** If the user is not logged in, redirect to login ****************
  if (!locals.user) throw redirect(303, '/login');

  // ************** Fetch full user data from internal API route ****************
  try {
    const response = await fetch('/app/graduate/api/full-user', {
      method: 'GET',
      credentials: 'include'
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      console.error('Failed to fetch full user:', errorData);
      throw error(response.status, errorData.error || 'Failed to load profile');
    }

    const userFull = await response.json();

    locals.userFull = userFull;

    console.log('User full data loaded successfully');

    return { userFull };
  } catch (err: any) {
    console.error('Error loading user profile:', err);
    throw error(500, err.message || 'Failed to load profile');
  }
};