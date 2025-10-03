<script lang="ts">
    import { onMount } from "svelte";

    let timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    };

    let interval: ReturnType<typeof setInterval>;

    function updateCountdown() {
        const targetDate = new Date("2025-10-20T00:00:00").getTime();
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor(
                    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
                ),
                minutes: Math.floor(
                    (difference % (1000 * 60 * 60)) / (1000 * 60),
                ),
                seconds: Math.floor((difference % (1000 * 60)) / 1000),
            };
        } else {
            timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
            if (interval) clearInterval(interval);
        }
    }

    onMount(() => {
        updateCountdown();
        interval = setInterval(updateCountdown, 1000);

        return () => {
            if (interval) clearInterval(interval);
        };
    });
</script>

<div
    id="text-container"
    class="nice-bg flex flex-col justify-center items-center px-4"
>
    <div
        class="mt-auto flex flex-col justify-center items-center text-white zalando-font text-center"
    >
        <h2 class="text-base sm:text-lg md:text-xl lg:text-[1.5dvw]">
            COMING SOON!
        </h2>
        <h1
            class="text-3xl sm:text-4xl md:text-6xl lg:text-[5dvw] font-bold mt-2"
        >
            SPOTLY
        </h1>
        <div
            class="countdown-container bg-black/30 backdrop-blur-sm rounded-lg p-4 sm:p-6 md:p-8 my-4 sm:my-6 md:my-8"
        >
            <div class="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 text-center">
                <div class="countdown-item">
                    <div
                        class="text-xl sm:text-3xl md:text-4xl lg:text-[2dvw] font-bold text-white"
                    >
                        {timeLeft.days.toString().padStart(2, "0")}
                    </div>
                    <div
                        class="text-xs sm:text-sm md:text-base lg:text-[0.8dvw] text-gray-300 uppercase tracking-wider"
                    >
                        Days
                    </div>
                </div>
                <div class="countdown-item">
                    <div
                        class="text-xl sm:text-3xl md:text-4xl lg:text-[2dvw] font-bold text-white"
                    >
                        {timeLeft.hours.toString().padStart(2, "0")}
                    </div>
                    <div
                        class="text-xs sm:text-sm md:text-base lg:text-[0.8dvw] text-gray-300 uppercase tracking-wider"
                    >
                        Hours
                    </div>
                </div>
                <div class="countdown-item">
                    <div
                        class="text-xl sm:text-3xl md:text-4xl lg:text-[2dvw] font-bold text-white"
                    >
                        {timeLeft.minutes.toString().padStart(2, "0")}
                    </div>
                    <div
                        class="text-xs sm:text-sm md:text-base lg:text-[0.8dvw] text-gray-300 uppercase tracking-wider"
                    >
                        Minutes
                    </div>
                </div>
                <div class="countdown-item">
                    <div
                        class="text-xl sm:text-3xl md:text-4xl lg:text-[2dvw] font-bold text-white"
                    >
                        {timeLeft.seconds.toString().padStart(2, "0")}
                    </div>
                    <div
                        class="text-xs sm:text-sm md:text-base lg:text-[0.8dvw] text-gray-300 uppercase tracking-wider"
                    >
                        Seconds
                    </div>
                </div>
            </div>
        </div>

        <h3 class="text-sm sm:text-base md:text-lg lg:text-[1dvw]">
            Team Gamma Devs
        </h3>
    </div>

    <div id="footer" class="mt-auto mb-6 sm:mb-10">
        <a
            href="https://holbertonschool.uy/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Link to Holberton Uruguay"
            ><img
                id="holberton-logo-img"
                src="/images/holberton-logo.png"
                alt="Holberton Logo"
                class="w-32 sm:w-40 md:w-48 lg:w-[10dvw] max-w-[200px]"
            /></a
        >
    </div>
</div>

<style>
    .nice-bg {
        background-image: url("../assets/svgs/scales-background.svg");
        background-size: cover;
        background-position: center;
        min-height: 100vh;
    }
    .zalando-font {
        font-family: "Zalando Sans Expanded", sans-serif;
    }
    #holberton-logo-img {
        filter: brightness(100);
    }
    @media (max-width: 390px) {
        .tracking-wider {
            font-size: .5rem;
        }
    }
</style>
