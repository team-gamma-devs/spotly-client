// This file: client/src/routes/app/manager/api/add-annotation/+server.ts

import { json, error } from '@sveltejs/kit';
import { signedJsonFetch } from '$lib/server/authFetch';
import { BACKEND_URL } from '$env/static/private';
import type { RequestHandler } from './$types';
import { dev } from '$app/environment';

export const POST: RequestHandler = async ({ request, cookies }) => {
  const token = cookies.get('access_token');
  if (!dev) {
    if (!token) {
      return json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return error(400, { message: 'Invalid request body' });
  }

  const { graduatedId, annotation } = body;

  if (!annotation || typeof annotation !== 'string') {
    return error(400, { message: 'Annotation is required' });
  }

  if (annotation.trim().length === 0) {
    return error(400, { message: 'Annotation cannot be empty' });
  }

  if (annotation.length > 300) {
    return error(400, { message: 'Annotation must be 300 characters or less' });
  }

  if (!graduatedId || typeof graduatedId !== 'string') {
    return error(400, { message: 'Graduate ID is required' });
  }

  const requestBody = {
    graduatedId,
    annotation: annotation.trim(),
  };

  try {
    const response = await signedJsonFetch(
      `${BACKEND_URL}/manager/feedback`,
      {
        method: 'POST',
        body: JSON.stringify(requestBody),
      },
      token
    );

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: 'Failed to add annotation' };
      }

      return error(response.status, {
        message: errorData.message || 'Failed to add annotation',
      });
    }

    return json({ success: true });
  } catch (err) {
    console.error('Error adding annotation:', err);
    return error(500, { message: 'An error occurred while adding the annotation' });
  }
};