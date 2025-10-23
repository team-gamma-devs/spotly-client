<script>
	import { page } from '$app/state';
	import LoginBox from '$lib/components/main/LoginBox.svelte';
	import GenericBoxVisible from '$lib/components/main/utils/GenericBoxVisible.svelte';
	import BtnGoBack from '$lib/components/main/utils/BtnGoBack.svelte';
</script>

{#if page.data.user}
	<GenericBoxVisible classes="gap-5 px-20 py-10">
		<p>You're already logged in!</p>
		<BtnGoBack />
	</GenericBoxVisible>
{:else}
	<LoginBox />
{/if}
