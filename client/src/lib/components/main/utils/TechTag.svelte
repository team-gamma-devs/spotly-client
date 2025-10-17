<!-- 
    This is a component to render the teachnology filter tag.
    It must hold:
        * Checkbox: It will store the checked status for the tag. The when the user presses submit, all tags
            with the checked state will be collected and sent to the DB.
        * Title: This must be collected from the availableFilterTags constant.
        * Color: Also must be collected from the availableFilterTags.
-->
<!-- <script lang="ts">
    import { writable } from "svelte/store";
    import { CheckCircleOutline, TrashBinOutline } from "flowbite-svelte-icons";

    export const userId = "pepe1";
    export const title = "React";
    export const color = "react";

    // store that holds the current checked state of the checkbox with id `${color}-option`
    export const tagSelected = writable(false);
</script>

<input
    type="checkbox"
    id="{color}-option"
    value=""
    class="hidden peer tech-tag-checkbox"
    required={false}
    bind:checked={$tagSelected}
/>
<label
    for="{color}-option"
    class="inline-flex items-center justify-between px-2 py-0 text-foreground bg-{color} border-2 border-gray-200 rounded-md cursor-pointer dark:hover:text-gray-200 dark:border-gray-700 peer-checked:border-accent dark:peer-checked:border-accent hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-white dark:bg-{color} dark:hover:bg-gray-700"
>
    {#if $tagSelected}
         Shows if tag selected, but not if selected and hovered.$host
        <div class="selected-symbol">
            <CheckCircleOutline class="dark:text-green-400" />
        </div>
        Shows if tag is hovered, must overwrite div.class-box
        <div class="discard-symbol">
            <TrashBinOutline class="dark:text-red-400" />
        </div>
    {/if}
    <div class="block">
        <div class="w-full text-lg font-semibold">{title}</div>
    </div>
</label> -->

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
    value="{title}"
    class="hidden peer tech-tag-checkbox"
    required={false}
    bind:checked={$tagSelected}
/>

<label
    for="{color}-option"
    class="inline-flex items-center justify-between px-2 py-0 text-white ring-2 ring-gray-200 rounded-md cursor-pointer dark:hover:text-gray-200 dark:ring-gray-700 hover:ring-accent dark:peer-checked:text-gray-300 hover:bg-gray-50 transition-color duration-150 text-sm"
    style="background-color: var(--color-{color});"
    onmouseover={()=>{hovered = true; ; console.log("Hovered!")}}
    onfocus={()=>{()=>{hovered = true; ; console.log("Hovered!")}}}
    onmouseleave={()=>{hovered = false; ; console.log("Hovered!")}}
>
    {#if $tagSelected}
        <div class="symbol-container mr-1 w-4 h-4 flex items-center justify-center">
            <div class:hidden={!hovered} class="discard-symbol mr-1">
                <TrashBinOutline class="text-white h-3.5 w-3.5" />
            </div>

            <div class:hidden={hovered} class="selected-symbol mr-1">
                <CheckCircleOutline class="text-white h-3.5 w-3.5" />
            </div>
        </div>
    {/if}
    <div class="block flex items-center justify-center p-0 m-0">{title}</div>
</label>