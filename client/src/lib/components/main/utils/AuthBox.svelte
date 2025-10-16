<!-- <script lang="ts">
  import { page } from "$app/state";
  import { onMount } from "svelte";
  import Unauthorized from "$lib/components/error/Unauthorized.svelte";

  let { authorizedContent, unauthorizedContent } = $props();

  // user derived will be object when user is logged and null if not.

  const user = $derived(page.data.user);

  console.log(`Before mount: ${user.role}`); // Ignore this.

  onMount(() => {
    console.log(`After login the user: ${user.role}`);
  });
</script>

{#if user}
  {@render authorizedContent?.()}
{:else}
  {@render unauthorizedContent?.()}
{/if} -->

<script lang="ts">
  import { page } from "$app/state";
  import type { Snippet } from "svelte";
  import type { User } from "../../../../ambient";
  import Unauthorized from "$lib/components/error/Unauthorized.svelte";

  type AuthBoxProps = {
    authorizedContent: Snippet;
    unauthorizedContent?: Snippet;
    requiredRole?: "manager" | "graduate";
  };

  let { authorizedContent, unauthorizedContent, requiredRole }: AuthBoxProps =
    $props();

  const user: User = $derived(page.data.user);

  /**
   * A pure function to calculate the authorization status.
   */
  function getAuthStatus(
    currentUser: User,
    role?: "manager" | "graduate",
  ): "LOGGED_OUT" | "AUTHORIZED" | "UNAUTHORIZED_ROLE" {
    // console.log("Am I running?, my role is: " + user.role)
    if (!currentUser) {
      return "LOGGED_OUT";
    }
    if (role) {
      return currentUser.role === role ? "AUTHORIZED" : "UNAUTHORIZED_ROLE";
    }
    return "AUTHORIZED";
  }
  const authStatus = $derived(getAuthStatus(user, requiredRole));

</script>

{#if authStatus === 'AUTHORIZED'}
    {@render authorizedContent()}
{:else if authStatus === 'UNAUTHORIZED_ROLE'}
    <Unauthorized />
{:else if authStatus === 'LOGGED_OUT'}
    {#if unauthorizedContent}
        {@render unauthorizedContent()}
    {/if}
{/if}
