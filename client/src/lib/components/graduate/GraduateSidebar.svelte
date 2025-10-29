<script lang="ts">
	import { Sidebar, SidebarGroup, SidebarItem, SidebarButton, uiHelpers } from 'flowbite-svelte';
	import { ChartOutline, GithubSolid } from 'flowbite-svelte-icons';
	import { GithubDataContainer, GraduateDashboard } from './index';
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
		class="z-50 h-full bg-background dark:bg-background backdrop-blur-xl"
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
				label="GitGudStats"
				active={activeUrl === 'GitGudStats'}
				class="cursor-pointer"
				onclick={() => handleNavClick('GitGudStats')}
			>
				{#snippet icon()}
					<GithubSolid
						class="h-5 w-5 text-foreground transition duration-75 {activeUrl === 'GitGudStats'
							? 'text-black dark:text-white'
							: 'text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'}"
					/>
				{/snippet}
			</SidebarItem>
		</SidebarGroup>
	</Sidebar>

	<div id="graduate-grid-container" class="overflow-auto md:ml-64 sm:p-5 min-h-[100dvh] p-2">
		<!-- ********  GRADUATE DASHBOARD! ************** -->
		{#if activeUrl === 'Dashboard'}
			<GraduateDashboard/>
		<!-- ******** GITHUB DASHBOARD! ************** -->
		{:else if activeUrl === 'GitGudStats'} 
			<GithubDataContainer {data} />
		{/if}
	</div>
</div>

<style>
</style>
