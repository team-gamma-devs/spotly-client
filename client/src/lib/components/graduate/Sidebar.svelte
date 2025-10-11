<script lang="ts">
    import {
        Sidebar,
        SidebarGroup,
        SidebarItem,
        SidebarButton,
        uiHelpers,
    } from "flowbite-svelte";
    import {
        ChartOutline,
        GridSolid,
        MailBoxSolid,
        UserSolid,
    } from "flowbite-svelte-icons";
    import { page } from "$app/state";

    let activeUrl = $state(page.url.pathname);
    let isDemoOpen = $state(false);

    const demoSidebarUi = uiHelpers();
    const closeDemoSidebar = demoSidebarUi.close;

    $effect(() => {
        isDemoOpen = demoSidebarUi.isOpen;
        activeUrl = page.url.pathname;
    });
    const spanClass = "flex-1 ms-3 whitespace-nowrap";
    const activeClass =
        "flex items-center p-2 text-base font-normal text-white bg-primary-600 dark:bg-primary-700 rounded-lg dark:text-white hover:bg-primary-800 dark:hover:bg-primary-800";
    const nonActiveClass =
        "flex items-center p-2 text-base font-normal text-green-900 rounded-lg dark:text-white hover:bg-green-100 dark:hover:bg-green-700";
</script>

<SidebarButton onclick={demoSidebarUi.toggle} class="mb-2" />
<div class="relative min-h-[100dvh]">
    <Sidebar
        {activeUrl}
        backdrop={false}
        isOpen={isDemoOpen}
        closeSidebar={closeDemoSidebar}
        params={{ x: -50, duration: 50 }}
        class="z-50 h-full bg-background dark:bg-background blur-bg"
        position="absolute"
        classes={{ nonactive: nonActiveClass, active: activeClass }}
    >
        <SidebarGroup>
            <SidebarItem label="Dashboard" href="/">
                {#snippet icon()}
                    <ChartOutline
                        class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                    />
                {/snippet}
            </SidebarItem>
        </SidebarGroup>
    </Sidebar>
    <div id="graduate-grid-container" class="overflow-auto md:ml-64 sm:p-5 ring-4 ring-primary-700 min-h-[100dvh] p-2">
    </div>
</div>
