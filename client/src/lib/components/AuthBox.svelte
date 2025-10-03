<script>
    import { isAuth } from "$lib/stores/auth";

    let { authorizedContent, unauthorizedContent } = $props();
</script>

{#if $isAuth}
    {@render authorizedContent?.()}
{:else}
    {@render unauthorizedContent?.()}
{/if}