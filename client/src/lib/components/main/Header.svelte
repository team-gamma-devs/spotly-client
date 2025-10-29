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
		Button,
	} from 'flowbite-svelte';
	import AuthBox from './utils/AuthBox.svelte';
	import { page } from '$app/state';
	import { enhance } from '$app/forms';
	import pfpFallback from '$lib/assets/svgs/pfp-fallback.svg';

	const user = $derived(page.data.user);
	const userPfp = $derived(page.data.user.avatarUrl || pfpFallback);

	let activeUrl = $derived(page.url.pathname);
	let activeClass =
		'text-white bg-primary-400 md:bg-transparent font-bold md:text-white hover:text-black md:hover:text-white md:dark:text-foreground dark:text-black dark:bg-primary-300 md:dark:bg-transparent';
	let nonActiveClass = 'text-gray-700 dark:text-white md:text-gray-200 md:hover:text-white md:hover:font-bold';
</script>

<Navbar class="bg-header-gradient zalando-font sticky start-0 top-0 z-20 backdrop-blur-xl py-2 sm:py-0">
	<NavBrand href="/" aria-label="Go Home">
		<enhanced:img src="$lib/assets/svgs/spotly-logo-color.svg" class="me-3 w-9 h-9 ml-2" alt="Spotly Logo"
		></enhanced:img>
		<span
			class="self-center text-xl text-white font-semibold whitespace-nowrap dark:text-foreground py-4 hidden sm:inline"
			>Spotly</span
		>
	</NavBrand>
	<AuthBox>
		{#snippet authorizedContent()}
			<!-- When it's wrapper -->
			<NavUl
				class="dark:bg-zinc-950 md:dark:bg-transparent"
				activeUrl={activeUrl === '/app/manager/' || activeUrl === '/app/manager' ? '/app/manager/' : activeUrl}
				classes={{ active: activeClass, nonActive: nonActiveClass }}
			>
				{#if user?.role == 'manager'}
					<NavLi href="/app/manager/" class="relative" style="top:2px;">Dashboard</NavLi>
					<NavLi href="/app/manager/status" class="relative" style="top:2px;">Status</NavLi>
				{:else if user?.role == 'graduate'}
					<NavLi href="/app/graduate/" class="relative" style="top:2px;">Dashboard</NavLi>
				{/if}
			</NavUl>
			<div class="flex items-center md:order-2 sm:order-2 order-2 cursor-pointer mr-2 ml-auto sm:mr-2 sm:ml-2">
				<Avatar id="avatar-menu" src={userPfp} class="max-w-[40px] my-2" />
				<NavHamburger class="cursor-pointer text-white dark:text-foreground dark:hover:text-white hover:text-black" />
			</div>
			<DarkMode class="mx-2 md:mr-4 md:ml-auto p-2 cursor-pointer text-white hover:text-black dark:hover:text-white" />
			<Dropdown placement="bottom" triggeredBy="#avatar-menu" class="dark:bg-box-bg bg-box-bg">
				<DropdownHeader>
					<span class="block text-sm">Pepe Pelotas</span>
					<span class="block truncate text-sm font-medium">pepe@pelotas.com</span>
				</DropdownHeader>
				<DropdownGroup>
					{#if user?.role == 'graduate'}
						<DropdownItem class="cursor-pointer" href="/app/graduate/settings">Settings</DropdownItem>
					{:else if user?.role == 'manager'}
						<DropdownItem class="cursor-pointer" href="/app/manager/settings">Settings</DropdownItem>
					{/if}
					<form method="POST" action="/logout" use:enhance>
						<Button
							type="submit"
							color="secondary"
							class="cursor-pointer rounded-none w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
						>
							Sign out
						</Button>
					</form>
				</DropdownGroup>
			</Dropdown>
		{/snippet}
		{#snippet unauthorizedContent()}
			<DarkMode class="mx-2 mr-4 ml-auto p-2 cursor-pointer text-white hover:text-black dark:hover:text-white" />
			<Button color="alternative" href="/login" class="text-white cursor-pointer" aria-label="Go To Login Page"
				>Login</Button
			>
		{/snippet}
	</AuthBox>
</Navbar>
