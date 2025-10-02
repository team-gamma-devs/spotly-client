<!-- <script> FAIILED!
    let imageLoaded = false;
    let showContent = false;

    function handleImageLoad() {
        console.log('Image loaded');
        imageLoaded = true;
        showContent = true;
    }

    function handleImageError() {
        console.log('Image error');
        showContent = true;
    }

    import { onMount } from "svelte";

    onMount(() => {
        console.log('Component mounted');
        const isMobile = window.innerWidth < 768;
        console.log('Is mobile:', isMobile);
        if (isMobile) {
            showContent = true;
        }
        
        // forcing content after 2 seconds
        setTimeout(() => {
            showContent = true;
        }, 100);
    });

    $: console.log('showContent:', showContent);
</script> -->

<div
    id="error-container"
    class="flex m-2 bg-white"
>
    <img
        src="/spotly-error.svg"
        alt="Error Symbol"
        width="300"
        class="hidden md:block"
    />
    <div
        class="error-border flex flex-col items-center justify-center text-center"
    >
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
        box-shadow: 10px 10px 50px rgb(226, 225, 225);
        gap: 5rem;
        transition: opacity 0.3s ease-in-out;
    }
</style>