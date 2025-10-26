import type { Cookies } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const GITHUB_GRAPHQL_URL = env.GITHUB_GRAPHQL_URL;

export type GithubRepo = {
  name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  html_url: string;
  diskUsage: number;
};

export type GithubLanguageStats = {
  name: string;
  bytes: number;
  percentage: number;
};

export type GithubData = {
  avatar_url: string;
  public_repos: number;
  followers: number;
  topRepos: GithubRepo[];
  languageStats: GithubLanguageStats[];
};

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
 * Makes a GraphQL request to GitHub
 */
async function githubGraphQLRequest<T>(token: string, query: string, variables?: any): Promise<T> {
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
    const error = new Error(`GitHub GraphQL error: ${res.status} ${res.statusText}`);
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
 * Fetches all GitHub data in a single GraphQL query
 */
export async function fetchGithubData(cookies: Cookies): Promise<GithubData> {
  const { token, username } = requireGithubAuth(cookies);

  const query = `
    query($login: String!) {
      user(login: $login) {
        avatarUrl
        repositories {
          totalCount
        }
        followers {
          totalCount
        }
        topRepos: repositories(
          first: 100
          orderBy: {field: UPDATED_AT, direction: DESC}
          isFork: false
          ownerAffiliations: OWNER
        ) {
          nodes {
            name
            description
            url
            stargazerCount
            diskUsage
            primaryLanguage {
              name
            }
          }
        }
        languageRepos: repositories(
          first: 20
          orderBy: {field: UPDATED_AT, direction: DESC}
          isFork: false
          isArchived: false
          privacy: PUBLIC
          ownerAffiliations: OWNER
        ) {
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

  // Get langs statistics
  const languageMap = new Map<string, number>();
  let totalBytes = 0;

  data.user.languageRepos.nodes.forEach((repo: any) => {
    repo.languages.edges.forEach((edge: any) => {
      const { name } = edge.node;
      const bytes = edge.size;
      languageMap.set(name, (languageMap.get(name) || 0) + bytes);
      totalBytes += bytes;
    });
  });

  const languageStats = [...languageMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: totalBytes > 0 ? (bytes / totalBytes) * 100 : 0
    }));

  // Transforms repos and sort by diskUsage (size in KB)
  const topRepos = data.user.topRepos.nodes
    .map((repo: any) => ({
      name: repo.name,
      description: repo.description,
      stargazers_count: repo.stargazerCount,
      language: repo.primaryLanguage?.name || null,
      html_url: repo.url,
      diskUsage: repo.diskUsage
    }))
    .sort((a: GithubRepo, b: GithubRepo) => b.diskUsage - a.diskUsage)
    .slice(0, 5);

  return {
    avatar_url: data.user.avatarUrl,
    public_repos: data.user.repositories.totalCount,
    followers: data.user.followers.totalCount,
    topRepos,
    languageStats
  };
}