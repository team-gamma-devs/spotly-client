import { json } from '@sveltejs/kit';
import { signedJsonFetch } from '$lib/server/authFetch';
import { BACKEND_URL } from '$env/static/private';
import type { RequestHandler } from './$types';
import { dev } from '$app/environment';

export const POST: RequestHandler = async ({ request, cookies }) => {
  const token = cookies.get('access_token');

  if (!dev && !token) {
    return json(
      { error: 'Not authenticated' },
      { status: 401 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }

  const { graduatedId, annotation } = body;

  if (!annotation || typeof annotation !== 'string') {
    return json(
      { error: 'Annotation is required' },
      { status: 400 }
    );
  }

  if (annotation.trim().length === 0) {
    return json(
      { error: 'Annotation cannot be empty' },
      { status: 400 }
    );
  }

  if (annotation.length > 300) {
    return json(
      { error: 'Annotation must be 300 characters or less' },
      { status: 400 }
    );
  }

  if (!graduatedId || typeof graduatedId !== 'string') {
    return json(
      { error: 'Graduate ID is required' },
      { status: 400 }
    );
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
      let errorMessage = 'Failed to add annotation';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.detail || errorMessage;
      } catch {
        errorMessage = `Failed to add annotation (HTTP ${response.status})`;
      }

      console.error('Backend error adding annotation:', {
        status: response.status,
        message: errorMessage
      });

      return json(
        { error: errorMessage },
        { status: response.status }
      );
    }

    const result = await response.json();
    console.log('Annotation added successfully:', result);

    return json({ success: true, data: result }, { status: 201 });
  } catch (err: any) {
    console.error('Error adding annotation:', err);

    return json(
      { error: 'An error occurred while adding the annotation' },
      { status: 500 }
    );
  }
};