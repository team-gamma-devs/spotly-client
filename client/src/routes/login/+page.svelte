<script>
	import { page } from '$app/state';
	import LoginBox from '$lib/components/main/LoginBox.svelte';
	import { GenericBoxVisible, GenericBoxInvisible} from '$lib/components/main/utils';
	import BtnGoBack from '$lib/components/main/utils/BtnGoBack.svelte';

	let error = $derived(page.url.searchParams.get('error'));
</script>

<GenericBoxInvisible classes="pb-35">
	{#if page.data.user}
		<GenericBoxVisible classes="gap-5 px-20 py-0 pb-10">
			<p>You're already logged in!</p>
			<BtnGoBack targetUrl="/" />
		</GenericBoxVisible>
	{:else}
		{#if error}
			<GenericBoxVisible classes="gap-3 px-10 py-5 mb-5 bg-red-50 border border-red-200">
				{#if error === 'link_expired'}
					<p class="text-red-600">Your login link has expired. Please request a new one.</p>
				{:else if error === 'access_denied'}
					<p class="text-red-600">Access was denied. Please try again.</p>
				{:else if error === 'verification_failed'}
					<p class="text-red-600">Verification failed. Please try again.</p>
				{:else if error === 'missing_token'}
					<p class="text-red-600">Invalid login link. Please request a new one.</p>
				{:else}
					<p class="text-red-600">An error occurred: {error}</p>
				{/if}
			</GenericBoxVisible>
		{/if}
		<LoginBox />
	{/if}
</GenericBoxInvisible>
