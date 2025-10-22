<script>
	import { page } from '$app/state';
	import LoginBox from '$lib/components/main/LoginBox.svelte';
</script>

{#if page.data.user}
	<p>You're already logged in!</p>
{:else}
	<LoginBox />
{/if}
