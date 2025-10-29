import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { BACKEND_URL } from '$env/static/private';
import { signedJsonFetch } from '$lib/server/authFetch';
import type { UserState } from '../../../../ambient';

export const POST: RequestHandler = async ({ request, cookies }) => {
  const { access_token, refresh_token } = await request.json();

  try {
    const response = await signedJsonFetch(`${BACKEND_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });

    const userData: UserState = await response.json();

    cookies.set('access_token', access_token, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 // 1 hour
    });

    cookies.set('refresh_token', refresh_token, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30 // 30 days
    });

    return json(userData);
  } catch (error) {
    console.error('Error:', error);
    return json({ error: 'Failed to complete authentication' }, { status: 400 });
  }
};