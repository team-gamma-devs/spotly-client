<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import GenericBoxInvisible from '$lib/components/main/utils/GenericBoxInvisible.svelte';
	import GenericBoxVisible from '$lib/components/main/utils/GenericBoxVisible.svelte';
	import { Button } from 'flowbite-svelte';
	import { Spinner } from "flowbite-svelte";

	let success = false;
	let username = '';
	let error = '';
	let message = '';
	let loading = true;

	// Check if user has completed CV upload
	const user = page.data.user;
	const hasCompletedCV = user?.cvInfo?.personalCvPath || (user?.cvInfo?.skills && user.cvInfo.skills.length > 0);
	const nextStepUrl = hasCompletedCV ? '/app/graduate' : '/app/graduate/upload_cv';

	onMount(() => {
		success = page.url.searchParams.get('success') === 'true';
		username = page.url.searchParams.get('username') || '';
		error = page.url.searchParams.get('error') || '';
		message = page.url.searchParams.get('message')?.replace(/\+/g, ' ') || '';
		loading = false;
	});
</script>

<GenericBoxInvisible>
	<div id="logo-container" class="w-full flex items-center justify-center">
		<enhanced:img
			src="$lib/assets/svgs/spotly-logo-color.svg"
			width="50"
			height="50"
			alt="Spotly Logo"
		></enhanced:img>
		<h4 id="signup-header" class="zalando-font text-2xl">Spotly</h4>
	</div>

	<GenericBoxVisible>
		<div class="flex flex-col items-center justify-center gap-4 px-6 py-8">
			{#if loading}
				<!-- ******* Loading State ************ -->
				<div class="w-full max-w-sm space-y-4">
					<Spinner size="16" color="primary"/>
				</div>
			{:else if success}
				<!-- ********* Success State *********** -->
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
				<h1 class="text-2xl font-semibold text-center">Connected Successfully!</h1>
				<p class="text-center text-gray-600 dark:text-gray-400 max-w-sm">
					Your GitHub account <strong class="text-foreground">@{username}</strong> has been connected.
					{#if hasCompletedCV}
						You can now view your updated profile.
					{:else}
						You can now access your GitHub statistics.
					{/if}
				</p>
				<Button color="green" href={nextStepUrl} class="mt-4 px-6 py-3">
					{hasCompletedCV ? 'Go to Dashboard' : 'Continue to Next Step'}
				</Button>
			{:else}
				<!-- ******************** Error ************ -->
				<div class="error-icon">
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
						class="text-red-500"
					>
						<circle cx="12" cy="12" r="10"></circle>
						<path d="m15 9-6 6"></path>
						<path d="m9 9 6 6"></path>
					</svg>
				</div>
				<h1 class="text-2xl font-semibold text-center">Connection Failed</h1>
				<p class="text-center text-gray-600 dark:text-gray-400 max-w-sm">
					{message || 'Something went wrong while connecting your GitHub account.'}
				</p>
				<div class="flex gap-3 mt-4">
					<a
						href="/app/graduate/github"
						class="px-6 py-3 bg-gradient-to-br from-[#3a8a5f] to-[#4FAB78] text-white rounded-lg font-semibold hover:shadow-lg transition-all"
					>
						Try Again
					</a>
					<a
						href={nextStepUrl}
						class="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
					>
						{hasCompletedCV ? 'Go to Dashboard' : 'Skip for Now'}
					</a>
				</div>
			{/if}
		</div>
	</GenericBoxVisible>

	{#if !loading && !success}
		<p class="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
			Error code: {error || 'unknown'}
		</p>
	{/if}
</GenericBoxInvisible>