<script lang="ts">
    import { Label, Input } from "flowbite-svelte";
    import {
        EnvelopeSolid,
        CheckCircleSolid,
        ExclamationCircleSolid,
    } from "flowbite-svelte-icons";
    import { GradientButton } from "flowbite-svelte";
    import { goto } from "$app/navigation"; // will use to redirect to main dashboard
    import { isLoggedGithub } from "$lib/stores/auth";
    import BtnGitHubLogin from "./utils/BtnGitHubLogin.svelte";

    let loading = $state(false);

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
    p-5 rounded ring-1 ring-gray-200 dark:ring-gray-700"
    >
        <div
            id="info-box"
            class="flex flex-col items-center justify-center gap-3"
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
                <BtnGitHubLogin/>
            {/if}
            <a
                href="/app/graduate/github/help"
                class="text-sm text-primary-400 dark:text-primary-300 hover:text-blue-800 mt-2
            dark:text-blue-300 dark:hover:text-blue-200 underline decoration-2 underline-offset-2 transition-colors block text-center"
                aria-label="GitHub Data Help"
            >
                How we use your <b>GitHub</b> data.
            </a>
        </div>
    </div>
</div>

<style>
    .login-p {
        margin: 0;
        max-width: 300px;
        text-align: center;
        font-size: 0.85rem;
    }
</style>
