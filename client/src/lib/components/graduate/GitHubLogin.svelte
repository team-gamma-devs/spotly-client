<script lang="ts">
    import { isLoggedGithub } from "$lib/stores/auth";
    import { P } from "flowbite-svelte";
    import BtnGitHubLogin from "./utils/BtnGitHubLogin.svelte";

    // Maybe here we need to implement a store that tells us wether the user has already logged in
    // to his github account and if it has,
</script>

<div
    id="github-login-box"
    class="flex flex-col items-center justify-center ring-2 ring-green-600 p-2 gap-3 mx-auto mt-10 mb-10 md:mt-auto md:mb-auto"
>
    <div
        id="form-logo-container"
        class="w-full ring-2 ring-red-500 flex items-center justify-center"
    >
        <enhanced:img
            src="$lib/assets/svgs/spotly-logo-color.svg"
            width="50"
            height="50"
            alt="Spotly Logo"
        ></enhanced:img>
        <h4 id="signup-header" class="zalando-font text-2xl">Spotly</h4>
    </div>
    <div
        class="flex flex-col items-center justify-center bg-background dark:bg-background
    p-5 rounded ring-1 ring-gray-200 dark:ring-gray-900 blur-bg"
    >
        <div
            id="info-box"
            class="flex flex-col items-center justify-center gap-3 px-2 pt-1 pb-3"
        >
            {#if $isLoggedGithub}
                You're already logged in to your GitHub account
            {:else}
                <h1 class="text-xl">
                    Connect your <strong>GitHub</strong> account
                </h1>
                <p class="login-p dark:text-gray-400">
                    By connecting your GitHub account, you'll be able to see
                    your GitHub statistics.
                </p>
                <p class="login-p dark:text-gray-400">
                    We can't access your account, your data is only accessible
                    to you.
                </p>
                <BtnGitHubLogin />
                <a
                    href="/app/graduate/github/help"
                    class="text-xs text-foreground dark:text-gray-500 hover:text-blue-800
            dark:text-blue-300 dark:hover:text-blue-200 underline decoration-1 underline-offset-2 transition-colors block text-center"
                    aria-label="GitHub Data Help"
                >
                    How we use your <b>GitHub</b> data.
                </a>
            {/if}
        </div>
    </div>
    <a
        href="/app/graduate/upload_cv"
        class="text-sm text-foreground hover:text-blue-800 mt-2 dark:hover:text-blue-200 underline
        decoration-1 underline-offset-2 transition-colors block text-center"
        aria-label="Continue without login in to github"
    >
        Continue without login in to GitHub...
    </a>
</div>

<style>
    .login-p {
        margin: 0;
        max-width: 300px;
        text-align: center;
        font-size: 0.85rem;
    }
</style>
