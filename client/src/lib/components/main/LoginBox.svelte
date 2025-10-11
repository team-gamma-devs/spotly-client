<script lang="ts">
    import { Label, Input } from "flowbite-svelte";
    import {
        EnvelopeSolid,
        CheckCircleSolid,
        ExclamationCircleSolid,
    } from "flowbite-svelte-icons";
    import { GradientButton } from "flowbite-svelte";

    let loading = $state(false);

    async function handleSubmit() {
        /* This will spin until the user access the link */
        loading = true;
        await new Promise((resolve) => setTimeout(resolve, 2000));
        loading = false;
    }
</script>

<div
    id="login-box"
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
        class="bg-background dark:bg-background
    p-5 rounded ring-1 ring-gray-200 dark:ring-gray-700"
    >
        <Label for="input-group-1" class="mb-2 block">Enter your email</Label>
        <Input
            id="email"
            type="email"
            placeholder="pepe@holbertonschool.com"
            maxlength={30}
            class="pl-8 min-w-[300px]"
        >
            {#snippet left()}
                <EnvelopeSolid
                    class="h-5 w-5 text-gray-500 dark:text-gray-400"
                />
            {/snippet}
        </Input>
        <p class="text-sm mt-3 text-right dark:text-gray-400">
            *Use your Holberton email
        </p>
        <a
            href="/help"
            class="ring-2 ring-red-300 text-sm text-blue-700 hover:text-blue-800 mt-2
            dark:text-blue-300 dark:hover:text-blue-200 underline decoration-2 underline-offset-2 transition-colors block text-center"
            aria-label="Lost Holberton Account"
        >
            I lost my Holberton Account
        </a>
        <GradientButton
            color="pinkToOrange"
            class="block w-48 mx-auto font-bold cursor-pointer bg-green-700 text-white hover:bg-green-600 hover:text-white mt-5 flex items-center justify-center"
            onclick={handleSubmit}
            {loading}>Submit</GradientButton
        >

        <p
            class="m-auto ring-2 text-center mt-2 flex items-center justify-center gap-2"
        >
            <CheckCircleSolid color="green" class="shrink-0 h-6 w-6" />Email
            Sent!
        </p>
        <p
            class="m-auto ring-2 text-center mt-2 flex items-center justify-center gap-2"
        >
            <ExclamationCircleSolid
                color="red"
                class="shrink-0 h-6 w-6"
            />Something Went Wrong!
        </p>

        <p class="text-[10px] ring-2 flex items-center justify-end mt-3">
            Powered By <enhanced:img
                src="$lib/assets/svgs/aws_cognito.svg"
                alt="AWS Cognito"
                class="rounded ml-2 mr-1"
                width="15"
                height="15"
            ></enhanced:img><a
                href="https://aws.amazon.com/pm/cognito"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Amazon Cognito"><b>Amazon Cognito</b></a
            >
        </p>
    </div>
    <p class="p-signup">You'll receive an access link Check your spam folder</p>
</div>

<style>
    .p-signup {
        margin: 0;
        max-width: 200px;
        text-align: center;
    }
</style>
