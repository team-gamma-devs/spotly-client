<script lang="ts">
	import { PaginationNav } from 'flowbite-svelte';
	import GraduateCard from './GraduateCard.svelte';

	export const classes: string = '';

	let currentPage = $state(1);
	const totalPages = 2;

	function handlePageChange(page: number) {
		currentPage = page;
		// IDK how fede will handle pagination but for now, leave it here
		console.log('Page changed to:', page);
	}
</script>
<div class="h-[100dvh] overflow-y-auto p-4 md:ml-64 flex flex-col">
	<div id="manager-cards-grid" class="grid grid-cols-[repeat(auto-fill,minmax(300px,500px))] auto-rows-min gap-4 justify-center flex-1">
		<GraduateCard />
		<GraduateCard />
		<GraduateCard />
		<GraduateCard />
		<GraduateCard />
		<GraduateCard />
		<GraduateCard />
		<GraduateCard />
		<GraduateCard />
	</div>
	<div class="flex justify-center mt-4 pb-4">
		<PaginationNav
			{currentPage}
			{totalPages}
			onPageChange={handlePageChange}
			classes={{
				active: 'border-none bg-primary-300 text-foreground dark:bg-primary-500 dark:text-white',
			}}
		/>
	</div>
</div>
