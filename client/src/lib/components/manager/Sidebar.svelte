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
    import FilterBox from "./util/FilterBox.svelte";
    import { page } from "$app/state";
    import { onMount } from "svelte";

    const spanClass = "flex-1 ms-3 whitespace-nowrap"; // Don't delete.
    const demoSidebarUi = uiHelpers();
    const closeDemoSidebar = demoSidebarUi.close;

    let isDemoOpen = $state(false); // Controls the sidebar open/close state
    let selectedFilter = $state(""); // Selected filter used in conjuction with showTextInput.
    let activeUrl = $state("Technologies"); // Keep it URL although I'm not using URL but the sidebar expects it.
    let loading = $state(false);
    let selectedTags: Array<string> = []; // This will hold the tags that the client will select, they can be any sort of tags to be send to the backend. Will ask fede to implemenet GraphQL.

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
        // apply full height to that sneaky bastard.
        // The ninja element is anaccessible Flowbite element, but it's not accessible.
        // So you gotta inject the classes to the DOM
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
    }
</script>

<SidebarButton onclick={demoSidebarUi.toggle} class="mb-2 mt-4 ml-2 bg-white dark:bg-background cursor-pointer" />
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
        <SidebarGroup
            class=" w-full"
            id="son-of-ninja-element"
        >
            <!-- This is the inner tabs something is adding margin-->
            <SidebarDropdownWrapper
                label="Filters"
                classes={{ btn: "p-2 cursor-pointer hover:bg-primary-100" }}
            >
                <!-- now we need to activate one check the active and nonactive stuff-->
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
            <!-- <SidebarItem label="Kanban" {spanClass} href="/">
                {#snippet icon()}
                    <GridSolid
                        class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                    />
                {/snippet}
                {#snippet subtext()}
                    <span
                        class="ms-3 inline-flex items-center justify-center rounded-full bg-gray-200 px-2 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                        >Pro</span
                    >
                {/snippet}
            </SidebarItem>
            <SidebarItem label="Inbox" {spanClass} href="/">
                {#snippet icon()}
                    <MailBoxSolid
                        class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                    />
                {/snippet}
                {#snippet subtext()}
                    <span
                        class="bg-primary-200 text-primary-600 dark:bg-primary-900 dark:text-primary-200 ms-3 inline-flex h-3 w-3 items-center justify-center rounded-full p-3 text-sm font-medium"
                        >3</span
                    >
                {/snippet}
            </SidebarItem>
            <SidebarItem label="Sidebar" href="/components/sidebar">
                {#snippet icon()}
                    <UserSolid
                        class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                    />
                {/snippet}
            </SidebarItem> -->
        </SidebarGroup>

        <SidebarGroup border>
            <div
                id="selected-tags-wrapper"
                class="radius-2 radius-red min-h-[60px] w-full bg-black text-white px-2 py-1"
            >
                Here Selected Tags will go
            </div>
        </SidebarGroup>

        <SidebarGroup border>
            <FilterBox {selectedFilter} />
        </SidebarGroup>

        <SidebarGroup border>
            <Button
                color="alternative"
                class="w-full font-bold cursor-pointer bg-green-700 text-white hover:bg-green-600 hover:text-white"
                onclick={handleSubmit}
                {loading}>Search</Button
            >
        </SidebarGroup>
    </Sidebar>
    <div id="manager-grid-container" class="overflow-auto md:ml-64 sm:p-5 ring-4 ring-primary-700 min-h-[100dvh] p-2">
    </div>
</div>

<style>
</style>
