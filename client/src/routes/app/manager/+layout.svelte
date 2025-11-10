<script lang="ts">
	import AuthBox from '$lib/components/main/utils/AuthBox.svelte';
	import Unauthorized from '$lib/components/error/Unauthorized.svelte';
	export const data: any = undefined;
</script>

<AuthBox requiredRole={'manager'} redirectOnUnauth={true}>
	{#snippet authorizedContent()}
		<slot />
	{/snippet}
	{#snippet unauthorizedContent()}
		<Unauthorized />
	{/snippet}
</AuthBox>
