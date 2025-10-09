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

    const spanClass = "flex-1 ms-3 whitespace-nowrap";
    const demoSidebarUi = uiHelpers();
    const closeDemoSidebar = demoSidebarUi.close;

    let isDemoOpen = $state(false); // I don't know what this does.

    let selectedFilter = $state(""); // Selected filter used in conjuction with showTextInput.
    let activeUrl = $state("Technologies"); // Keep it URL although I'm not using URL but the sidebar expects it.

    let selectedTags: Array<string> = []; // This will hold the tags that the client will select, they can be any sort of tags to be send to the backend.


    $effect(() => {
        isDemoOpen = demoSidebarUi.isOpen;
    });

    let loading = $state(false);

    async function handleSubmit() {
        loading = true;
        await new Promise((resolve) => setTimeout(resolve, 2000));
        loading = false;
    }

    // onMount(() => { // This is because I didn't find a way to remove that bg-gray-800 around the bitch element.
    // Resorted to overwrite the gray-800 variable directly, revert to this if shit happens
    //     const el = document.querySelector('#this-element-is-a-bitch');
    //     if (el?.parentElement) {
    //         el.parentElement.classList.remove("dark:bg-gray-800")
    //         el.parentElement.classList.add("bg-background")
    //         el.parentElement.classList.add("dark:bg-background")
    //         el.parentElement.classList.remove('bg-gray-50');
    //     }
    // })
</script>

<SidebarButton onclick={demoSidebarUi.toggle} class="mb-2 ml-2 bg-white" />
<!-- < This is the fucking hamburger menu -->
<div class="relative ring-2 ring-red-600 p-2 min-h-[100dvh]">
    <!-- < If this is the whole container we will have to render shit here -->
    <Sidebar
        {activeUrl}
        backdrop={false}
        isOpen={isDemoOpen}
        closeSidebar={closeDemoSidebar}
        params={{ x: -50, duration: 50 }}
        class="z-50 ring-2 ring-green-600 h-full bg-background dark:bg-background"
        position="absolute"
        classes={{ nonactive: "p-2", active: "p-2 bg-primary-300 dark:bg-primary-300" }}
    >
        <SidebarGroup
            class="ring-2 ring-yellow-600 w-full"
            id="this-element-is-a-bitch"
        >
            <!-- This is the inner tabs something is adding margin-->
            <SidebarDropdownWrapper
                label="Filters"
                classes={{ btn: "p-2 cursor-pointer" }}
            >
                <!-- now we need to activate one check the active and nonactive stuff-->
                {#snippet icon()}
                    <FilterSolid
                        class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                    />
                {/snippet}
                <SidebarItem
                    label="Technologies"
                    class="cursor-pointer filter-tag {selectedFilter === 'Technologies' ? 'bg-primary-300 dark:bg-primary-500' : ''}"
                    onclick={() => {
                        selectedFilter = "Technologies";
                        activeUrl = "Technologies";
                    }}
                />

                <SidebarItem
                    label="English Level"
                    class="cursor-pointer filter-tag {selectedFilter === 'English Level' ? 'bg-primary-300 dark:bg-primary-500' : ''}"
                    onclick={() => {
                        selectedFilter = "English Level";
                        activeUrl = "English Level";
                    }}
                />
                <SidebarItem
                    label="Feedback"
                    class="cursor-pointer filter-tag {selectedFilter === 'Feedback' ? 'bg-primary-300 dark:bg-primary-500' : ''}"
                    onclick={() => {
                        selectedFilter = "Feedback";
                        activeUrl = "Feedback";
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
            <FilterBox selectedFilter={ selectedFilter } />
        </SidebarGroup>

        <SidebarGroup border>
            <Button color="alternative" class="w-full font-bold cursor-pointer bg-green-700 text-white hover:bg-green-600 hover:text-white" onclick={handleSubmit} {loading}
                >Search</Button
            >
        </SidebarGroup>

    </Sidebar>
    <div class="h-auto overflow-auto md:ml-64 ring-2 ring-blue-400 p-2 sm:p-5">
        <div
            class="h-full rounded-lg border-2 border-dashed border-gray-200 p-4 dark:border-gray-700"
        ></div>
    </div>
</div>
<style>
    
</style>