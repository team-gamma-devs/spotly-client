// This file: client/src/routes/app/manager/+page.server.ts

import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	addAnnotation: async ({ request, fetch }) => {
		const formData = await request.formData();
		const graduatedId = formData.get('graduatedId');
		const annotation = formData.get('annotation');

		try {
			const response = await fetch('/app/manager/api/add-annotation', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					graduatedId,
					annotation,
				}),
			});

			if (!response.ok) {
				const errorData = await response.json();
				return fail(response.status, {
					error: errorData.error || 'Failed to add annotation',
				});
			}

			return { success: true };
		} catch (error) {
			console.error('Error adding annotation:', error);
			return fail(500, { error: 'An error occurred while adding the annotation' });
		}
	},
} satisfies Actions;