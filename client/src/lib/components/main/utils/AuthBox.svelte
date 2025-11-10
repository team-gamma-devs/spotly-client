<script lang="ts">
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';
	import type { UserState } from '../../../../ambient';
	import Unauthorized from '$lib/components/error/Unauthorized.svelte'; // Can't use 
	import { goto } from '$app/navigation';

	type AuthBoxProps = {
		authorizedContent: Snippet;
		unauthorizedContent?: Snippet;
		requiredRole?: 'manager' | 'graduate';
		redirectOnUnauth?: boolean; // Whether to redirect when user is not authorized
	};

	let { authorizedContent, unauthorizedContent, requiredRole, redirectOnUnauth = false }: AuthBoxProps = $props();

	const user: UserState = $derived(page.data.user);

	/**
	 * A pure function to calculate the authorization status.
	 */
	function getAuthStatus(
		currentUser: UserState,
		role?: 'manager' | 'graduate',
	): 'LOGGED_OUT' | 'AUTHORIZED' | 'UNAUTHORIZED_ROLE' {
		if (!currentUser) {
			return 'LOGGED_OUT';
		}
		if (role) {
			return currentUser.role === role ? 'AUTHORIZED' : 'UNAUTHORIZED_ROLE';
		}
		return 'AUTHORIZED';
	}

	const authStatus = $derived(getAuthStatus(user, requiredRole));

	$effect(() => {
		if (redirectOnUnauth) {
			if (authStatus === 'LOGGED_OUT') {
				goto('/login');
			} else if (authStatus === 'UNAUTHORIZED_ROLE') {
				goto('/');
			}
		}
	});
</script>

{#if authStatus === 'AUTHORIZED'}
	{@render authorizedContent()}
{:else if unauthorizedContent}
	{@render unauthorizedContent()}
{/if}
