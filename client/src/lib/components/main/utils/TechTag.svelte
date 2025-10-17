<!-- 
    This is a component to render the teachnology filter tag.
    It must hold:
        * Checkbox: It will store the checked status for the tag. The when the user presses submit, all tags
            with the checked state will be collected and sent to the DB.
        * Title: This must be collected from the availableFilterTags constant.
        * Color: Also must be collected from the availableFilterTags.
-->
<script module lang="ts">
    // This is the svelte's component heritage equivalent. 
    // Anything declared here, is shared by all instances of this component.
    let globalCounter = 0; // +1 everytime an instance of TechTag is generated but not provieded of an userId

    export function nextId() {
        globalCounter += 1;
        return globalCounter;
    }
</script>

<script lang="ts">
    import { writable } from "svelte/store";
    import { CheckCircleOutline, TrashBinOutline } from "flowbite-svelte-icons";

    let {
        userId, // optional string
        title = "Default",
        color = "tag-default",
    }: {
        userId?: string;
        title?: string;
        color?: string;
    } = $props();

    // store that holds the current checked state of the checkbox
    // $props could make it easier, but a writable is also valid.
    export const tagSelected = writable(false);

    let hovered: boolean = $state(false);
    let uniqueId = $state("");

    const tagAction = $derived($tagSelected ? "Remove tag" : "Add tag");

    // This is to control the id's for the tags, if the tag is inside a graduate card, it gets the graduate's ID-color-tag
    // Otherwise fallbacks to a global counter, that way there are not repeated ID tags.
    $effect(() => {
        const idPart = userId ?? nextId();
        uniqueId = `${idPart}-${color}-tag`;
    });
</script>

<input
    type="checkbox"
    id={uniqueId}
    value={title}
    class="hidden peer tech-tag-checkbox"
    required={false}
    bind:checked={$tagSelected}
/>

<label
    for={uniqueId}
    class="inline-flex items-center justify-between px-2 py-0 text-white ring-2 ring-gray-200 rounded-md cursor-pointer dark:hover:text-gray-200 dark:ring-gray-700 hover:ring-accent dark:peer-checked:text-gray-300 peer-checked:ring-active-tag hover:bg-gray-50 transition-color duration-150 text-sm h-6"
    title={tagAction}
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
