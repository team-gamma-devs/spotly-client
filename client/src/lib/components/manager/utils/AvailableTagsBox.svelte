<script lang="ts">
    import TechTag from '$lib/components/main/utils/TechTag.svelte';
    import { availableFilterTags, type FilterTag } from '$lib/constants/filterTags';

    type Props = {
        keyword: string;
        selectedTags: FilterTag[];
        selectTag: (tag: FilterTag) => void;
        availableTags: string[];
        tagsError: string | null;
    };

    let { keyword, selectedTags, selectTag, availableTags, tagsError }: Props = $props();

    /**
     * Gets the list of styled tags that:
     * 1. Match a tag name from availableTags prop
     * 2. Match the search keyword (if provided)
     * 3. Are not already selected
     */
    function getFilteredTags(
        searchKeyword: string,
        currentlySelected: FilterTag[],
        availableNames: string[]
    ): FilterTag[] {
        const selectedCodes = new Set(currentlySelected.map((t) => t.code));
        
        const normalizedBackendNames = new Set(
            availableNames.map((name) => 
                name.toLowerCase().replace(/[.\s]/g, '')
            )
        );
        
        const lowerCaseKeyword = searchKeyword.toLowerCase();

        return availableFilterTags.filter((tag) => {
            const isNotSelected = !selectedCodes.has(tag.code);
            if (!isNotSelected) return false;

            const normalizedTagName = tag.name.toLowerCase().replace(/[.\s]/g, '');
            const isAvailableInBackend = normalizedBackendNames.has(normalizedTagName) || 
                                         normalizedBackendNames.has(tag.code.toLowerCase());
            if (!isAvailableInBackend) return false;

            if (!lowerCaseKeyword) return true;
            return tag.name.toLowerCase().includes(lowerCaseKeyword);
        });
    }

    const filteredTags = $derived(getFilteredTags(keyword, selectedTags, availableTags));
</script>

<div
    id="available-tags-wrapper"
    class="max-h-[200px] w-full flex-wrap items-start justify-start gap-2 overflow-y-auto px-2 py-1 text-white"
>
    {#if tagsError}
        <p class="text-sm text-red-500">Error: {tagsError}</p>
    {:else if filteredTags.length === 0}
        <p class="text-sm text-gray-400">
            {keyword ? 'No matching tags found' : 'No tags available'}
        </p>
    {:else}
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
    {/if}
</div>