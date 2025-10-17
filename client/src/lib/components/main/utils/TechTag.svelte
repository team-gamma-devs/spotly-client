<!-- 
    This is a component to render the teachnology filter tag.
    It must hold:
        * Checkbox: It will store the checked status for the tag. The when the user presses submit, all tags
            with the checked state will be collected and sent to the DB.
        * Title: This must be collected from the availableFilterTags constant.
        * Color: Also must be collected from the availableFilterTags.
-->

<script lang="ts">
    import { writable } from "svelte/store";
    import { CheckCircleOutline, TrashBinOutline } from "flowbite-svelte-icons";

    export const userId: string = "default-user-id";
    export const title: string = "Default";
    export const color: string = "react"; // Used for class binding

    let hovered: boolean = $state(false);

    // store that holds the current checked state of the checkbox
    // $props could make it easier, but a writable is also valid.

    export const tagSelected = writable(false);
</script>

<input
    type="checkbox"
    id="{color}-option"
    value={title}
    class="hidden peer tech-tag-checkbox"
    required={false}
    bind:checked={$tagSelected}
/>

<label
    for="{color}-option"
    class="inline-flex items-center justify-between px-2 py-0 text-white ring-2 ring-gray-200 rounded-md cursor-pointer dark:hover:text-gray-200 dark:ring-gray-700 hover:ring-accent dark:peer-checked:text-gray-300 peer-checked:ring-active-tag hover:bg-gray-50 transition-color duration-150 text-sm h-6"
    style="background-color: var(--color-{color});"
    onmouseover={() => {
        hovered = true;
        console.log("Hovered!");
    }}
    onfocus={() => {
        () => {
            hovered = true;
            console.log("Hovered!");
        };
    }}
    onmouseleave={() => {
        hovered = false;
        console.log("Hovered!");
    }}
>
    {#if $tagSelected}
        <div class="symbol-container mr-1 flex items-center justify-center">
            <div class:hidden={!hovered} class="discard-symbol mr-.5">
                <TrashBinOutline class="text-white h-3 w-3" />
            </div>

            <div class:hidden={hovered} class="selected-symbol mr-.5">
                <CheckCircleOutline class="text-white h-3 w-3" />
            </div>
        </div>
    {/if}
    <div class="block flex items-center justify-center p-0 m-0">{title}</div>
</label>
