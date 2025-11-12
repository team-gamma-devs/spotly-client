import type { PageServerLoad } from './$types';
import type { GraduateInvitation } from '$lib/types/graduateInvitation';

export const load: PageServerLoad = async ({ fetch }) => {
  try {
    const response = await fetch('/app/manager/api/graduate-invitations?page=1&pageSize=20', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    });

    if (!response.ok) {
      console.error('Failed to fetch graduate invitations:', response.status);
      return {
        graduatesList: [],
        error: `Failed to load invitations: ${response.status}`,
        title: 'Graduate Status',
      };
    }

    const data = await response.json();

    const graduatesList: GraduateInvitation[] = Array.isArray(data) 
      ? data 
      : (data.invitations || data.data || []);

    return {
      graduatesList,
      error: null,
      title: 'Graduate Status',
    };
  } catch (error: any) {
    console.error('Error loading graduate invitations:', error);
    return {
      graduatesList: [],
      error: error.message || 'Failed to load invitations',
      title: 'Graduate Status',
    };
  }
};