import type { PageLoad } from './$types';
import type { GithubData } from '$lib/server/githubFetch';

/**
 * This load function runs on the client and/or server.
 * Loads GitHub data only if the user has logged in to his github account.
 * The data it returns is passed to the page and layout components.
 */

export const load: PageLoad = async ({ fetch, parent }) => {
  const { githubUsername } = await parent();
  let userGithubData: GithubData | null = null;
  let githubError: string | null = null;

  if (githubUsername) {
    try {
      const res = await fetch('/app/graduate/api/github');
      
      if (res.ok) {
        userGithubData = await res.json();
      } else {
        const errorData = await res.json();
        githubError = errorData.error || 'Failed to load GitHub data';
      }
    } catch (error: any) {
      console.error('GitHub fetch error:', error);
      githubError = 'Network error while fetching GitHub data';
    }
  }

  return {
    userGithubData,
    githubError,
		title: "Dashboard",
  };
};