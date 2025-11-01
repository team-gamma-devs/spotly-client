import { fail } from '@sveltejs/kit';
import { signedJsonFetch } from '$lib/server/authFetch';
import { BACKEND_URL } from '$env/static/private';
import type { Actions } from './$types';
import { dev } from '$app/environment';

export const actions = {
	// This form is located in manager/GraduateCard.svelte
	addAnnotation: async ({ request, locals }) => {

		const formData = await request.formData();
		const graduatedId = formData.get('graduatedId');
		const annotation = formData.get('annotation');

		if (dev) {
			console.log('Form data received:', { graduatedId, annotation });
		}

		if (!annotation || typeof annotation !== 'string') {
			console.warn('Validation failed: Annotation is required');
			return fail(400, { error: 'Annotation is required' });
		}

		if (annotation.trim().length === 0) {
			console.warn('Validation failed: Annotation cannot be empty');
			return fail(400, { error: 'Annotation cannot be empty' });
		}

		if (annotation.length > 300) {
			console.warn('Validation failed: Annotation too long');
			return fail(400, { error: 'Annotation must be 300 characters or less' });
		}

		if (!graduatedId || typeof graduatedId !== 'string') {
			console.warn('Validation failed: Graduate ID is required');
			return fail(400, { error: 'Graduate ID is required' });
		}

		const authorId = locals.user?.id;
		if (!authorId) {
			console.warn('Validation failed: User not authenticated');
			return fail(401, { error: 'User not authenticated' });
		}

		const requestBody = {
			graduatedId,
			authorId,
			annotation: annotation.trim(),
		};

		if (dev) {
			console.log('Validation passed');
			console.log('User ID:', authorId);
			console.log('Backend URL:', BACKEND_URL);
			console.log('Request body:', requestBody);
		}
		try {
			const response = await signedJsonFetch(`${BACKEND_URL}/manager/feedback`, {
				method: 'POST',
				body: JSON.stringify(requestBody),
			});

			if (dev) {
				console.log('Response status:', response.status);
				console.log('Response ok:', response.ok);
			}

			if (!response.ok) {
				let errorData;
				try {
					errorData = await response.json();
					console.error('Error response data:', JSON.stringify(errorData));
				} catch (e) {
					console.error('Could not parse error response as JSON');
					errorData = {};
				}

				return fail(response.status, {
					error: errorData.message || 'Failed to add annotation'
				});
			}
			return { success: true };

		} catch (error) {
			console.error('Error details:', error);
			console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
			return fail(500, { error: 'An error occurred while adding the annotation' });
		}
	},
} satisfies Actions;