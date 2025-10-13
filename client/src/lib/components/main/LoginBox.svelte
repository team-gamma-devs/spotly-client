<script lang="ts">
    import { Label, Input } from "flowbite-svelte";
    import {
        EnvelopeSolid,
        CheckCircleSolid,
        ExclamationCircleSolid,
    } from "flowbite-svelte-icons";
    import { Button } from "flowbite-svelte";
    import BtnGoBack from "./utils/BtnGoBack.svelte";
    import { GenericBoxInvisible, GenericBoxVisible } from "./utils";
    import { goto } from "$app/navigation";

    let loading = $state(false);

    async function handleSubmit() {
        /* This will spin until the user access the link */
        /* Modify the disable state */
        loading = true;
        await new Promise((resolve) => setTimeout(resolve, 2000));
        loading = false;
        await goto("/app/graduate/github"); // This is to simulate the flow only.
    }
</script>

<GenericBoxInvisible>
    <!-- <div
    id="login-box"
    class="flex flex-col items-center justify-center ring-2 ring-green-600 p-2 gap-3 mx-auto mt-10 mb-10 md:mt-auto md:mb-auto"
> -->
    <div
        id="form-logo-container"
        class="w-full flex items-center justify-center"
    >
        <enhanced:img
            src="$lib/assets/svgs/spotly-logo-color.svg"
            width="50"
            height="50"
            alt="Spotly Logo"
        ></enhanced:img>
        <h4 id="signup-header" class="zalando-font text-2xl">Spotly</h4>
    </div>

    <GenericBoxVisible classes="px-10">
        <!-- <div
        class="bg-background dark:bg-background
    px-7 pt-9 pb-4 rounded ring-1 ring-gray-200 dark:ring-gray-900 blur-bg shadow-lg"
    > -->
        <div
            id="form-header"
            class=" flex items-center justify-between w-full mb-4"
        >
            <h1 class="text-xl">Login</h1>
            <BtnGoBack classes="hidden md:block md:flex md:items-center md:justify-center"/>
        </div>

        <Label for="input-group-1" class="mb-2 block w-full"
            >Enter your email</Label
        >
        <Input
            id="email"
            type="email"
            placeholder="pepe@holbertonschool.com"
            maxlength={30}
            class="pl-8 w-auto sm:min-w-[300px]"
        >
            {#snippet left()}
                <EnvelopeSolid
                    class="h-5 w-5 text-gray-500 dark:text-gray-400"
                />
            {/snippet}
        </Input>
        <p class="text-sm mt-3 mb-5 text-right dark:text-gray-400 w-full">
            *Use your Holberton email
        </p>
        <a
            href="/help"
            class=" text-sm text-blue-700 hover:text-blue-800 mt-2
            dark:text-blue-300 dark:hover:text-blue-200 underline decoration-1 underline-offset-2 transition-colors block text-center"
            aria-label="Lost Holberton Account"
        >
            I lost my Holberton Account
        </a>
        <Button
            color="green"
            class="block w-48 mx-auto font-bold cursor-pointer text-white hover:bg-green-600 hover:text-white mt-10 flex items-center justify-center"
            onclick={handleSubmit}
            {loading}>Submit</Button
        >
        <!--Seems to be working altough if problems arise, revert to normal button-->

        <p
            class="m-auto text-center mt-2 flex items-center justify-center gap-2"
        >
            <CheckCircleSolid color="green" class="shrink-0 h-6 w-6" />Email
            Sent!
        </p>
        <p
            class="m-auto text-center mt-2 flex items-center justify-center gap-2"
        >
            <ExclamationCircleSolid
                color="red"
                class="shrink-0 h-6 w-6"
            />Something Went Wrong!
        </p>

        <p class="text-[10px] flex items-center justify-end mt-7 text-gray-400 w-full">
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
    </GenericBoxVisible>
    <p class="p-signup">You'll receive an access link Check your spam folder</p>
    <!-- </div> -->
</GenericBoxInvisible>

<style>
    .p-signup {
        margin: 0;
        max-width: 200px;
        text-align: center;
    }
</style>
