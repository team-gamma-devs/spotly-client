<script lang="ts">
    import { GithubSolid } from "flowbite-svelte-icons";
    import { Button } from "flowbite-svelte";
    import { goto } from "$app/navigation";
    import { loginGithub } from "$lib/services/github/githubLogin";

    let loading = $state(false);

    async function handleSubmit() {
        if (loading) return;
        loading = true;
        try {
            const result = await loginGithub(); // i don't know how if redirect manually or await for redirection.
            if (typeof result === "string" && result) {
                window.location.href = result;
                return;
            }
            await goto("/app/graduate");
        } catch (err) {
            console.error("GitHub login failed", err);
        } finally {
            loading = false;
        }
    }
</script>

<Button
    color="alternative"
    class="bg-gray-800 text-white flex items-center justify-center gap-1 cursor-pointer my-3"
    onclick={handleSubmit}
    loading={loading}
    aria-busy={loading}
>
    <GithubSolid class="block" /> Connect <strong>GitHub</strong>
</Button>
