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
</script>

<Navbar class="bg-header-gradient py-0 zalando-font">
    <NavBrand href="/">
        <enhanced:img
            src="$lib/assets/svgs/spotly-logo-color.svg"
            class="me-3 w-9 h-9 ml-2"
            alt="Spotly Logo"
        ></enhanced:img>
        <span
            class="self-center text-xl text-white font-semibold whitespace-nowrap dark:text-foreground py-4 hidden sm:inline"
            >SPOTLY</span
        >
    </NavBrand>
    <AuthBox>
        {#snippet authorizedContent()}
            <NavUl class="text-white">
                <NavLi href="/dashboard" class="text-inherit hover:text-accent"
                    >Dashboard</NavLi
                >
                <NavLi href="/status" class="text-inherit hover:text-accent"
                    >Status</NavLi
                >
            </NavUl>
            <div class="flex items-center md:order-2 cursor-pointer mr-2 ml-auto sm:mr-2 sm:ml-2">
                <Avatar
                    id="avatar-menu"
                    src="images/abstract-user-flat-4.svg"
                    class="max-w-[40px] my-2"
                />
                <NavHamburger class="cursor-pointer" />
            </div>
            <DarkMode class="mx-2 md:mr-4 md:ml-auto p-2 cursor-pointer text-white hover:text-black dark:hover:text-white"/>
            <Dropdown placement="bottom" triggeredBy="#avatar-menu">
                <DropdownHeader>
                    <span class="block text-sm">Pepe Pelotas</span>
                    <span class="block truncate text-sm font-medium"
                        >pepe@pelotas.com</span
                    >
                </DropdownHeader>
                <DropdownGroup>
                    <DropdownItem class="cursor-pointer">Settings</DropdownItem>
                    <DropdownItem class="cursor-pointer">Status</DropdownItem>
                </DropdownGroup>
                <DropdownHeader class="cursor-pointer">Sign out</DropdownHeader>
            </Dropdown>
        {/snippet}
        {#snippet unauthorizedContent()}
            <DarkMode />
            <p class="text-white font-bold">You must login</p>
        {/snippet}
    </AuthBox>
</Navbar>
