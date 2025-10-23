<script lang="ts">
	import { Sidebar, SidebarGroup, SidebarItem, SidebarButton, uiHelpers } from 'flowbite-svelte';
	import { ChartOutline, MailBoxSolid } from 'flowbite-svelte-icons';
	import GraduateStatusTable from './GraduateStatusTable.svelte';

	const spanClass = 'flex-1 ms-3 whitespace-nowrap'; // Don't delete.
	const demoSidebarUi = uiHelpers();
	const closeDemoSidebar = demoSidebarUi.close;

	let activeUrl = $state('Invitations');
	let selectedFilter = $state('Invitations');
	let isDemoOpen = $state(false);
	let activeClass = 'p-2 bg-primary-300 dark:bg-primary-300 hover:bg-red-100';
	let nonActiveClass = 'p-2 hover:bg-gray-300';

	$effect(() => {
		isDemoOpen = demoSidebarUi.isOpen;
	});
</script>

<SidebarButton onclick={demoSidebarUi.toggle} class="mb-2 mt-4 ml-2 bg-white dark:bg-background cursor-pointer" />

<div class="relative w-full">
	<Sidebar
		{activeUrl}
		backdrop={false}
		isOpen={isDemoOpen}
		closeSidebar={closeDemoSidebar}
		params={{ x: -50, duration: 50 }}
		class="z-50 h-full min-h-[100dvh] bg-background dark:bg-background blur-bg"
		position="absolute"
		classes={{ nonactive: nonActiveClass, active: activeClass }}
	>
		<SidebarGroup>
			<SidebarItem
				label="{selectedFilter === 'Invitations' ? '▸' : ''} Invitations"
				class="cursor-pointer filter-tag transition-all duration-300 {selectedFilter === 'Invitations'
					? 'active pl-3'
					: 'pl-0'}"
				onclick={() => {
					selectedFilter = 'Invitations';
					activeUrl = 'Invitations';
				}}
			></SidebarItem>

			<!-- <SidebarItem
				label="{selectedFilter === 'Statistics' ? '▸' : ''} Statistics"
				class="cursor-pointer filter-tag transition-all duration-300 {selectedFilter === 'Statistics'
					? 'active pl-2'
					: 'pl-0'}"
				onclick={() => {
					selectedFilter = 'Statistics';
					activeUrl = 'Statistics';
				}}
			>
				{#snippet icon()}
					<ChartOutline
						class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
					/>
				{/snippet}
			</SidebarItem> -->
		</SidebarGroup>
	</Sidebar>
	<div class="h-full overflow-auto md:ml-64">
		<GraduateStatusTable />
	</div>
</div>
