import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  try {
    const response = await fetch('/app/manager/api/available-tags', {
      credentials: 'include'
    });

    if (!response.ok) {
      console.error('Failed to fetch available tags:', response.status);
      return {
        availableTags: [],
        tagsError: `Failed to load tags: ${response.status}`,
        title: 'Dashboard',
      };
    }

    const data = await response.json();
    return {
      availableTags: Array.isArray(data.filters) ? data.filters : [],
      tagsError: null,
      title: 'Dashboard',
    };
  } catch (error: any) {
    console.error('Error loading available tags:', error);
    return {
      availableTags: [],
      tagsError: error.message || 'Failed to load tags',
      title: 'Dashboard',
    };
  }
};