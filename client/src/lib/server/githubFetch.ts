import type { Cookies } from '@sveltejs/kit';
import { GITHUB_API_URL, GITHUB_GRAPHQL_URL } from '$env/static/private';

export type GithubProfile = {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
};

export type GithubRepo = {
  name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  html_url: string;
  updated_at: string;
};

export type GithubLanguageStats = {
  name: string;
  bytes: number;
  percentage: number;
};

export type GithubData = {
  profile: GithubProfile;
  topRepos: GithubRepo[];
  languageStats: GithubLanguageStats[];
};

export function requireGithubAuth(cookies: Cookies): { token: string; username: string } {
  const token = cookies.get('github_token');
  const username = cookies.get('github_username');

  // DEBUG: Enhanced logging
  console.log('=== GitHub Auth Debug ===');
  console.log('All cookies:', cookies.getAll());
  console.log('Token exists:', !!token);
  console.log('Token length:', token?.length);
  console.log('Token preview:', token?.slice(0, 10) + '...' + token?.slice(-10));
  console.log('Username:', username);
  console.log('========================');

  if (!token || !username) {
    const error = new Error('GitHub credentials not found. Please connect your GitHub account.');
    // @ts-expect-error Adding status for error handling
    error.status = 401;
    throw error;
  }

  return { token, username };
}

/**
 * Makes a REST API request to GitHub
 */
async function githubRestRequest<T>(
  token: string,
  endpoint: string,
  init: RequestInit = {}
): Promise<T> {
  // Construct URL: GITHUB_API_URL is now just 'https://api.github.com'
  const url = `${GITHUB_API_URL}${endpoint}`;

  console.log('GitHub API Request:', url);

  const res = await fetch(url, {
    ...init,
    headers: {
      'Accept': 'application/vnd.github+json',
      'Authorization': `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...init.headers
    }
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    console.error('GitHub API Error:', { status: res.status, url, response: text });
    const error = new Error(`GitHub REST API error: ${res.status} ${res.statusText} - ${text}`);
    // @ts-expect-error Adding status for error handling
    error.status = res.status;
    throw error;
  }

  return res.json() as Promise<T>;
}

/**
 * Makes a GraphQL request to GitHub
 */
async function githubGraphQLRequest<T>(token: string, query: string, variables?: any): Promise<T> {
  console.log('GitHub GraphQL Request');

  const res = await fetch(GITHUB_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query, variables })
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    console.error('GitHub GraphQL Error:', { status: res.status, response: text });
    const error = new Error(`GitHub GraphQL error: ${res.status} ${res.statusText} - ${text}`);
    // @ts-expect-error Adding status for error handling
    error.status = res.status;
    throw error;
  }

  const json = await res.json();
  if (json.errors) {
    console.error('GraphQL errors:', json.errors);
    throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
  }

  return json.data as T;
}

/**
 * Fetches the authenticated user's profile using /user endpoint
 * This requires the OAuth token from GitHub App authentication
 */
export async function getGithubProfile(token: string): Promise<GithubProfile> {
  // Use /user endpoint for authenticated user (not /users/{username})
  return githubRestRequest<GithubProfile>(token, '/user');
}

/**
 * Fetches the authenticated user's repositories
 */
export async function getTopRepos(token: string, limit = 10): Promise<GithubRepo[]> {
  // Use /user/repos for authenticated user's repos
  const repos = await githubRestRequest<GithubRepo[]>(
    token,
    `/user/repos?sort=updated&per_page=${limit}&affiliation=owner`
  );
  return repos.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, limit);
}

/**
 * Aggregates language statistics from the user's repositories using GraphQL
 */
export async function getLanguageStats(token: string, username: string): Promise<GithubLanguageStats[]> {
  try {
    const query = `
      query($login: String!) {
        user(login: $login) {
          repositories(first: 50, orderBy: {field: STARGAZERS, direction: DESC}, isFork: false, isArchived:false, privacy: PUBLIC) {
            nodes {
              languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                edges {
                  size
                  node {
                    name
                  }
                }
              }
            }
          }
        }
      }
    `;

    const data = await githubGraphQLRequest<any>(token, query, { login: username });

    const languageMap = new Map<string, number>();
    let totalBytes = 0;

    data.user.repositories.nodes.forEach((repo: any) => {
      repo.languages.edges.forEach((edge: any) => {
        const { name } = edge.node;
        const bytes = edge.size;
        languageMap.set(name, (languageMap.get(name) || 0) + bytes);
        totalBytes += bytes;
      });
    });

    return [...languageMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([name, bytes]) => ({
        name,
        bytes,
        percentage: totalBytes > 0 ? (bytes / totalBytes) * 100 : 0
      }))
      .slice(0, 10);
  } catch (error) {
    console.warn('Failed to fetch language stats via GraphQL:', error);
    return [];
  }
}

export async function fetchGithubData(cookies: Cookies): Promise<GithubData> {
  const { token, username } = requireGithubAuth(cookies);

  // Use /user endpoints for authenticated requests
  const [profile, topRepos, languageStats] = await Promise.all([
    getGithubProfile(token),
    getTopRepos(token, 10),
    getLanguageStats(token, username)
  ]);

  return {
    profile,
    topRepos,
    languageStats
  };
}