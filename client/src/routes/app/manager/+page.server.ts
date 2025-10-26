import { fail } from '@sveltejs/kit';
import { signedJsonFetch } from '$lib/server/authFetch';
import { BACKEND_URL } from '$env/static/private';
import type { Actions } from './$types';

export const actions = {
	addAnnotation: async ({ request, locals }) => {

		const formData = await request.formData();
		const graduated_id = formData.get('graduated_id');
		const annotation = formData.get('annotation');
		
		// console.log('Form data received:', { graduated_id, annotation });

		if (!annotation || typeof annotation !== 'string') {
			console.log('Validation failed: Annotation is required');
			return fail(400, { error: 'Annotation is required' });
		}

		if (annotation.trim().length === 0) {
			console.log('Validation failed: Annotation cannot be empty');
			return fail(400, { error: 'Annotation cannot be empty' });
		}

		if (annotation.length > 300) {
			console.log('Validation failed: Annotation too long');
			return fail(400, { error: 'Annotation must be 300 characters or less' });
		}

		if (!graduated_id || typeof graduated_id !== 'string') {
			console.log('Validation failed: Graduate ID is required');
			return fail(400, { error: 'Graduate ID is required' });
		}

		const author_id = locals.user.id;
		if (!author_id) {
			console.log('Validation failed: User not authenticated');
			return fail(401, { error: 'User not authenticated' });
		}



		const requestBody = {
			graduated_id,
			author_id,
			annotation: annotation.trim(),
		};
		// console.log('Validation passed');
		// console.log('User ID:', author_id);
		// console.log('Backend URL:', BACKEND_URL);
		// console.log('Request body:', requestBody);

		try {		
			const response = await signedJsonFetch(`${BACKEND_URL}/feedback`, {
				method: 'POST',
				body: JSON.stringify(requestBody),
			});

			// console.log('Response status:', response.status);
			// console.log('Response ok:', response.ok);

			if (!response.ok) {
				let errorData;
				try {
					errorData = await response.json();
					console.log('Error response data:', errorData);
				} catch (e) {
					console.log('Could not parse error response as JSON');
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