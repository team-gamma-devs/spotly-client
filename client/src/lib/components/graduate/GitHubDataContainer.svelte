<script lang="ts">
	import { onMount } from 'svelte';
	import type { ApexOptions } from 'apexcharts';
	import { Chart } from '@flowbite-svelte-plugins/chart';
	import { InboxFullSolid, UsersGroupSolid, StarSolid } from 'flowbite-svelte-icons';
	import { Spinner, Button } from 'flowbite-svelte';
	import type { PageData } from '../../../routes/app/graduate/$types';
	import type { GithubData } from '$lib/server/githubFetch';
	import { GenericBoxVisible } from '../main/utils';
	import BtnGitHubLogin from './utils/BtnGitHubLogin.svelte';

	let { data }: { data: PageData } = $props();

	const githubUsername = $derived(data?.githubUsername);

	let githubData: GithubData | null = $state(null);
	let loading = $state(false);
	let error = $state<string | null>(null);
	let chartOptions: ApexOptions | null = $state(null);

	onMount(async () => {
		if (!githubUsername) return;

		loading = true;
		error = null;

		try {
			const response = await fetch('/app/graduate/api/github');
			if (!response.ok) {
				throw new Error('Failed to fetch GitHub data');
			}
			githubData = await response.json();

			if (githubData) {
				const repoNames = githubData.topRepos.map((repo) => repo.name);
				const repoSizes = githubData.topRepos.map((repo) => repo.diskUsage);
				const repoStars = githubData.topRepos.map((repo) => repo.stargazers_count);

				chartOptions = {
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
						sparkline: {
							enabled: false,
						},
						type: 'bar',
						width: '100%',
						height: 350,
						toolbar: {
							show: false,
						},
					},
					fill: {
						opacity: 1,
					},
					plotOptions: {
						bar: {
							horizontal: true,
							columnWidth: '100%',
							borderRadiusApplication: 'end',
							borderRadius: 6,
							dataLabels: {
								position: 'top',
							},
						},
					},
					legend: {
						show: true,
						position: 'bottom',
					},
					dataLabels: {
						enabled: false,
					},
					tooltip: {
						shared: true,
						intersect: false,
					},
					xaxis: {
						labels: {
							show: true,
							style: {
								fontFamily: 'Inter, sans-serif',
								cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
							},
						},
						categories: repoNames,
						axisTicks: {
							show: false,
						},
						axisBorder: {
							show: false,
						},
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
						padding: {
							left: 2,
							right: 2,
							top: -20,
						},
					},
				};
			}
		} catch (err) {
			error = err instanceof Error ? err.message : 'An error occurred';
		} finally {
			loading = false;
		}
	});
</script>

<section class="p-4 rounded-lg w-full flex items-center justify-center">
	{#if githubUsername}
		{#if loading}
			<div class="flex flex-col items-center justify-center py-12 px-4">
				<Spinner size="16" />
				<p class="text-sm text-gray-500 mt-2">Loading GitHub data...</p>
			</div>
		{:else if error}
			<!-- *************** Error ****************** -->
			<div class="flex flex-col items-center justify-center py-12 px-4">
				<p class="text-red-500 text-sm">{error}</p>
				<Button color="red" href="/app/graduate/github">Reconnect Github</Button>
			</div>
		{:else if githubData && chartOptions}
			<div class="w-full max-w-[2300px]">
				<!-- ************** Profile Header ***************** -->
				<div class="mb-6">
					<h3 class="text-xl font-semibold mb-2">GitHub Stats</h3>
					<h4 class="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
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

				<!-- ********** Profile Card ************* -->
				<GenericBoxVisible classes="p-6 rounded-lg mb-6 flex flex-col items-center text-center w-fit">
					<div class="flex flex-col items-center text-center p-4">
						<img
							src={githubData.avatar_url}
							alt="GitHub Avatar"
							class="w-20 h-20 rounded-full mb-3 ring-2 ring-gray-200 dark:ring-gray-700"
						/>
						<div class="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
							<span class="flex items-center gap-1">
								<InboxFullSolid class="w-5 h-5" />
								{githubData.public_repos} repos
							</span>
							<span class="flex items-center gap-1">
								<UsersGroupSolid class="w-5 h-5" />
								{githubData.followers} followers
							</span>
						</div>
					</div>
				</GenericBoxVisible>

				<div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] lg:grid-cols-2 gap-6 w-full">
					<!-- *************** Top Repos *************** -->
					<div class="lg:col-span-2 bg-background dark:bg-background p-5 rounded ring-1 ring-gray-200 dark:ring-gray-900 shadow-lg blur-bg w-full h-fit">
						<div class="pb-3 mb-3 border-b border-gray-200 dark:border-gray-700">
							<h4 class="text-base font-semibold text-gray-900 dark:text-white">Top 5 Repositories</h4>
							<p class="text-sm text-gray-500 dark:text-gray-400">By repository size</p>
						</div>
						<div class="w-full min-h-[350px]">
							<Chart options={chartOptions} />
						</div>
					</div>

					<!-- *********** Repo Links ********************* -->
					<div class="bg-background dark:bg-background p-5 rounded ring-1 ring-gray-200 dark:ring-gray-900 shadow-lg blur-bg w-full h-fit">
						<div class="pb-3 mb-3 border-b border-gray-200 dark:border-gray-700">
							<h4 class="text-base font-semibold text-gray-900 dark:text-white">Quick Links</h4>
						</div>
						<div class="space-y-2">
							{#each githubData.topRepos as repo}
								<a 
									href={repo.html_url} 
									target="_blank" 
									rel="noopener noreferrer" 
									class="block p-3 rounded-lg transition-all duration-200 bg-gray-800 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
								>
									<div class="flex items-center justify-between gap-2">
										<span class="text-sm font-medium truncate">{repo.name}</span>
										<div class="flex items-center gap-2 text-xs shrink-0">
											<span class="flex items-center gap-1">
												<StarSolid class="w-3 h-3" />
												{repo.stargazers_count}
											</span>
											<span class="text-gray-500">{(repo.diskUsage / 1024).toFixed(1)} MB</span>
										</div>
									</div>
									{#if repo.language}
										<span class="text-xs text-gray-500 dark:text-gray-400">{repo.language}</span>
									{/if}
								</a>
							{/each}
						</div>
					</div>

					<!-- ************ Top Langs *********************** -->
					<div class="bg-background dark:bg-background p-5 rounded ring-1 ring-gray-200 dark:ring-gray-900 shadow-lg blur-bg w-full h-fit">
						<div class="pb-3 mb-3 border-b border-gray-200 dark:border-gray-700">
							<h4 class="text-base font-semibold text-gray-900 dark:text-white">Top 5 Languages</h4>
						</div>
						<div class="space-y-3">
							{#each githubData.languageStats as lang}
								<div class="w-full">
									<div class="flex justify-between text-sm mb-1.5">
										<span class="font-medium">{lang.name}</span>
										<span class="text-gray-500 dark:text-gray-400">{lang.percentage.toFixed(1)}%</span>
									</div>
									<div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
										<div
											class="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
											style="width: {lang.percentage}%"
										></div>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		{/if}
	{:else}
		<!-- Not Connected State -->
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