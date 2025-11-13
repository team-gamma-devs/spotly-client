// This file routes/app/manager/api/graduate-invitations/+server.ts

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { signedJsonFetch } from '$lib/server/authFetch';
import { dev } from '$app/environment';
import { BACKEND_URL } from '$env/static/private';

export const POST: RequestHandler = async ({ url, request, cookies }) => {
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
    
    const page = url.searchParams.get('page') || '1';
    const pageSize = url.searchParams.get('pageSize') || '20';
    
    let searchTerm = {};
    try {
      searchTerm = await request.json();
    } catch {
      searchTerm = {};
    }
    
    const backendUrl = `${BACKEND_URL}/manager/invitations?page=${page}&pageSize=${pageSize}`;
    
    const response = await signedJsonFetch(
      backendUrl,
      {
        method: 'POST',
        body: JSON.stringify(searchTerm)
      },
      token
    );

    if (!response.ok) {
      console.error('Backend API error:', response.status, response.statusText);
      return json(
        { error: 'Failed to fetch graduate invitations', status: response.status },
        { status: response.status }
      );
    }

    const data = await response.json();
    return json(data);
  } catch (error) {
    console.error('Error fetching graduate invitations:', error);
    return json(
      { error: 'Internal server error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
};