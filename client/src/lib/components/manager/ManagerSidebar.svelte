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
	} from 'flowbite-svelte';
	import { FilterSolid, TrashBinOutline } from 'flowbite-svelte-icons';
	import { FilterBox, SelectedTagsBox, AvailableTagsBox } from './utils';
	import { onMount } from 'svelte';
	import ManagerInventory from './ManagerInventory.svelte';
	import { availableFilterTags, type FilterTag } from '$lib/constants/filterTags';
	import { dev } from '$app/environment';

	const spanClass = 'flex-1 ms-3 whitespace-nowrap'; // Flowbite utility class, Don't delete.

	// Flowbite sidebar UI helper for controlling open/close state
	const demoSidebarUi = uiHelpers();
	const closeDemoSidebar = demoSidebarUi.close;

	type Props = {
		availableTags: string[];
		tagsError: string | null;
	};

	let { availableTags, tagsError }: Props = $props();

	let activeClass = 'p-2 bg-primary-300 dark:bg-primary-300 hover:bg-red-100'; // this comes from Flowbite's Sidebar component. So I can't really modify it.
	let nonActiveClass = 'p-2 hover:bg-gray-300'; // Currently only nonActiveClass applies, IDK why.

	// ****************** FILTER STATE ******************
	let techKeyword = $state(''); // Keyword input for searching/filtering technologies (used in Technologies filter)
	let selectedTags = $state<FilterTag[]>([]); // Array of selected technology tags that will be sent in the search query
	let isDemoOpen = $state(false); // Controls whether the sidebar is open or closed
	let selectedFilter = $state(''); // Tracks which filter category is currently selected, it tells what to display to FilterBox and what AvailableTagsBox shows.
	let activeUrl = $state('Technologies'); // Controls the active/highlighted state in the sidebar navigation menu
	let loading = $state(false); // Loading state for the submit button (shows spinner during search)
	let multiSelectedEnglishLevel = $state<string[]>([]); // Array of selected English levels, binded with the multiSelectBox inside FilterBox.
	let multiSelectedTutors = $state<string[]>([]); // Array of selected tutor codenames, also binded.
	
	let activeFilters = $state({
		technologies: [] as string[],
		englishLevels: [] as string[],
		tutorsFeedback: [] as string[]
	});
	let searchTrigger = $state(0);

	$effect(() => {
		isDemoOpen = demoSidebarUi.isOpen;
	});

	/**
	 * Adds a technology tag to the selected tags array
	 * Prevents duplicate selections by checking if tag already exists
	 */
	function selectTag(tag: FilterTag) {
		if (!selectedTags.find((t) => t.code === tag.code)) {
			selectedTags.push(tag);
		}
	}

	/**
	 * Removes a technology tag from the selected tags array
	 * Used when user clicks on a tag in SelectedTagsBox to deselect it
	 */
	function deselectTag(tag: FilterTag) {
		selectedTags = selectedTags.filter((t) => t.code !== tag.code);
	}

	/**
	 * Handles the search submission
	 * Collects all selected filters and prepares them for backend query
	 */
	async function handleSearch() {
		loading = true;
		activeFilters = {
			technologies: selectedTags.map((tag) => tag.name),
			englishLevels: multiSelectedEnglishLevel,
			tutorsFeedback: multiSelectedTutors,
		};

		if (dev) {
			console.log('************* DEBUG *************');
			console.log('Query Object:', $state.snapshot(activeFilters));
			console.log('JSON String:', JSON.stringify(activeFilters, null, 2));
			console.log('************ END ****************');
		}
		searchTrigger++;
		
		// Small delay for UX feedback
		await new Promise((resolve) => setTimeout(resolve, 300));
		loading = false;
	}

	/**
	 * Clears all selected filters and resets the search state
	 */
	const clearSearch = () => {
		console.log('Clearing up stuff...');
		selectedTags = [];
		multiSelectedEnglishLevel = [];
		multiSelectedTutors = [];
		techKeyword = '';
		
		// Clear active filters and trigger search to show all graduates
		activeFilters = {
			technologies: [],
			englishLevels: [],
			tutorsFeedback: []
		};
		searchTrigger++;
	};

	onMount(() => {
		applyFullHeightToNinjaElement();
		applySidebarConstraints();
	});

	/**
	 * Workaround for Flowbite's inaccessible element styling
	 * Applies full height classes to the parent of #son-of-ninja-element
	 * This ensures proper vertical sizing of the dropdown wrapper
	 */
	const applyFullHeightToNinjaElement = () => {
		const el = document.querySelector('#son-of-ninja-element');
		if (el?.parentElement) {
			el.parentElement.classList.add('h-full');
			el.parentElement.classList.add('md:h-full');
			el.parentElement.classList.add('sm:h-full');
		}
	};

	/**
	 * Constrains the sidebar wrapper to viewport height
	 * Prevents sidebar from growing beyond screen bounds
	 */
	const applySidebarConstraints = () => {
		const sidebarWrapper =
			document.querySelector('[class*="fixed"][class*="inset-y-0"]') || document.querySelector('.sidebar-wrapper');

		if (sidebarWrapper) {
			(sidebarWrapper as HTMLElement).style.maxHeight = '100vh';
			(sidebarWrapper as HTMLElement).style.overflow = 'hidden';
		}
	};
