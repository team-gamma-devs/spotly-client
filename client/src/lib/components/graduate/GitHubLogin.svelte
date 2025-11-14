<script lang="ts">
	import BtnGitHubLogin from './utils/BtnGitHubLogin.svelte';
	import GenericBoxInvisible from '../main/utils/GenericBoxInvisible.svelte';
	import GenericBoxVisible from '../main/utils/GenericBoxVisible.svelte';
	import BtnGoBack from '../main/utils/BtnGoBack.svelte';
	import { page } from '$app/state';

	const githubUsername = $state(page.data.githubUsername); //Fallback for now.
</script>

<GenericBoxInvisible>
	<div id="logo-container" class="w-full flex items-center justify-center">
		<enhanced:img src="$lib/assets/svgs/spotly-logo-color.svg" width="50" height="50" alt="Spotly Logo"></enhanced:img>
		<h4 id="signup-header" class="zalando-font text-2xl">Spotly</h4>
	</div>
	<GenericBoxVisible>
		<div id="info-box" class="flex flex-col items-center justify-center gap-3 px-2 pt-1 pb-3">
			{#if githubUsername}
				<div class="success-icon">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="64"
						height="64"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="text-green-500"
					>
						<circle cx="12" cy="12" r="10"></circle>
						<path d="m9 12 2 2 4-4"></path>
					</svg>
				</div>
				<p class="mb-3">You're already logged in to your GitHub account</p>
				<BtnGoBack targetUrl="/app/graduate" />
			{:else}
				<h1 class="text-xl">
					Connect your <strong>GitHub</strong> account
				</h1>
				<p class="login-p dark:text-gray-400">
					By connecting your GitHub account, you'll be able to see your GitHub statistics.
				</p>
				<p class="login-p dark:text-gray-400">We can't access your account, your data is only accessible to you.</p>
				<BtnGitHubLogin />
				<a
					href="/privacy/github"
					class="text-xs text-foreground dark:text-gray-500 hover:text-blue-800
            dark:text-blue-300 dark:hover:text-blue-200 underline decoration-1 underline-offset-2 transition-colors block text-center"
					aria-label="GitHub Data Help"
				>
					How we use your <b>GitHub</b> data.
				</a>
			{/if}
		</div>
	</GenericBoxVisible>
	{#if !githubUsername}
		<a
			href="/app/graduate"
			class="text-sm text-foreground hover:text-blue-800 mt-2 dark:hover:text-blue-200 underline
        decoration-1 underline-offset-2 transition-colors block text-center"
			aria-label="Continue without login in to github"
		>
			Continue without login in to GitHub...
		</a>
	{/if}
</GenericBoxInvisible>

<style>
	.login-p {
		margin: 0;
		max-width: 300px;
		text-align: center;
		font-size: 0.85rem;
	}
</style>
