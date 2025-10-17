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
    import { FilterSolid } from "flowbite-svelte-icons";
    import { FilterBox, SelectedTagsBox } from "./utils/";
    import { onMount } from "svelte";
    import ManagerInventory from "./ManagerInventory.svelte";
    import TechTag from "../main/utils/TechTag.svelte";

    const spanClass = "flex-1 ms-3 whitespace-nowrap"; // Don't delete.
    const demoSidebarUi = uiHelpers();
    const closeDemoSidebar = demoSidebarUi.close;

    let isDemoOpen = $state(false); // Controls the sidebar open/close state
    let selectedFilter = $state(""); // Selected filter used in conjuction with showTextInput.
    let activeUrl = $state("Technologies");
    let loading = $state(false);
    let selectedTags: Array<string> = []; // This will hold the tags that the client will select,
    // they can be any sort of tags to be send to the backend.
    let activeClass = "p-2 bg-primary-300 dark:bg-primary-300 hover:bg-red-100";
    let nonActiveClass = "p-2 hover:bg-primary-100";

    $effect(() => {
        isDemoOpen = demoSidebarUi.isOpen;
    });

    async function handleSubmit() {
        loading = true;
        await new Promise((resolve) => setTimeout(resolve, 2000));
        loading = false;
    }

    onMount(() => {
        // The ninja element is an inaccessible Flowbite element.
        // So you gotta inject the classes through the DOM.
        applyFullHeightToNinjaElement();
    });

    const applyFullHeightToNinjaElement = () => {
        const el = document.querySelector("#son-of-ninja-element");
        if (el?.parentElement) {
            el.parentElement.classList.add("h-full");
            el.parentElement.classList.add("md:h-full");
            el.parentElement.classList.add("sm:h-full");
            console.log("Found the ninja!!");
        }
    };
</script>

<SidebarButton
    onclick={demoSidebarUi.toggle}
    class="mb-2 mt-4 ml-2 bg-white dark:bg-background cursor-pointer"
/>
<!-- < This is the hamburger menu -->
<div class="relative min-h-[100dvh]">
    <!-- < If this is the whole container we will have to render shit here -->
    <Sidebar
        {activeUrl}
        backdrop={false}
        isOpen={isDemoOpen}
        closeSidebar={closeDemoSidebar}
        params={{ x: -50, duration: 50 }}
        class="z-50 h-full bg-background dark:bg-background blur-bg"
        position="absolute"
        classes={{
            nonactive: nonActiveClass,
            active: activeClass,
        }}
    >
        <SidebarGroup class=" w-full" id="son-of-ninja-element">
            <SidebarDropdownWrapper
                label="Filters"
                classes={{ btn: "p-2 cursor-pointer hover:bg-primary-100" }}
            >
                {#snippet icon()}
                    <FilterSolid
                        class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                    />
                {/snippet}
                <SidebarItem
                    label="Technologies"
                    class="cursor-pointer filter-tag {selectedFilter ===
                    'Technologies'
                        ? 'active-label'
                        : ''}"
                    onclick={() => {
                        selectedFilter = "Technologies";
                        activeUrl = "Technologies";
                    }}
                />

                <SidebarItem
                    label="English Level"
                    class="cursor-pointer filter-tag {selectedFilter ===
                    'English Level'
                        ? 'active-label'
                        : ''}"
                    onclick={() => {
                        selectedFilter = "English Level";
                        activeUrl = "English Level";
                    }}
                />
                <SidebarItem
                    label="Feedback"
                    class="cursor-pointer filter-tag {selectedFilter ===
                    'Feedback'
                        ? 'active-label'
                        : ''}"
                    onclick={() => {
                        selectedFilter = "Feedback";
                        activeUrl = "Feedback";
                        applyFullHeightToNinjaElement();
                    }}
                />
            </SidebarDropdownWrapper>
        </SidebarGroup>

        <SidebarGroup border>
            <!-- This displays what filter tag the user queries for search (tech tags, english level, tutor feedback) -->
            <SelectedTagsBox />
        </SidebarGroup>

        <SidebarGroup border>
            <!-- This displays what filter the user clicks on (tech tags, english level, tutor feedback) -->
            <FilterBox {selectedFilter} />
        </SidebarGroup>

        {#if selectedFilter === "Technologies"}
            <!-- This displays available tags in the case where filter = technologies -->
            <SidebarGroup border>Available Tags:</SidebarGroup>
        {/if}

        <SidebarGroup border>
            <Button
                color="alternative"
                class="w-full font-bold cursor-pointer bg-green-700 text-white hover:bg-green-600 hover:text-white"
                onclick={handleSubmit}
                {loading}>Search</Button
            >
        </SidebarGroup>
    </Sidebar>
    <ManagerInventory />
</div>

<style>
</style>
