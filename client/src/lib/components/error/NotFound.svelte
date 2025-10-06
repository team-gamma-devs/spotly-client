<div id="error-container" class="flex m-2 bg-white text-black">
    <div class="hidden md:block w-[300px] h-[300px] relative">
         <enhanced:img src="$lib/assets/svgs/spotly-error.svg" alt="Spotly Error Symbol"></enhanced:img>
    </div>
    
    <div class="error-border flex flex-col items-center justify-center text-center">
        <h1 class="text-9xl">404</h1>
        <h2 class="text-4xl mb-5">Not Found</h2>
        <p>The page you requested is not available.</p>
        <p class="text-sm text-gray-500 mt-2">
            Please check the URL or return to the homepage.
        </p>
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

    /* @keyframes fadeIn {
        to {
            opacity: 1;
        }
    } */
</style>