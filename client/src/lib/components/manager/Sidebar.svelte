<script lang="ts">
    import {
        Sidebar,
        SidebarGroup,
        SidebarItem,
        SidebarButton,
        SidebarDropdownWrapper,
        uiHelpers,
        Label,
        Input,
        Button,
    } from "flowbite-svelte";
    import { FilterSolid, TrashBinOutline } from "flowbite-svelte-icons";
    import { FilterBox, SelectedTagsBox, AvailableTagsBox } from "./utils/";
    import { onMount } from "svelte";
    import ManagerInventory from "./ManagerInventory.svelte";
    import {
        availableFilterTags,
        type FilterTag,
    } from "$lib/constants/filterTags";

    const spanClass = "flex-1 ms-3 whitespace-nowrap"; // Don't delete.
    const demoSidebarUi = uiHelpers();
    const closeDemoSidebar = demoSidebarUi.close;

    let activeClass = "p-2 bg-primary-300 dark:bg-primary-300 hover:bg-red-100";
    let nonActiveClass = "p-2 hover:bg-primary-100";

    let techKeyword = $state(""); // State for controlling the technology text input.
    let selectedTags = $state<FilterTag[]>([]);
    let isDemoOpen = $state(false); // Controls the sidebar open/close state
    let selectedFilter = $state(""); // Selected filter used in conjuction with showTextInput. This is for the menu, not the tech tags
    let activeUrl = $state("Technologies"); // To control the sidebar menus.
    let loading = $state(false);

    // NEW: State for English level and tutors
    let multiSelectedEnglishLevel = $state<string[]>([]);
    let multiSelectedTutors = $state<string[]>([]);

    $effect(() => {
        isDemoOpen = demoSidebarUi.isOpen;
    });

    function selectTag(tag: FilterTag) {
        if (!selectedTags.find((t) => t.code === tag.code)) {
            selectedTags.push(tag);
        }
    }

    function deselectTag(tag: FilterTag) {
        selectedTags = selectedTags.filter((t) => t.code !== tag.code);
    }

    async function handleSubmit() {
        loading = true;

        // Build the query object
        const tagsToQuery = {
            technologies: selectedTags.map((tag) => tag.name),
            englishLevel: multiSelectedEnglishLevel,
            tutorsFeedback: multiSelectedTutors,
        };

        console.log("Query Object:", tagsToQuery);
        console.log("JSON String:", JSON.stringify(tagsToQuery, null, 2));

        // TODO: Send to backend here
        // await fetch('/api/search', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(tagsToQuery)
        // });

        await new Promise((resolve) => setTimeout(resolve, 2000));
        loading = false;
    }

    onMount(() => {
        applyFullHeightToNinjaElement();
        applySidebarConstraints();
    });

    const applyFullHeightToNinjaElement = () => {
        const el = document.querySelector("#son-of-ninja-element");
        if (el?.parentElement) {
            el.parentElement.classList.add("h-full");
            el.parentElement.classList.add("md:h-full");
            el.parentElement.classList.add("sm:h-full");
            console.log("Full height to ninja");
        }
    };

    const applySidebarConstraints = () => {
        const sidebarWrapper =
            document.querySelector('[class*="fixed"][class*="inset-y-0"]') ||
            document.querySelector(".sidebar-wrapper");

        if (sidebarWrapper) {
            (sidebarWrapper as HTMLElement).style.maxHeight = "100vh";
            (sidebarWrapper as HTMLElement).style.overflow = "hidden";
        }
    };
    const clearSearch = () => {
        console.log("Clearing up stuff...");
    };
</script>

<SidebarButton
    onclick={demoSidebarUi.toggle}
    class="mb-2 mt-4 ml-2 bg-white dark:bg-background cursor-pointer"
/>

