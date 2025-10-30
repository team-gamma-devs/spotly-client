import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { BACKEND_URL } from '$env/static/private';
import { signRequest } from '$lib/server/authFetch';

export const GET: RequestHandler = async ({ cookies }) => {
  try {
    const token = cookies.get('access_token');
    
    // if (!token) {
    //   return json(
    //     { error: 'Not authenticated' },
    //     { status: 401 }
    //   );
    // }

    const timestamp = Date.now().toString();
    const signature = signRequest('', Number(timestamp));
  
    // console.log(`
    //   method: 'GET',
    //   headers: {
    //     'X-Signature': ${signature},
    //     'X-Timestamp': ${timestamp},
    //     'X-Frontend-Origin': 'vercel-spotly-client',
    //     'Authorization': 'Bearer ${token}'
    //   }`)

    const response = await fetch(`${BACKEND_URL}/manager/filters`, {
      method: 'GET',
      headers: {
        'X-Signature': signature,
        'X-Timestamp': timestamp,
        'X-Frontend-Origin': 'vercel-spotly-client',
        'Authorization': `Bearer ${token}` // Add the user's session token
      }
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      console.error('Backend error:', response.status, errorText);
      return json(
        { error: `Failed to fetch tags: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // console.log('Fetched available tags:', data);
    
    return json(data);
  } catch (error: any) {
    console.error('Error fetching available tags:', error);
    return json(
      { error: error.message || 'Failed to fetch tags' },
      { status: 500 }
    );
  }
};