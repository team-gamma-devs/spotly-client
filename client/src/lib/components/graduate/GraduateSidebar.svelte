<script lang="ts">
	import { Sidebar, SidebarGroup, SidebarItem, SidebarButton, uiHelpers } from 'flowbite-svelte';
	import { ChartOutline, GithubSolid } from 'flowbite-svelte-icons';
	import GitHubDataContainer from './GitHubDataContainer.svelte';
	import type { PageData } from '../../../routes/app/graduate/$types';
	import { page } from '$app/state';

	let { data }: { data: PageData } = $props();

	let activeUrl = $state('Dashboard');
	let isDemoOpen = $state(false);

	const demoSidebarUi = uiHelpers();
	const closeDemoSidebar = demoSidebarUi.close;

	$effect(() => {
		isDemoOpen = demoSidebarUi.isOpen;
	});

	function handleNavClick(label: string) {
		activeUrl = label;
		// Close sidebar on mobile after selection
		if (window.innerWidth < 768) {
			closeDemoSidebar();
		}
	}

	const spanClass = 'flex-1 ms-3 whitespace-nowrap';
	const activeClass =
		'flex items-center p-2 text-base font-normal text-white bg-primary-400 dark:bg-primary-700 rounded-lg dark:text-white hover:bg-primary-500 dark:hover:bg-primary-800';
	const nonActiveClass =
		'flex items-center p-2 text-base font-normal text-green-900 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-gray-900';
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
			<SidebarItem
				label="Dashboard"
				active={activeUrl === 'Dashboard'}
				class="cursor-pointer"
				onclick={() => handleNavClick('Dashboard')}
			>
				{#snippet icon()}
					<ChartOutline
						class="h-5 w-5 transition duration-75 {activeUrl === 'Dashboard'
							? 'text-black dark:text-white'
							: 'text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'}"
					/>
				{/snippet}
			</SidebarItem>
			<SidebarItem
				label="GitHub Stats"
				active={activeUrl === 'GitHub Stats'}
				class="cursor-pointer"
				onclick={() => handleNavClick('GitHub Stats')}
			>
				{#snippet icon()}
					<GithubSolid
						class="h-5 w-5 text-foreground transition duration-75 {activeUrl === 'GitHub Stats'
							? 'text-black dark:text-white'
							: 'text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'}"
					/>
				{/snippet}
			</SidebarItem>
		</SidebarGroup>
	</Sidebar>

	<div id="graduate-grid-container" class="overflow-auto md:ml-64 sm:p-5 min-h-[100dvh] p-2">
		{#if activeUrl === 'Dashboard'}
			<div class="dashboard-content">
				<h1 class="text-2xl font-bold mb-4">Dashboard</h1>
				<p class="text-gray-600 dark:text-gray-400">Welcome {page.data.username}!</p>
			</div>
		{:else if activeUrl === 'GitHub Stats'}
			<GitHubDataContainer {data} />
		{/if}
	</div>
</div>

<style>
	.dashboard-content {
		padding: 1rem;
	}
</style>
