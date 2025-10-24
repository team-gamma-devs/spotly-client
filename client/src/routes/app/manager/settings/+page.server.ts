import type { PageServerLoad, Actions } from './$types';
import { signedJsonFetch } from '$lib/server/authFetch';
import { BACKEND_URL } from '$env/static/private';
import { mockConfig } from '$lib/mocks/mockManagerSettings';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  const configPromise = (async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // TODO: Replace with real backend
      // const response = await signedJsonFetch(`${BACKEND_URL}/manager/config`);
      // if (response.ok) {
      //   return await response.json();
      // }
      
      return mockConfig;
    } catch (error) {
      console.error('Failed to load config:', error);
      return null;
    }
  })();

  return {
    title: 'Settings',
    config: configPromise
  };
};

export const actions: Actions = {
  updateConfig: async ({ request }) => {
    const form = await request.formData();
    const supportEmail = form.get('supportEmail');
    const lostAccountMsg = form.get('lostAccountMsg');

    if (!supportEmail || typeof supportEmail !== 'string') {
      return fail(400, { error: 'A valid support email is required.' });
    }

    if (!lostAccountMsg || typeof lostAccountMsg !== 'string') {
      return fail(400, { error: 'A valid message is required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(supportEmail)) {
      return fail(400, { error: 'Please enter a valid email address.' });
    }

    try {
      const body = {
        supportEmail,
        lostAccountMsg
      };

      // TODO: Replace with real backend
      // const response = await signedJsonFetch(`${BACKEND_URL}/manager/config`, {
      //   method: 'PUT',
      //   body: JSON.stringify(body),
      // });

      // if (!response.ok) {
      //   const errorData = await response.json();
      //   return fail(response.status, { error: errorData.detail || 'Failed to update configuration.' });
      // }

      // Mock successful update
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return { success: true, message: 'Configuration updated successfully!' };
    } catch (error: any) {
      console.error('Error updating config:', error);
      
      if (error.cause?.code === 'ECONNREFUSED') {
        return fail(503, {
          error: 'Configuration service is not available.',
        });
      }
      
      return fail(500, { error: 'Could not update configuration.' });
    }
  },
};