<script lang="ts">
    import {
        Sidebar,
        SidebarGroup,
        SidebarItem,
        SidebarButton,
        SidebarDropdownWrapper,
        uiHelpers,
    } from "flowbite-svelte";
    import {
        ChartOutline,
        GridSolid,
        MailBoxSolid,
        UserSolid,
        FilterSolid,
    } from "flowbite-svelte-icons";
    import { page } from "$app/state";
    import { onMount } from "svelte";
    let activeUrl = $state(page.url.pathname);
    const spanClass = "flex-1 ms-3 whitespace-nowrap";
    const demoSidebarUi = uiHelpers();
    let isDemoOpen = $state(false);
    const closeDemoSidebar = demoSidebarUi.close;
    $effect(() => {
        isDemoOpen = demoSidebarUi.isOpen;
        activeUrl = page.url.pathname;
    });

    onMount(() => { // This is because I didn't find a way to remove that rim around the parent element.
        const el = document.getElementById('this-element-is-a-bitch');
        if (el?.parentElement) {
            el.parentElement.classList.remove("dark:bg-gray-800")
            el.parentElement.classList.remove('bg-gray-50');
        }
    })
</script>

<SidebarButton onclick={demoSidebarUi.toggle} class="mb-2" />
<!-- <This is the fucking hamburger menu  -->
<div class="relative ring-2 ring-red-600 h-full">
    <!-- <This is the Whole container? We will have to render shit here -->
    <Sidebar
        {activeUrl}
        backdrop={false}
        isOpen={isDemoOpen}
        closeSidebar={closeDemoSidebar}
        params={{ x: -50, duration: 50 }}
        class="z-50 h-full ring-2 ring-green-600 bg-background dark:bg-background"
        position="absolute"
        classes={{ nonactive: "p-2", active: "p-2" }}
    >
        <SidebarGroup
            class="ring-2 ring-yellow-600 bg-background dark:bg-background w-full"
            id="this-element-is-a-bitch"
        >
            <!-- This is the inner tabs something is adding margin-->
            <SidebarDropdownWrapper label="Filters" classes={{ btn: "p-2 cursor-pointer" }} > <!-- now we need to activate one -->
                {#snippet icon()}
                    <FilterSolid
                        class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                    />
                {/snippet}
                <SidebarItem label="Technologies" class="cursor-pointer"/>
                <SidebarItem label="English Level" class="cursor-pointer"/>
                <SidebarItem label="Feedback" class="cursor-pointer"/>
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
    </Sidebar>
    <div class="h-96 overflow-auto px-4 md:ml-64">
        <div
            class="rounded-lg border-2 border-dashed border-gray-200 p-4 dark:border-gray-700"
        ></div>
    </div>
</div>

