// client/src/routes/app/graduate/+page.ts
import type { PageLoad } from './$types';
import type { GithubData } from '$lib/server/githubFetch';

export const load: PageLoad = async ({ fetch, parent }) => {
  const parentData = await parent();
  const { githubUsername } = parentData;
  
  let userGithubData: GithubData | null = null;
  let githubError: string | null = null;
  let userFull = null;
  let userFullError: string | null = null;

  try {
    const fullUserRes = await fetch('/app/graduate/api/full-user');
    
    if (fullUserRes.ok) {
      userFull = await fullUserRes.json();
    } else {
      const errorData = await fullUserRes.json();
      userFullError = errorData.error || 'Failed to load user data';
    }
  } catch (error: any) {
    userFullError = 'Network error while fetching user data';
  }
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
    ...parentData,
    userFull,
    userFullError,
    userGithubData,
    githubError,
    title: "Dashboard",
  };
};