// This file client/src/routes/app/graduate/api/full-user/+server.ts

import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { BACKEND_URL } from '$env/static/private';
import { signedJsonFetch } from '$lib/server/authFetch';
import { mockUserState } from '$lib/mocks/mockUserState';
import { dev } from '$app/environment';

export const GET: RequestHandler = async ({ cookies }) => {
  try {
    const token = cookies.get('access_token');
    if (!dev) {
      if (!token) {
        return json({ error: 'Not authenticated' }, { status: 401 });
      }
    }
    // if (dev) {
    //   return json({ ...mockUserState });
    // }

    const response = await signedJsonFetch(
      `${BACKEND_URL}/auth/me/full_user`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      console.error('Backend error fetching full user:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });

      let errorMessage = 'Failed to fetch user data';
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.detail || errorData.message || errorMessage;
      } catch {
        errorMessage = errorText || errorMessage;
      }

      return json({ error: errorMessage }, { status: response.status });
    }

    const userFull = await response.json();

    console.log('Full user data fetched successfully');

    return json(userFull);
  } catch (error: any) {
    console.error('Error fetching full user:', error);
    return json(
      { error: error.message || 'An unexpected error occurred' },
      { status: 500 }
    );
  }
};