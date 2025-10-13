<script lang="ts">
    import { Button } from "flowbite-svelte";
    import { CaretLeftSolid } from "flowbite-svelte-icons";
    import { goto } from '$app/navigation';

    export let targetUrl:string = "";
    export let classes:string = "";

    function handleClick(event: Event) {
        event.preventDefault();
        if (targetUrl) {
            goto(targetUrl);
        } else if (typeof window !== "undefined" && window.history.length > 1) {
            window.history.back();
        } else {
            goto("/"); // Maybe we should create a fallback? Nah
        }
    }
</script>

<Button type="button" class="cursor-pointer {classes}" outline color="dark" aria-label="Go Back" onclick={handleClick}>
    <CaretLeftSolid class="shrink-0 h-6 w-6" /> Go Back
</Button>
