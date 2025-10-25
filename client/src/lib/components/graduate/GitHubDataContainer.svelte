<script lang="ts">
    import type { PageData } from '../../../routes/app/graduate/$types';

    let { data }: { data: PageData } = $props();

    // Destructure the GitHub-related data from the page data
    const userGithubData = $derived(data.userGithubData);
    const githubError = $derived(data.githubError);
    const githubUsername = $derived(data.githubUsername);
</script>

<div class="github-container">
    {#if githubUsername}
        {#if githubError}
            <!-- Error State -->
            <div class="error-state">
                <p class="text-red-500 text-sm">{githubError}</p>
                <a href="/app/graduate/github" class="text-blue-500 hover:underline text-xs">
                    Reconnect GitHub
                </a>
            </div>
        {:else if userGithubData}
            <!-- Success State: Display GitHub Stats -->
            <div class="github-stats">
                <h3 class="text-lg font-semibold mb-3">GitHub Stats</h3>

                <!-- Profile Section -->
                <div class="profile mb-4">
                    <img
                        src={userGithubData.profile.avatar_url}
                        alt={userGithubData.profile.login}
                        class="w-16 h-16 rounded-full mb-2"
                    />
                    <h4 class="font-medium">{userGithubData.profile.name || userGithubData.profile.login}</h4>
                    {#if userGithubData.profile.bio}
                        <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">{userGithubData.profile.bio}</p>
                    {/if}
                    <div class="stats-row flex gap-3 mt-2 text-xs text-gray-600 dark:text-gray-400">
                        <span>📦 {userGithubData.profile.public_repos} repos</span>
                        <span>👥 {userGithubData.profile.followers} followers</span>
                    </div>
                </div>

                <!-- Top Repositories -->
                <div class="top-repos mb-4">
                    <h4 class="text-sm font-semibold mb-2">Top Repositories</h4>
                    <div class="space-y-2">
                        {#each userGithubData.topRepos.slice(0, 3) as repo}
                            <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="block p-2 bg-gray-50 dark:bg-gray-800 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                            >
                                <div class="flex items-center justify-between">
                                    <span class="text-sm font-medium truncate">{repo.name}</span>
                                    <span class="text-xs">⭐ {repo.stargazers_count}</span>
                                </div>
                                {#if repo.language}
                                    <span class="text-xs text-gray-500">{repo.language}</span>
                                {/if}
                            </a>
                        {/each}
                    </div>
                </div>

                <!-- Top Languages -->
                <div class="languages">
                    <h4 class="text-sm font-semibold mb-2">Top Languages</h4>
                    <div class="space-y-1">
                        {#each userGithubData.languageStats.slice(0, 5) as lang}
                            <div class="language-item">
                                <div class="flex justify-between text-xs mb-1">
                                    <span>{lang.name}</span>
                                    <span>{lang.percentage.toFixed(1)}%</span>
                                </div>
                                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div
                                        class="bg-blue-500 h-2 rounded-full transition-all"
                                        style="width: {lang.percentage}%"
                                    ></div>
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        {:else}
            <!-- Loading State -->
            <div class="loading-state">
                <p class="text-sm text-gray-500">Loading GitHub data...</p>
            </div>
        {/if}
    {:else}
        <!-- Not Connected State -->
        <div class="connect-prompt">
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Connect your GitHub account to see your stats
            </p>
            <a
                href="/app/graduate/github"
                class="inline-block px-4 py-2 bg-gradient-to-br from-[#3a8a5f] to-[#4FAB78] text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all"
            >
                Connect GitHub
            </a>
        </div>
    {/if}
</div>

<style>
    .github-container {
        padding: 1rem;
        border-radius: 0.5rem;
        background: var(--box-bg);
    }

    .profile img {
        margin: 0 auto;
    }

    .language-item {
        margin-bottom: 0.5rem;
    }
</style>