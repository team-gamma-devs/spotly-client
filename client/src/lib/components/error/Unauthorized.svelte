<script>
    import { Button } from "flowbite-svelte";
    import { UserAddSolid, UsersGroupSolid } from "flowbite-svelte-icons";
</script>

<div
    id="error-container"
    class="flex m-2 bg-white text-black my-auto items-center justify-center"
>
    <div class="hidden md:block relative">
        <enhanced:img
            src="$lib/assets/svgs/spotly-unauthorized.svg"
            alt="Spotly Error Symbol"
        ></enhanced:img>
    </div>

    <div
        class="error-border flex flex-col items-center justify-center text-center"
    >
        <h1 class="text-9xl">401</h1>
        <h2 class="text-4xl mb-5">Unauthorized</h2>
        <p>You must login to see this page.</p>
        <p class="text-sm text-gray-500 mt-2">Make sure you're logged in.</p>
        <Button
            class="w-full cursor-pointer m-4 bg-[#ee4a25] dark:bg-[#ee4a25] hover:bg-[#aa442d] hover:dark:bg-[#aa442d] font-bold"
        >
            <a
                href="/login"
                aria-label="Log In"
                class="flex items-center justify-center"
                ><UsersGroupSolid class="me-2 h-5 w-5 inline" />Log In</a
            >
        </Button>
        <p>Or...</p>
        <Button
            outline
            class="w-full cursor-pointer mt-2 mb-0 outline-[#ee4a25] text-[#ee4a25] dark:text-[#ee4a25] font-bold dark:text-primary-700 hover:bg-[#aa442d] hover:dark:bg-[#aa442d]"
        >
            <a
                href="/signup"
                aria-label="Sign Up"
                class="flex items-center justify-center"
            >
                <UserAddSolid class="me-2 h-5 w-5 inline" /> Sign Up
            </a>
        </Button>
    </div>
</div>

<style>
    #error-container {
        border: 2px solid rgb(230, 225, 222);
        border-radius: 1em;
        padding: 10em;
        box-shadow: 10px 10px 50px var(--color-box-shadow);
        gap: 5rem;
        /* Commented out cause it fucks up in chrome, Don't want to handle caching right now */
        /* opacity: 0; */
        /* animation: fadeIn 0.1s ease-in-out forwards; */
    }
</style>
