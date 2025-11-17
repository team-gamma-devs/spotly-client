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