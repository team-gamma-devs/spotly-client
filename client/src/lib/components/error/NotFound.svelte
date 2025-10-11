<div
    id="error-container"
    class="flex flex-col m-auto md:flex-row m-4 bg-white text-black dark:text-black items-center justify-center gap-6 p-6 md:p-10 rounded-lg shadow-lg figtree-font"
>
    <div
        class="hidden md:flex w-48 md:w-[300px] h-48 md:h-[300px] flex-shrink-0"
    >
        <enhanced:img
            src="$lib/assets/svgs/spotly-error.svg"
            alt="Spotly Error Symbol"
            class="object-contain w-full h-full"
        />
    </div>

    <div
        class="flex-1 flex flex-col items-center md:items-start justify-center text-center md:text-left p-4 md:p-6"
    >
        <h1 class="text-6xl md:text-9xl leading-tight m-auto">404</h1>
        <h2 class="text-2xl md:text-4xl font-semibold mb-3 md:mb-6 m-auto">
            Not Found
        </h2>
        <p
            class="max-w-xl text-sm md:text-base text-gray-600"
        >
            The page you requested is not available.
        </p>
        <p class="text-sm text-gray-500 mt-3">
            Please check the URL or return to the
            <a
                href="/"
                class="ml-1 text-primary-600 dark:text-primary-400 underline"
                >homepage</a
            >.
        </p>
    </div>
</div>

<style>
    #error-container {
        box-sizing: border-box;
    }
    /* Commented out cause it fucks up in chrome, Don't want to handle caching right now */
    /* opacity: 0; */
    /* animation: fadeIn 0.1s ease-in-out forwards; */

    /* @keyframes fadeIn {
        to {
            opacity: 1;
        }
    } */
</style>
