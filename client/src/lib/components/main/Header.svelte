<script lang="ts">
    import {
        Navbar,
        NavBrand,
        NavLi,
        NavUl,
        NavHamburger,
        Avatar,
        Dropdown,
        DropdownItem,
        DropdownHeader,
        DropdownGroup,
        DarkMode,
    } from "flowbite-svelte";
    import AuthBox from "../AuthBox.svelte";
    import { page } from "$app/state";

    let activeUrl = $derived(page.url.pathname);
    let activeClass = "text-white bg-primary-400 md:bg-transparent font-bold md:text-white hover:text-black md:hover:text-white md:dark:text-foreground dark:text-black dark:bg-primary-300 md:dark:bg-transparent";
    let nonActiveClass = "text-gray-700 dark:text-white md:text-gray-200 md:hover:text-white md:hover:font-bold";
</script>

<Navbar class="bg-header-gradient py-0 zalando-font sticky start-0 top-0 z-20 dark:bg-background blur-bg">
    <NavBrand href="/" class="mr-5">
        <enhanced:img
            src="$lib/assets/svgs/spotly-logo-color.svg"
            class="me-3 w-9 h-9 ml-2"
            alt="Spotly Logo"
        ></enhanced:img>
        <span
            class="self-center text-xl text-white font-semibold whitespace-nowrap dark:text-foreground py-4 hidden sm:inline"
            >Spotly</span
        >
    </NavBrand>
    <AuthBox>
        {#snippet authorizedContent()}
            <NavUl class="" {activeUrl} classes={{ active: activeClass, nonActive: nonActiveClass }}>
                <NavLi href="/dashboard" class="relative" style="top:2px;"
                    >Dashboard</NavLi
                >
                <NavLi href="/status" class="relative" style="top:2px;"
                    >Status</NavLi
                >
            </NavUl>
            <div class="flex items-center md:order-2 cursor-pointer mr-2 ml-auto sm:mr-2 sm:ml-2">
                <Avatar
                    id="avatar-menu"
                    src="/images/abstract-user-flat-4.svg"
                    class="max-w-[40px] my-2"
                />
                <NavHamburger class="cursor-pointer text-white dark:text-foreground" />
            </div>
            <DarkMode class="mx-2 md:mr-4 md:ml-auto p-2 cursor-pointer text-white hover:text-black dark:hover:text-white"/>
            <Dropdown placement="bottom" triggeredBy="#avatar-menu" class="dark:bg-box-bg bg-box-bg">
                <DropdownHeader>
                    <span class="block text-sm">Pepe Pelotas</span>
                    <span class="block truncate text-sm font-medium"
                        >pepe@pelotas.com</span
                    >
                </DropdownHeader>
                <DropdownGroup>
                    <DropdownItem class="cursor-pointer" href="/settings">Settings</DropdownItem>
                </DropdownGroup>
                <DropdownHeader class="cursor-pointer">Sign out</DropdownHeader>
            </Dropdown>
        {/snippet}
        {#snippet unauthorizedContent()}
            <DarkMode class="md:mr-4 md:ml-auto p-2 cursor-pointer text-white hover:text-black dark:hover:text-white" />
            <p class="text-white font-bold">You must login</p>
        {/snippet}
    </AuthBox>
</Navbar>
