<div
    id="text-container"
    class="nice-bg flex flex-col justify-center items-center px-4 ring-2"
>
    <div
        class="mt-auto flex flex-col justify-center items-center text-white zalando-font text-center"
    >
        <h2 class="text-base sm:text-lg md:text-xl lg:text-[1.5dvw]">
            COMING SOON!
        </h2>
        <h1 class="text-3xl sm:text-4xl md:text-6xl lg:text-[5dvw] font-bold mt-2">
            SPOTLY
        </h1>
        <h3 class="text-sm sm:text-base md:text-lg lg:text-[1dvw]">
            Team Gamma Devs
        </h3>
    </div>
    
    <div id="gettings-things-ready" class="flex flex-col items-center justify-center gap-4 my-8 sm:my-12">
        <!-- Message -->
        <div class="text-center text-white/90 max-w-md px-6">
            <p class="text-base sm:text-lg md:text-xl font-semibold mb-2">
                We're Working Hard!
            </p>
            <p class="text-sm sm:text-base text-white/70">
                Our team is putting the finishing touches on something special. Stay tuned!
            </p>
        </div>
        
        <!-- Progress dots -->
        <div class="flex gap-2">
            <span class="dot dot-1"></span>
            <span class="dot dot-2"></span>
            <span class="dot dot-3"></span>
        </div>
    </div>
    
    <div id="footer" class="mt-auto mb-6 sm:mb-10">
        <a
            href="https://holbertonschool.uy/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Link to Holberton Uruguay"
        >
            <img
                id="holberton-logo-img"
                src="/images/holberton-logo.png"
                alt="Holberton Logo"
                class="w-32 sm:w-40 md:w-48 lg:w-[10dvw] max-w-[200px]"
            />
        </a>
    </div>
</div>

<style>
    .nice-bg {
        background-color: rgb(18, 17, 17);
        background-image: url("/images/abstract-bg-dark-desktop.webp");
        background-size: cover;
        background-position: center;
        min-height: 100vh;
        width: 100dvw;
    }
    
    #holberton-logo-img {
        filter: brightness(100);
    }
    
    
    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    
    /* Animated dots */
    .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.6);
        animation: pulse 1.5s ease-in-out infinite;
    }
    
    .dot-1 {
        animation-delay: 0s;
    }
    
    .dot-2 {
        animation-delay: 0.3s;
    }
    
    .dot-3 {
        animation-delay: 0.6s;
    }
    
    @keyframes pulse {
        0%, 100% {
            opacity: 0.3;
            transform: scale(1);
        }
        50% {
            opacity: 1;
            transform: scale(1.2);
        }
    }
</style>