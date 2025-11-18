<!--
  @component GitHubDataContainer
  
  Displays comprehensive GitHub statistics for a user including repository information,
  language distribution, activity metrics, and interactive charts.
  
  @description
  This component fetches and visualizes GitHub data using ApexCharts. It shows:
  - User profile header with avatar and key stats
  - Activity overview bar chart (repos, stars, followers)
  - Language distribution donut chart with dynamic colors.
  - Top 5 repositories by size
  - Repository links with metadata
  - Language breakdown with progress bars
  
  @props
  - data: PageData - SvelteKit page data containing githubUsername
  
  @dependencies
  - ApexCharts via @flowbite-svelte-plugins/chart
  - flowbite-svelte-icons for UI icons
  - availableFilterTags for language color mapping
  
  @example
  ```svelte
  <GitHubDataContainer {data} />
  ```
  
  @remarks
  - Requires GitHub authentication (github_token and github_username cookies)
  - Fetches data from /app/graduate/api/github endpoint
  - Colors dynamically map to tech tags from filterTags.ts
  - All charts are responsive and theme-aware (light/dark mode)
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import type { ApexOptions } from 'apexcharts';
	import { Chart } from '@flowbite-svelte-plugins/chart';
	import { InboxFullSolid, UsersGroupSolid, StarSolid, CodeBranchSolid, EyeSolid } from 'flowbite-svelte-icons';
	import { Spinner, Button } from 'flowbite-svelte';
	import type { PageData } from '../../../routes/app/graduate/$types';
	import type { GithubData } from '$lib/types/github/githubTypes';
	import { GenericBoxVisible } from '../main/utils';
	import BtnGitHubLogin from './utils/BtnGitHubLogin.svelte';
	import { availableFilterTags } from '$lib/constants/filterTags';

	/**
	 * Component props containing page data from SvelteKit
	 * @type {{ data: PageData }}
	 */
	let { data }: { data: PageData } = $props();

	/**
	 * GitHub username derived from page data
	 * @type {string | undefined}
	 */
	const githubUsername = $derived(data?.githubUsername);

	/**
	 * Stores fetched GitHub data including repos, stats, and language info
	 * @type {GithubData | null}
	 */
	let githubData = $state<GithubData | null>(null);

	/**
	 * Loading state for data fetching
	 * @type {boolean}
	 */
	let loading = $state(false);

	/**
	 * Error message if data fetch fails
	 * @type {string | null}
	 */
	let error = $state<string | null>(null);

	/**
	 * ApexCharts options for top repositories horizontal bar chart
	 * @type {ApexOptions | null}
	 */
	let repoChartOptions: ApexOptions | null = $state(null);

	/**
	 * ApexCharts options for language distribution donut chart
	 * @type {ApexOptions | null}
	 */
	let languageChartOptions: ApexOptions | null = $state(null);

	/**
	 * ApexCharts options for activity overview vertical bar chart
	 * @type {ApexOptions | null}
	 */
	let activityChartOptions: ApexOptions | null = $state(null);

	/**
	 * Maps a language name to its corresponding color from availableFilterTags
	 *
	 * @param {string} langName - The programming language name (e.g., "JavaScript", "Python")
	 * @returns {string} CSS variable reference or default color
	 *
	 * @description
	 * Normalizes the language name by converting to lowercase and removing special characters,
	 * then searches for a matching tag in availableFilterTags. Returns a CSS variable
	 * reference that respects light/dark theme settings.
	 *
	 * @example
	 * ```typescript
	 * getLanguageColor("JavaScript") // Returns: "var(--color-javascript)"
	 * getLanguageColor("TypeScript") // Returns: "var(--color-typescript)"
	 * getLanguageColor("UnknownLang") // Returns: "var(--color-tag-default)"
	 * ```
	 */
	function getLanguageColor(langName: string): string {
		const normalizedName = langName.toLowerCase().replace(/[.\s]/g, '');
		const matchingTag = availableFilterTags.find(
			(tag) => tag.code === normalizedName || tag.name.toLowerCase() === langName.toLowerCase(),
		);
		return matchingTag ? `var(--color-${matchingTag.color})` : 'var(--color-tag-default)';
	}

	/**
	 * Lifecycle hook - Fetches GitHub data and initializes all charts on component mount
	 *
	 * @description
	 * Performs the following operations:
	 * 1. Validates GitHub username exists
	 * 2. Fetches data from /app/graduate/api/github endpoint
	 * 3. Configures three ApexCharts:
	 *    - Top repositories bar chart (by size and stars)
	 *    - Language distribution donut chart (percentage-based)
	 *    - Activity overview bar chart (repos, stars, followers)
	 * 4. Maps language colors dynamically from availableFilterTags
	 * 5. Handles loading and error states
	 *
	 * @throws {Error} If GitHub data fetch fails or API returns non-OK response
	 */
	onMount(async () => {
		if (!githubUsername) return;

		loading = true;
		error = null;

		try {
			// Fetch GitHub data from API endpoint (see lib/server/githubFetch.ts)
			const response = await fetch('/app/graduate/api/github');
			if (!response.ok) {
				throw new Error('Failed to fetch GitHub data');
			}
			const data: GithubData = await response.json();
			githubData = data;

			if (githubData) {
				// ************************** TOP REPOS BAR CHART **********************
				// Horizontal bar chart showing repository size (KB) and star count
				const repoNames = githubData.topRepos.map((repo) => repo.name);
				const repoSizes = githubData.topRepos.map((repo) => repo.diskUsage);
				const repoStars = githubData.topRepos.map((repo) => repo.stargazers_count);

				repoChartOptions = {
					series: [
						{
							name: 'Size (KB)',
							data: repoSizes,
							color: '#ee4a25',
						},
						{
							name: 'Stars',
							data: repoStars,
							color: '#FBBF24',
						},
					],
					chart: {
						type: 'bar',
						width: '100%',
						height: 350,
						toolbar: { show: false },
					},
					fill: { opacity: 1 },
					plotOptions: {
						bar: {
							horizontal: true,
							columnWidth: '100%',
							borderRadiusApplication: 'end',
							borderRadius: 6,
							dataLabels: { position: 'top' },
						},
					},
					legend: { show: true, position: 'bottom' },
					dataLabels: { enabled: false },
					tooltip: { shared: true, intersect: false },
					xaxis: {
						labels: {
							show: true,
							style: {
								fontFamily: 'Inter, sans-serif',
								cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
							},
						},
						categories: repoNames,
						axisTicks: { show: false },
						axisBorder: { show: false },
					},
					yaxis: {
						labels: {
							show: true,
							style: {
								fontFamily: 'Inter, sans-serif',
								cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
							},
						},
					},
					grid: {
						show: true,
						strokeDashArray: 4,
						padding: { left: 2, right: 2, top: -20 },
					},
				};

				// ******************** DONUT CHART... Hmmm... Donut *********************
				// It recycles availableFilterTags. So same approach as the tech tags, if no color found, defaults to tag-default.
				const langNames = githubData.languageStats.map((lang) => lang.name);
				const langPercentages = githubData.languageStats.map((lang) => Number(lang.percentage.toFixed(1)));
				const langColors = langNames.map((langName) => {
					const normalizedName = langName.toLowerCase().replace(/[.\s]/g, '');
					const matchingTag = availableFilterTags.find(
						(tag) => tag.code === normalizedName || tag.name.toLowerCase() === langName.toLowerCase(),
					);

					return matchingTag ? `var(--color-${matchingTag.color})` : 'var(--color-tag-default)';
				});

				languageChartOptions = {
					series: langPercentages,
					labels: langNames,
					colors: langColors,
					chart: {
						type: 'donut',
						width: '100%',
						height: 320,
						toolbar: { show: true },
						background: 'transparent',
					},
					plotOptions: {
						pie: {
							donut: {
								size: '65%',
								background: 'transparent',
								labels: {
									show: true,
									total: {
										show: false,
										label: 'Languages',
										fontSize: '16px',
										fontWeight: 600,
									},
								},
							},
						},
					},
					dataLabels: { enabled: false },
					legend: {
						position: 'bottom',
						fontSize: '14px',
					},
					tooltip: {
						y: {
							formatter: (val: number) => `${val.toFixed(1)}%`,
						},
					},
				};

				// ******************** ACTIVITY OVERVIEW *********************
				const totalStars = githubData.topRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
				const avgStarsPerRepo = githubData.topRepos.length > 0 ? totalStars / githubData.topRepos.length : 0; // This I will use in the future.

				activityChartOptions = {
					series: [
						{
							name: 'Repositories',
							data: [githubData.public_repos],
							color: '#3b82f6',
						},
						{
							name: 'Total Stars',
							data: [totalStars],
							color: '#FBBF24',
						},
						{
							name: 'Followers',
							data: [githubData.followers],
							color: '#8b5cf6',
						},
					],
					chart: {
						type: 'bar',
						width: '100%',
						height: 280,
						toolbar: { show: false },
					},
					plotOptions: {
						bar: {
							horizontal: false,
							columnWidth: '70%',
							borderRadius: 8,
						},
					},
					dataLabels: { enabled: false },
					xaxis: {
						categories: ['GitHub Stats'],
						labels: { show: false },
					},
					yaxis: {
						labels: {
							style: {
								fontFamily: 'Inter, sans-serif',
								cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
							},
						},
					},
					legend: {
						position: 'top',
						horizontalAlign: 'left',
					},
					grid: {
						show: true,
						strokeDashArray: 4,
					},
				};
			}
		} catch (err) {
			error = err instanceof Error ? err.message : 'An error occurred';
		} finally {
			loading = false;
		}
	});

	/**
	 * Reactive total star count across all repositories
	 * @type {number}
	 */
	const totalStars = $derived(
		githubData ? githubData.topRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0) : 0,
	);
