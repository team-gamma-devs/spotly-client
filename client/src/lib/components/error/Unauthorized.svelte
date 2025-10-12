<script>
    import { Button } from "flowbite-svelte";
    import { UserAddSolid, UsersGroupSolid } from "flowbite-svelte-icons";
</script>


<!-- The styles for unauthorized are mostly based on NotFound CompositionEvent. -->
<div
    id="error-container"
    class="max-w-4xl w-full mx-auto m-auto flex flex-col md:flex-row items-center justify-center gap-6 p-6 md:p-10 rounded-lg shadow-lg figtree-font bg-background dark:bg-background text-foreground"
>
    <div class="hidden md:flex w-40 md:w-60 h-40 md:h-60 flex-shrink-0">
        <enhanced:img
            src="$lib/assets/svgs/spotly-unauthorized.svg"
            alt="Spotly Unauthorized"
            class="object-contain w-full h-full"
        ></enhanced:img>
    </div>

    <div
        class="flex-1 flex flex-col items-center justify-center md:items-start text-center md:text-left gap-3 p-2"
    >
        <h1 class="text-6xl md:text-9xl font-extrabold w-full text-center">401</h1>
        <h2 class="text-2xl md:text-4xl font-semibold mb-2 w-full text-center">Unauthorized</h2>
        <p class="text-sm md:text-base dark:text-gray-400 text-center">
            You must log in to see this page. Make sure you're logged in with
            the correct account.
        </p>

        <div class="w-full md:max-w-[300px] flex flex-col md:flex-row gap-3 mt-4 m-auto">
            <Button
                class="w-full bg-[#ee4a25] dark:bg-[#ee4a25] hover:bg-[#aa442d] font-bold"
            >
                <a
                    href="/login"
                    aria-label="Log In"
                    class="flex items-center gap-2 px-4 py-2"
                >
                    <UsersGroupSolid class="h-5 w-5" /> Log In
                </a>
            </Button>
        </div>
    </div>
</div>

<style>
    #error-container {
        border: 1px solid rgba(0, 0, 0, 0.06);
        border-radius: 0.75rem;
        box-shadow: 0 6px 24px rgba(8, 15, 30, 0.06);
    }
</style>