<div class="relative min-h-[100dvh]">
    <div class="sidebar-wrapper">
        <Sidebar
            {activeUrl}
            backdrop={false}
            isOpen={isDemoOpen}
            closeSidebar={closeDemoSidebar}
            params={{ x: -50, duration: 50 }}
            class="z-50 sidebar-constrained bg-background dark:bg-background blur-bg"
            position="absolute"
            classes={{
                nonactive: nonActiveClass,
                active: activeClass,
            }}
        >
            <div class="sidebar-inner">
                <SidebarGroup
                    class="w-full flex-shrink-0"
                    id="son-of-ninja-element"
                >
                    <SidebarDropdownWrapper
                        label="Filters"
                        classes={{
                            btn: "p-2 cursor-pointer hover:bg-primary-100",
                        }}
                    >
                        {#snippet icon()}
                            <FilterSolid
                                class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                            />
                        {/snippet}
                        <SidebarItem
                            label="{selectedFilter === 'Technologies'
                                ? '>'
                                : ''} Technologies"
                            class="cursor-pointer filter-tag transition-all duration-300 {selectedFilter ===
                            'Technologies'
                                ? 'active-label pl-2'
                                : 'pl-0'}"
                            onclick={() => {
                                selectedFilter = "Technologies";
                                activeUrl = "Technologies";
                            }}
                        />

                        <SidebarItem
                            label="{selectedFilter === 'English Level'
                                ? '>'
                                : ''} English Level"
                            class="cursor-pointer filter-tag transition-all duration-300 {selectedFilter ===
                            'English Level'
                                ? 'active-label pl-2'
                                : 'pl-0'}"
                            onclick={() => {
                                selectedFilter = "English Level";
                                activeUrl = "English Level";
                            }}
                        />

                        <SidebarItem
                            label="{selectedFilter === 'Feedback'
                                ? '>'
                                : ''} Feedback"
                            class="cursor-pointer filter-tag transition-all duration-300 {selectedFilter ===
                            'Feedback'
                                ? 'active-label pl-2'
                                : 'pl-0'}"
                            onclick={() => {
                                selectedFilter = "Feedback";
                                activeUrl = "Feedback";
                                applyFullHeightToNinjaElement();
                            }}
                        />
                    </SidebarDropdownWrapper>
                </SidebarGroup>

                <SidebarGroup border class="flex-shrink-0">
                    <!-- This displays what filter tag the user queries for search (tech tags, english level, tutor feedback) -->
                    Selected Tags
                    <SelectedTagsBox {selectedTags} {deselectTag} />
                </SidebarGroup>

                <div class="sidebar-scrollable">
                    <SidebarGroup border>
                        <!-- This displays what filter the user clicks on (tech tags, english level, tutor feedback) -->
                        <FilterBox
                            {selectedFilter}
                            bind:techKeyword
                            bind:multiSelectedEnglishLevel
                            bind:multiSelectedTutors
                        />
                    </SidebarGroup>

                    {#if selectedFilter === "Technologies"}
                        <!-- This displays the available filters to be selected  -->
                        <SidebarGroup border>
                            Available Tags
                            <AvailableTagsBox
                                keyword={techKeyword}
                                {selectedTags}
                                {selectTag}
                            />
                        </SidebarGroup>
                    {/if}
                </div>

                <SidebarGroup border class="flex-shrink-0">
                    <!-- SidebarGroup doesn't apply class, leave it nonetheless, maybe I'll refactor to be a plain div if problems arise -->
                    <div
                        class="flex items-center justify-center gap-2 w-full p-1"
                    >
                        <Button
                            id="clear-search-btn"
                            class="w-[20%] flex items-center justify-center cursor-pointer"
                            onclick={clearSearch}
                            aria-label="Clear Search Filters"
                        >
                            <TrashBinOutline class="m-0 p-0" />
                        </Button>
                        <Button
                            id="submit-search-btn"
                            color="alternative"
                            class="w-[80%] font-bold cursor-pointer bg-green-700 text-white hover:bg-green-600 hover:text-white"
                            onclick={handleSubmit}
                            aria-label="Submit Search with Selected Filters"
                            {loading}>Search</Button
                        >
                    </div>
                </SidebarGroup>
            </div>
        </Sidebar>
    </div>
    <ManagerInventory />
</div>

<style>
    .sidebar-wrapper {
        max-height: 100vh;
        overflow: hidden;
    }

    :global(.sidebar-constrained) {
        height: 100vh !important;
        max-height: 100vh !important;
        overflow: hidden !important;
    }

    .sidebar-inner {
        display: flex;
        flex-direction: column;
        min-height: 90dvh;
        max-height: 100dvh;
        overflow: hidden;
    }

    .sidebar-scrollable {
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
        min-height: 0;
    }
</style>