</script>

<section class="w-full">
	{#if githubUsername}
		{#if loading}
			<div class="flex flex-col items-center justify-center py-12 px-4">
				<Spinner size="16" />
				<p class="text-sm text-gray-500 mt-2">Loading GitHub data...</p>
			</div>
		{:else if error}
			<div class="flex flex-col items-center justify-center py-12 px-4">
				<p class="text-red-500 text-sm">{error}</p>
				<Button color="red" href="/app/graduate/github">Reconnect Github</Button>
			</div>
		{:else if githubData && repoChartOptions && languageChartOptions && activityChartOptions}
			<!-- ******************** HEADER ********************** -->
			<div class="w-full max-w-[2300px] mx-auto space-y-6">
				<div
					class="bg-gradient-to-r from-blue-950 to-blue-800 dark:from-slate-900 dark:to-blue-950 rounded-xl p-8 text-white shadow-xl"
				>
					<div class="flex flex-col md:flex-row items-start md:items-center gap-6">
						<img
							src={githubData.avatar_url}
							alt="GitHub Avatar"
							class="w-24 h-24 rounded-full ring-4 ring-white/30 shadow-lg"
						/>

						<div class="flex-1">
							<h2 class="text-3xl font-bold mb-2">Your GitHub Stats</h2>
							<p class="text-blue-100 mb-4">@{githubUsername} | Time to Git Gud with these Stats!</p>
							<div class="flex flex-wrap gap-4">
								<div class="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
									<InboxFullSolid class="w-5 h-5" />
									<span class="font-semibold">{githubData.public_repos}</span>
									<span class="text-sm text-blue-100">Repositories</span>
								</div>
								<div class="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
									<StarSolid class="w-5 h-5" />
									<span class="font-semibold">{totalStars}</span>
									<span class="text-sm text-blue-100">Total Stars</span>
								</div>
								<div class="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
									<UsersGroupSolid class="w-5 h-5" />
									<span class="font-semibold">{githubData.followers}</span>
									<span class="text-sm text-blue-100">Followers</span>
								</div>
							</div>
						</div>

						<div class="text-xs text-blue-100 flex items-center gap-1 mb-0 mt-auto">
							<a
								href="https://github.com/team-gamma-devs/git-gud-stats"
								target="_blank"
								rel="noopener noreferrer"
								class="flex items-center gap-1 hover:text-white transition-colors"
							>
								Powered by
								<enhanced:img
									src="$lib/assets/svgs/ggs-logo.svg"
									width="20"
									height="20"
									class="inline"
									alt="GGS Logo"
								/>
								GGS
							</a>
						</div>
					</div>
				</div>

				<!-- ************ Activity Overview ****************** -->
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<div
						class="bg-background dark:bg-background p-6 rounded-xl ring-1 ring-gray-200 dark:ring-gray-900 shadow-lg blur-bg"
					>
						<div class="pb-3 mb-3 border-b border-gray-200 dark:border-gray-700">
							<h4 class="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
								<CodeBranchSolid class="w-5 h-5 text-blue-500" />
								Activity Overview
							</h4>
						</div>
						<Chart options={activityChartOptions} />
					</div>

					<!-- *************** The f@!$!@g donut chart *************** -->
					<div
						class="bg-background dark:bg-background p-6 rounded-xl ring-1 ring-gray-200 dark:ring-gray-900 shadow-lg blur-bg"
					>
						<div class="pb-3 mb-3 border-b border-gray-200 dark:border-gray-700">
							<h4 class="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
								<CodeBranchSolid class="w-5 h-5 text-purple-500" />
								Language Distribution
							</h4>
						</div>
						<Chart options={languageChartOptions} />
					</div>

					<!-- *************** Quick Stats ****************  -->
					<div
						class="bg-background dark:bg-background p-6 rounded-xl ring-1 ring-gray-200 dark:ring-gray-900 shadow-lg blur-bg"
					>
						<div class="pb-3 mb-3 border-b border-gray-200 dark:border-gray-700">
							<h4 class="text-base font-semibold text-gray-900 dark:text-white">Quick Stats</h4>
						</div>
						<div class="space-y-4">
							<div class="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
								<div class="flex items-center gap-3">
									<div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
										<InboxFullSolid class="w-5 h-5 text-white" />
									</div>
									<div>
										<p class="text-sm text-gray-600 dark:text-gray-400">Public Repos</p>
										<p class="text-2xl font-bold text-gray-900 dark:text-white">{githubData.public_repos}</p>
									</div>
								</div>
							</div>
							<div class="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
								<div class="flex items-center gap-3">
									<div class="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
										<StarSolid class="w-5 h-5 text-white" />
									</div>
									<div>
										<p class="text-sm text-gray-600 dark:text-gray-400">Total Stars</p>
										<p class="text-2xl font-bold text-gray-900 dark:text-white">{totalStars}</p>
									</div>
								</div>
							</div>
							<div class="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
								<div class="flex items-center gap-3">
									<div class="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
										<UsersGroupSolid class="w-5 h-5 text-white" />
									</div>
									<div>
										<p class="text-sm text-gray-600 dark:text-gray-400">Followers</p>
										<p class="text-2xl font-bold text-gray-900 dark:text-white">{githubData.followers}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- **************** Top 5 Repos, keep this full width ***************  -->
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<div
						class="lg:col-span-2 bg-background dark:bg-background p-6 rounded-xl ring-1 ring-gray-200 dark:ring-gray-900 shadow-lg blur-bg"
					>
						<div class="pb-3 mb-3 border-b border-gray-200 dark:border-gray-700">
							<h4 class="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
								<CodeBranchSolid class="w-5 h-5 text-red-500" />
								Top 5 Repositories
							</h4>
							<p class="text-sm text-gray-500 dark:text-gray-400">Sorted by repository size</p>
						</div>
						<div class="w-full min-h-[350px]">
							<Chart options={repoChartOptions} />
						</div>
					</div>

					<!-- ************** Repo Links ***************** -->
					<div
						class="bg-background dark:bg-background p-6 rounded-xl ring-1 ring-gray-200 dark:ring-gray-900 shadow-lg blur-bg"
					>
						<div class="pb-3 mb-3 border-b border-gray-200 dark:border-gray-700">
							<h4 class="text-base font-semibold text-gray-900 dark:text-white">Repository Links</h4>
						</div>
						<div class="space-y-2">
							{#each githubData.topRepos as repo}
								<a
									href={repo.html_url}
									target="_blank"
									rel="noopener noreferrer"
									class="block p-4 rounded-lg transition-all duration-200 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-md"
								>
									<div class="flex items-center justify-between gap-2 mb-2">
										<span class="text-sm font-semibold truncate text-gray-900 dark:text-white">{repo.name}</span>
										<div class="flex items-center gap-3 text-xs shrink-0">
											<span class="flex items-center gap-1 text-yellow-600 dark:text-yellow-500">
												<StarSolid class="w-3 h-3" />
												{repo.stargazers_count}
											</span>
											<span class="text-gray-500 dark:text-gray-400">{(repo.diskUsage / 1024).toFixed(1)} MB</span>
										</div>
									</div>
									{#if repo.language}
										<span
											class="inline-block text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded"
										>
											{repo.language}
										</span>
									{/if}
									{#if repo.description}
										<p class="text-xs text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">{repo.description}</p>
									{/if}
								</a>
							{/each}
						</div>
					</div>
					<!-- ********************** Language Breakdown *********************  -->
					<div
						class="bg-background dark:bg-background p-6 rounded-xl ring-1 ring-gray-200 dark:ring-gray-900 shadow-lg blur-bg"
					>
						<div class="pb-3 mb-3 border-b border-gray-200 dark:border-gray-700">
							<h4 class="text-base font-semibold text-gray-900 dark:text-white">Language Breakdown</h4>
						</div>
						<div class="space-y-4">
							{#each githubData.languageStats as lang}
								<div class="w-full">
									<div class="flex justify-between text-sm mb-2">
										<span class="font-semibold text-gray-900 dark:text-white">{lang.name}</span>
										<span class="text-gray-600 dark:text-gray-300">{lang.percentage.toFixed(1)}%</span>
									</div>

									<div class="w-full bg-gray-200 dark:bg-gray-900 rounded-sm h-3">
										<div
											class="h-3 rounded-full transition-all duration-500"
											style="width: {lang.percentage}%; background-color: {getLanguageColor(lang.name)}"
										></div>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		{/if}

		<!-- ******************* User not logged in to github ********************  -->
	{:else}
		<div class="flex flex-col items-center justify-center py-12 px-4">
			<p class="text-sm text-gray-600 dark:text-gray-400 mb-3">Connect your GitHub account to see your stats</p>
			<BtnGitHubLogin targetUrl="/app/graduate/github" />
			<h4 class="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-5">
				<a
					href="https://github.com/team-gamma-devs/git-gud-stats"
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-300"
				>
					Powered By
					<enhanced:img src="$lib/assets/svgs/ggs-logo.svg" width="24" height="24" class="inline" alt="GGS Logo" />
					GGS
				</a>
			</h4>
		</div>
	{/if}
</section>
