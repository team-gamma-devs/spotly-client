<!-- <script lang="ts">
    import TechTag from "$lib/components/main/utils/TechTag.svelte";
    import type { FilterTag } from "$lib/constants/filterTags";
    type Props = {
        selectedTags: FilterTag[];
        deselectTag: (tag: FilterTag) => void;
    };
    let { selectedTags, deselectTag }: Props = $props();
</script>

<div
    id="selected-tags-wrapper"
    class="max-h-[200px] overflow-y-auto w-full text-white px-2 py-1 flex items-start justify-start gap-2 flex-wrap"
>
    <TechTag color="react" title="React" />
    <TechTag color="svelte" title="Svelte" />
    <TechTag color="typescript" title="TypeScript" />
    <TechTag color="angular" title="Angular" />
    <TechTag color="mongodb" title="MongoDB" />
    <TechTag color="python" title="Python" />
    <TechTag color="vue" title="Vue.js" />
    <TechTag color="node" title="Node.js" />
    <TechTag color="fastapi" title="FastAPI" />
    <TechTag color="ruby" title="Ruby" />
    <TechTag />
    <TechTag color="angular" title="Angular" />
    <TechTag color="mongodb" title="MongoDB" />
    <TechTag color="python" title="Python" />
    <TechTag color="vue" title="Vue.js" />
    <TechTag color="node" title="Node.js" />
    <TechTag color="fastapi" title="FastAPI" />
    <TechTag color="ruby" title="Ruby" />
</div> -->
<script lang="ts">
    import TechTag from "$lib/components/main/utils/TechTag.svelte";
    import type { FilterTag } from "$lib/constants/filterTags";

    type Props = {
        selectedTags: FilterTag[];
        deselectTag: (tag: FilterTag) => void;
    };

    let { selectedTags, deselectTag }: Props = $props();
</script>

<div
    id="selected-tags-wrapper"
    class="max-h-[200px] w-full flex-wrap items-start justify-start overflow-y-auto px-2 py-1 text-white"
>
    {#each selectedTags as tag (tag.code)}
        <button
            onclick={() => deselectTag(tag)}
            aria-label={`Deselect ${tag.name}`}
            type="button"
            class="inline-block mb-1 mr-1"
        >
            <TechTag {tag} checked={true} />
        </button>
    {/each}
</div>
