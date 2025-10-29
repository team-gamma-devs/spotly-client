<script lang="ts">
	import GraduateCard from './GraduateCard.svelte';
	import { mockGraduates } from '$lib/mocks/mockGraduates';
	import { PaginationNav } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import type { Graduate } from '$lib/types/graduate';

	let currentPage = $state(1);
	let totalPages = $state(1);
	let graduatesList = $state<Graduate[]>([]);

	const handlePageChange = (page: number) => {
		currentPage = page;
		// TODO: Fetch graduates for the new page
		fetchGraduates(page);
	};

	async function fetchGraduates(page: number) {
		try {
			// Replace with your actual API endpoint
			const response = await fetch(`/api/graduates?page=${page}&pageSize=20`);
			const data = await response.json();
			
			graduatesList = data.graduates;
			totalPages = data.totalPages;
		} catch (error) {
			console.error('Failed to fetch graduates:', error);
		}
	}

	let container: HTMLDivElement;
	let borderState = $state<'none' | 'top' | 'bottom' | 'both'>('none');

	function updateBorders() {
		if (!container) return;
		const { scrollTop, scrollHeight, clientHeight } = container;

		const atTop = scrollTop <= 0;
		const atBottom = scrollTop + clientHeight >= scrollHeight - 1;

		if (atTop && !atBottom) borderState = 'bottom';
		else if (!atTop && atBottom) borderState = 'top';
		else if (!atTop && !atBottom) borderState = 'both';
		else borderState = 'none';
	}

	function onScroll() {
		updateBorders();
	}

	onMount(() => {
		updateBorders();
		fetchGraduates(currentPage);
	});
</script>

<div
	bind:this={container}
	onscroll={onScroll}
	class={`flex flex-col h-full overflow-y-auto py-5 transition-all duration-200
		${borderState === 'top' ? 'border-t border-gray-300 dark:border-gray-700' : ''}
		${borderState === 'bottom' ? 'border-b border-gray-300 dark:border-gray-700' : ''}
		${borderState === 'both' ? 'border-y border-gray-300 dark:border-gray-700' : ''}
	`}
>
	<div
		id="manager-cards-grid"
		class="py-2 grid grid-cols-[repeat(auto-fill,minmax(300px,500px))] auto-rows-min gap-4 justify-center flex-1"
	>
		{#each graduatesList as graduate (graduate.id)}
			<GraduateCard {...graduate} />
		{/each}
	</div>

	<div class="flex justify-center mt-5 pb-4">
		<PaginationNav
			{currentPage}
			{totalPages}
			onPageChange={handlePageChange}
			classes={{
				active:
					'bg-green-100 bg-primary-300 text-foreground dark:bg-primary-500 dark:text-white',
			}}
		/>
	</div>
</div>