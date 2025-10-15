<script lang="ts">
  import { getUserStore } from "$lib/stores/session";

  let { authorizedContent, unauthorizedContent } = $props();
  
  const user = getUserStore();

</script>

{#if !!$user }
  {@render authorizedContent?.()}
{:else}
  {@render unauthorizedContent?.()}
{/if}