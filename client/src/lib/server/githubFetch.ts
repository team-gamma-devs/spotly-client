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

/**
 * Extracts GitHub credentials from HttpOnly cookies.
 * Throws an error if credentials are missing.
 */
export function requireGithubAuth(cookies: Cookies): { token: string; username: string } {
  const token = cookies.get('github_token');
  const username = cookies.get('github_username');
  
  if (!token || !username) {
    const error = new Error('GitHub credentials not found. Please connect your GitHub account.');
    // @ts-expect-error Adding status for error handling
    error.status = 401;
    throw error;
  }
  
  return { token, username };
}

/**
 * Makes a REST API request to GitHub.
 */
async function githubRestRequest<T>(
  token: string,
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${GITHUB_API_URL}${path}`, {
    ...init,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'User-Agent': 'GitGudStats',
      ...init.headers
    }
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    const error = new Error(`GitHub REST API error: ${res.status} ${res.statusText} - ${text}`);
    // @ts-expect-error Adding status for error handling
    error.status = res.status;
    throw error;
  }

  return res.json() as Promise<T>;
}

/**
 * Makes a GraphQL request to GitHub.
 */
async function githubGraphQLRequest<T>(token: string, query: string, variables?: any): Promise<T> {
  const res = await fetch(GITHUB_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'GitGudStats'
    },
    body: JSON.stringify({ query, variables })
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    const error = new Error(`GitHub GraphQL error: ${res.status} ${res.statusText} - ${text}`);
    // @ts-expect-error Adding status for error handling
    error.status = res.status;
    throw error;
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
  }

  return json.data as T;
}

/**
 * Fetches the user's GitHub profile.
 */
export async function getGithubProfile(token: string): Promise<GithubProfile> {
  return githubRestRequest<GithubProfile>(token, '/user');
}

/**
 * Fetches the user's top repositories (by stars and recent updates).
 */
export async function getTopRepos(token: string, limit = 10): Promise<GithubRepo[]> {
  const repos = await githubRestRequest<GithubRepo[]>(
    token,
    `/user/repos?sort=updated&per_page=${limit}&type=owner`
  );
  return repos.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, limit);
}

/**
 * Aggregates language statistics from the user's repositories using GraphQL.
 */
export async function getLanguageStats(token: string, username: string): Promise<GithubLanguageStats[]> {
  const query = `
    query($username: String!) {
      user(login: $username) {
        repositories(first: 20, ownerAffiliations: OWNER, orderBy: {field: UPDATED_AT, direction: DESC}) {
          nodes {
            languages(first: 5, orderBy: {field: SIZE, direction: DESC}) {
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

  const data = await githubGraphQLRequest<any>(token, query, { username });
  
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
}

/**
 * Fetches all GitHub data for a user (profile, repos, languages).
 * Add here more functions as needed.
 */
export async function fetchGithubData(cookies: Cookies): Promise<GithubData> {
  const { token, username } = requireGithubAuth(cookies);

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