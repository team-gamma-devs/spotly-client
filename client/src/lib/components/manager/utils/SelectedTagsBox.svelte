<script lang="ts">
    import TechTag from "$lib/components/main/utils/TechTag.svelte";
</script>

<div
    id="selected-tags-wrapper"
    class="min-h-[60px] max-h-[300px] w-full text-white px-2 py-1 flex items-start justify-start gap-2 flex-wrap"
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
</div>
