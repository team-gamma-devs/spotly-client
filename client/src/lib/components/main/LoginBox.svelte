<script lang="ts">
    import {
        EnvelopeSolid,
        CheckCircleSolid,
        ExclamationCircleSolid,
    } from "flowbite-svelte-icons";
    import BtnGoBack from "./utils/BtnGoBack.svelte";
    import { GenericBoxInvisible, GenericBoxVisible, } from "./utils";
    import LoginForm from "./utils/LoginForm.svelte";
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
        <div id="form-header" class=" flex items-center justify-between w-full mb-4">
            <h1 class="text-xl">Login</h1>
            <BtnGoBack classes="hidden md:block md:flex md:items-center md:justify-center"/>
        </div>

        <LoginForm/>

        <p
            class="text-[10px] flex items-center justify-end mt-7 text-gray-400 w-full"
        >
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
</GenericBoxInvisible>

<style>
    .p-signup {
        margin: 0;
        max-width: 200px;
        text-align: center;
    }
</style>