</script>

<SidebarButton
	onclick={demoSidebarUi.toggle}
	class="mb-2 mt-4 ml-2 bg-white dark:bg-background cursor-pointer ring-1 ring-gray-300 dark:ring-gray-700"
/>

<div class="relative w-full h-full">
	<Sidebar
		{activeUrl}
		backdrop={false}
		isOpen={isDemoOpen}
		closeSidebar={closeDemoSidebar}
		params={{ x: -50, duration: 50 }}
		class="z-50 h-screen max-h-screen bg-background dark:bg-background overflow-hidden backdrop-blur-xl"
		position="absolute"
		classes={{
			nonactive: nonActiveClass,
			active: activeClass,
		}}
	>
		<div class="flex flex-col min-h-[90dvh] max-h-[calc(100vh-80px)] overflow-hidden p-4 backdrop-blur-xl rounded-xl">
			<!-- Filters Section - Fixed at top -->
			<SidebarGroup class="w-full flex-shrink-0" id="son-of-ninja-element">
				<SidebarDropdownWrapper
					label="Filters"
					classes={{
						btn: 'p-2 cursor-pointer hover:bg-gray-300',
					}}
				>
					{#snippet icon()}
						<FilterSolid
							class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
						/>
					{/snippet}

					<!-- ************* Technologies ************** -->
					<SidebarItem
						label="{selectedFilter === 'Technologies' ? '▸' : ''} Technologies"
						class="cursor-pointer filter-tag transition-all duration-300 {selectedFilter === 'Technologies'
							? 'active pl-2'
							: 'pl-0'}"
						onclick={() => {
							selectedFilter = 'Technologies';
							activeUrl = 'Technologies';
						}}
					/>

					<!-- *************** English Level *************** -->
					<SidebarItem
						label="{selectedFilter === 'English Level' ? '▸' : ''} English Level"
						class="cursor-pointer filter-tag transition-all duration-300 {selectedFilter === 'English Level'
							? 'active pl-2'
							: 'pl-0'}"
						onclick={() => {
							selectedFilter = 'English Level';
							activeUrl = 'English Level';
						}}
					/>

					<!-- **************** Tutor Feedback ***************** -->
					<SidebarItem
						label="{selectedFilter === 'Feedback' ? '▸' : ''} Feedback"
						class="cursor-pointer filter-tag transition-all duration-300 {selectedFilter === 'Feedback'
							? 'active pl-2'
							: 'pl-0'}"
						onclick={() => {
							selectedFilter = 'Feedback';
							activeUrl = 'Feedback';
						}}
					/>
				</SidebarDropdownWrapper>
			</SidebarGroup>

			<!-- Selected Tags - Fixed below filters -->
			<SidebarGroup border class="flex-shrink-0">
				Selected Tags
				<SelectedTagsBox {selectedTags} {deselectTag} />
			</SidebarGroup>

			<!-- Scrollable Middle Section -->
			<div class="flex-1 flex flex-col overflow-y-auto overflow-x-hidden">
				<SidebarGroup border class="flex-shrink-0">
					<FilterBox {selectedFilter} bind:techKeyword bind:multiSelectedEnglishLevel bind:multiSelectedTutors />
				</SidebarGroup>

				{#if selectedFilter === 'Technologies'}
					<SidebarGroup border class="flex-1 min-h-0 overflow-y-auto">
						Available Tags
						<AvailableTagsBox keyword={techKeyword} {selectedTags} {selectTag} {availableTags} {tagsError} />
					</SidebarGroup>
				{/if}
			</div>

			<!-- Action Buttons - Fixed at bottom -->
			<SidebarGroup border class="flex-shrink-0 mt-auto">
				<div class="flex items-center justify-center gap-2 w-full p-1">
					<Button
						id="clear-search-btn"
						class="w-[20%] flex items-center justify-center cursor-pointer"
						onclick={clearSearch}
						aria-label="Clear Search Filters"
						title="Clear Search Filters"
					>
						<TrashBinOutline class="m-0 p-0" />
					</Button>

					<Button
						id="submit-search-btn"
						color="alternative"
						class="w-[80%] font-bold cursor-pointer bg-green-700 text-white hover:bg-green-600 hover:text-white"
						onclick={handleSearch}
						aria-label="Submit Search with Selected Filters"
						title="Submit Search with Selected Filters"
						{loading}>Search</Button
					>
				</div>
			</SidebarGroup>
		</div>
	</Sidebar>

	<!-- Content area with proper margin NOW PASSES FILTERS :D -->
	<div class="h-[100dvh] overflow-auto p-4 md:ml-64">
		<ManagerInventory {activeFilters} triggerSearch={searchTrigger} />
	</div>
</div>