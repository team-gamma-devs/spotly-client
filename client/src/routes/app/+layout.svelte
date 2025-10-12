<script lang="ts">
  import AuthBox from "$lib/components/main/util/AuthBox.svelte";
  import Unauthorized from "$lib/components/error/Unauthorized.svelte";
  export const data: any = undefined;
</script>

<AuthBox>
  {#snippet authorizedContent()}
    <slot />
  {/snippet}
  {#snippet unauthorizedContent()}
    <Unauthorized />
  {/snippet}
</AuthBox>
