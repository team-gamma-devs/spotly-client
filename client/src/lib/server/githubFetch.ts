import type { Cookies } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const GITHUB_GRAPHQL_URL = env.GITHUB_GRAPHQL_URL;

/**
 * Represents a GitHub repository with relevant metadata
 * @typedef {Object} GithubRepo
 * @property {string} name - Repository name
 * @property {string | null} description - Repository description
 * @property {number} stargazers_count - Number of stars
 * @property {string | null} language - Primary programming language
 * @property {string} html_url - Repository URL
 * @property {number} diskUsage - Repository size in kilobytes
 */
export type GithubRepo = {
  name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  html_url: string;
  diskUsage: number;
};

/**
 * Represents language usage statistics across repositories
 * @typedef {Object} GithubLanguageStats
 * @property {string} name - Programming language name
 * @property {number} bytes - Total bytes of code in this language
 * @property {number} percentage - Percentage of total codebase
 */
export type GithubLanguageStats = {
  name: string;
  bytes: number;
  percentage: number;
};

/**
 * Consolidated GitHub user data including repositories and statistics
 * @typedef {Object} GithubData
 * @property {string} avatar_url - URL to user's avatar image
 * @property {number} public_repos - Total count of public repositories
 * @property {number} followers - Number of followers
 * @property {GithubRepo[]} topRepos - Top 5 repositories sorted by size
 * @property {GithubLanguageStats[]} languageStats - Top 5 languages by usage
 */
export type GithubData = {
  avatar_url: string;
  public_repos: number;
  followers: number;
  topRepos: GithubRepo[];
  languageStats: GithubLanguageStats[];
};

/**
 * Validates and retrieves GitHub authentication credentials from cookies
 * 
 * @param {Cookies} cookies - SvelteKit cookies object
 * @returns {{ token: string; username: string }} GitHub token and username
 * @throws {Error} Throws 401 error if credentials are not found
 * 
 * @example
 * ```typescript
 * const { token, username } = requireGithubAuth(cookies);
 * ```
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
 * GraphQL response structure from GitHub API
 * @private
 */
interface GraphQLResponse {
  user: {
    avatarUrl: string;
    repositories: {
      totalCount: number;
    };
    followers: {
      totalCount: number;
    };
    topRepos: {
      nodes: Array<{
        name: string;
        description: string | null;
        url: string;
        stargazerCount: number;
        diskUsage: number;
        primaryLanguage: {
          name: string;
        } | null;
      }>;
    };
    languageRepos: {
      nodes: Array<{
        languages: {
          edges: Array<{
            size: number;
            node: {
              name: string;
            };
          }>;
        };
      }>;
    };
  };
}

/**
 * Makes a GraphQL request to GitHub API
 * 
 * @template T - Expected response type
 * @param {string} token - GitHub personal access token
 * @param {string} query - GraphQL query string
 * @param {any} [variables] - Optional GraphQL query variables
 * @returns {Promise<T>} Parsed GraphQL response data
 * @throws {Error} Throws error if request fails or GraphQL returns errors
 * 
 * @example
 * ```typescript
 * const data = await githubGraphQLRequest<GraphQLResponse>(
 *   token, 
 *   query, 
 *   { login: 'username' }
 * );
 * ```
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
 * Fetches comprehensive GitHub user data in a single optimized GraphQL query
 * 
 * Retrieves:
 * - User profile information (avatar, follower count, repository count)
 * - Top 5 repositories sorted by disk usage
 * - Top 5 programming languages by total bytes of code
 * - Language usage statistics with percentages
 * 
 * @param {Cookies} cookies - SvelteKit cookies object containing auth credentials
 * @returns {Promise<GithubData>} Consolidated GitHub user data
 * @throws {Error} Throws error if authentication fails or API request fails
 * 
 * @example
 * ```typescript
 * export async function load({ cookies }) {
 *   try {
 *     const githubData = await fetchGithubData(cookies);
 *     return { githubData };
 *   } catch (error) {
 *     console.error('Failed to fetch GitHub data:', error);
 *     return { githubData: null };
 *   }
 * }
 * ```
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

  const data = await githubGraphQLRequest<GraphQLResponse>(token, query, { login: username });

  // Aggregate language statistics across all repositories, this is to make it presentable for the apex charts.
  const languageMap = new Map<string, number>();
  let totalBytes = 0;

  data.user.languageRepos.nodes.forEach((repo) => {
    repo.languages.edges.forEach((edge) => {
      const { name } = edge.node;
      const bytes = edge.size;
      languageMap.set(name, (languageMap.get(name) || 0) + bytes);
      totalBytes += bytes;
    });
  });

  // Calculate top 5 languages by total bytes with percentages
  const languageStats: GithubLanguageStats[] = [...languageMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: totalBytes > 0 ? (bytes / totalBytes) * 100 : 0
    }));

  // This transforms and sort repositories by disk usage, although I would also like to sort by lines written.
  const topRepos: GithubRepo[] = data.user.topRepos.nodes
    .map((repo) => ({
      name: repo.name,
      description: repo.description,
      stargazers_count: repo.stargazerCount,
      language: repo.primaryLanguage?.name || null,
      html_url: repo.url,
      diskUsage: repo.diskUsage
    }))
    .sort((a, b) => b.diskUsage - a.diskUsage)
    .slice(0, 5);

  return {
    avatar_url: data.user.avatarUrl,
    public_repos: data.user.repositories.totalCount,
    followers: data.user.followers.totalCount,
    topRepos,
    languageStats
  };
}