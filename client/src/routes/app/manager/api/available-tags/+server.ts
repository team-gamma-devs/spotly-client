import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { BACKEND_URL } from '$env/static/private';
import { signedGetFetch, signRequest } from '$lib/server/authFetch';
import { dev } from '$app/environment';

export const GET: RequestHandler = async ({ cookies }) => {
  try {
    const token = cookies.get('access_token');
    if (!dev) {
      if (!token) {
        return json(
          { error: 'Not authenticated' },
          { status: 401 }
        );
      }
    }

    const response = await signedGetFetch(`${BACKEND_URL}/manager/filters`, {}, token);

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      console.error('Backend error:', response.status, errorText);
      return json(
        { error: `Failed to fetch tags: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    return json(data);
  } catch (error: any) {
    console.error('Error fetching available tags:', error);
    return json(
      { error: error.message || 'Failed to fetch tags' },
      { status: 500 }
    );
  }
};