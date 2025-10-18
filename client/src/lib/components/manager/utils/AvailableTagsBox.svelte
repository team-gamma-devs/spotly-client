<script lang="ts">
    import TechTag from "$lib/components/main/utils/TechTag.svelte";
    import {
        availableFilterTags,
        type FilterTag,
    } from "$lib/constants/filterTags";

    type Props = {
        keyword: string;
        selectedTags: FilterTag[];
        selectTag: (tag: FilterTag) => void;
    };

    let { keyword, selectedTags, selectTag }: Props = $props();

    /**
     * Gets the list of available tags.
     * It filters based on a search keyword and excludes already selected tags.
     * 
     *  A: The tag must not already be selected.
     *  B: If there's no keyword, show all unselected tags.
     *  C: If there is a keyword, the tag's name must include it.
     */
    function getFilteredTags(
        searchKeyword: string,
        currentlySelected: FilterTag[],
    ): FilterTag[] {
        const selectedCodes = new Set(currentlySelected.map((t) => t.code));
        const lowerCaseKeyword = searchKeyword.toLowerCase();

        return availableFilterTags.filter((tag) => {
            const isNotSelected = !selectedCodes.has(tag.code);
            if (!isNotSelected) return false;
            if (!lowerCaseKeyword) return true;
            return tag.name.toLowerCase().includes(lowerCaseKeyword);
        });
    }
    const filteredTags = $derived(getFilteredTags(keyword, selectedTags));
</script>

<div
    id="available-tags-wrapper"
    class="max-h-[200px] w-full flex-wrap items-start justify-start gap-2 overflow-y-auto px-2 py-1 text-white"
>
    {#each filteredTags as tag (tag.code)}
        <button
            onclick={() => selectTag(tag)}
            aria-label={`Select ${tag.name}`}
            type="button"
            class="inline-block mb-1 mr-1"
        >
            <TechTag {tag} checked={false} />
        </button>
    {/each}
</div>
