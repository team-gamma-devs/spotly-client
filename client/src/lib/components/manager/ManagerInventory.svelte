<script lang="ts">
	export const classes: string = '';
	import GraduateCard from './GraduateCard.svelte';
	import { mockGraduates } from '$lib/mocks/mockGraduates';
	import { PaginationNav } from 'flowbite-svelte';
	
	let currentPage = $state(1);
	const totalPages = 1;
	const graduatesList = {};
	
	const handlePageChange = (page: number) => {
		// Backend endpoint is? idk :D
		currentPage = page;
	};
</script>

<div class="h-[100dvh] overflow-auto p-4 md:ml-64 flex flex-col">
	<div id="manager-cards-grid" class="grid grid-cols-[repeat(auto-fill,minmax(300px,500px))] auto-rows-min gap-4 justify-center flex-1">
		{#each mockGraduates as graduate} 
			<GraduateCard
				id={graduate.id}
				firstName={graduate.firstName}
				lastName={graduate.lastName}
				email={graduate.email}
				avatarUrl={graduate.avatarUrl}
				cohort={graduate.cohort}
				techStack={graduate.techStack}
				githubUrl={graduate.githubUrl}
				linkedinUrl={graduate.linkedinUrl}
				updatedAt={graduate.updatedAt}
				annotations={graduate.annotations}
				tutorsFeedback={graduate.tutorsFeedback}
			/>
		{/each}
	</div>
	<div class="flex justify-center mt-5">
		<PaginationNav
			{currentPage}
			{totalPages}
			onPageChange={handlePageChange}
			classes={{
				active: 'bg-green-100 bg-primary-300 text-foreground dark:bg-primary-500 dark:text-white',
			}}
		/>
	</div>
</div>