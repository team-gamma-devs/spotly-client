<script lang="ts">
  import { isAuth, userRole } from '$lib/stores/auth';
  // import { publicRoutes } from '$lib/constants/urls';
  // import { onMount, onDestroy } from 'svelte';
  // import { browser } from '$app/environment';
  // import type { Unsubscriber } from 'svelte/store';

  let { authorizedContent, unauthorizedContent } = $props();

  // This is to avoid server/client mismatch.
  // only show auth-specific UI on the client
//   const showAuth = $derived(() => browser && $isAuth);

</script>

{#if $isAuth}
  {@render authorizedContent?.()}
{:else}
  {@render unauthorizedContent?.()}
{/if}