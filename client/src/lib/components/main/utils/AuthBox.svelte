<script lang="ts">
  import { page } from '$app/state';
    import { onMount } from "svelte";

  let { authorizedContent, unauthorizedContent } = $props();

  // user derived will be object when user is logged and null if not.
  
  const user = $derived(page.data.user);

  console.log(`Before mount: ${user}`); // Ignore this.

  onMount(()=>{
    console.log(`After login the user: ${user}`);
  })

</script>

{#if !!$user }
  {@render authorizedContent?.()}
{:else}
  {@render unauthorizedContent?.()}
{/if}