<script>
  import { isAuth } from '$lib/stores/auth';
//   import { browser } from '$app/environment';
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