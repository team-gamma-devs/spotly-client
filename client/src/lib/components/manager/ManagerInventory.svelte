<script lang="ts">
  import GraduateCard from './GraduateCard.svelte';
  import { PaginationNav, Spinner } from 'flowbite-svelte';
  import { onMount } from 'svelte';
  import GenericBoxVisible from '../main/utils/GenericBoxVisible.svelte';
  import type { Graduate, PaginatedGraduatesResponse } from '../../types/graduates';

  type Props = {
    activeFilters?: {
      technologies: string[];
      englishLevels: string[];
      tutorsFeedback: string[];
    };
    triggerSearch?: number;
  };

  let { activeFilters = { technologies: [], englishLevels: [], tutorsFeedback: [] }, triggerSearch = 0 }: Props = $props();

  let currentPage = $state(1);
  let totalPages = $state(1);
  let graduatesList = $state<Graduate[]>([]);
  let loading = $state(false);
  let error = $state<string | null>(null);

  const handlePageChange = (page: number) => {
    currentPage = page;
    fetchGraduates(page);
  };

  async function fetchGraduates(page: number) {
    try {
      loading = true;
      error = null;

      const hasFilters = 
        activeFilters.technologies.length > 0 ||
        activeFilters.englishLevels.length > 0 ||
        activeFilters.tutorsFeedback.length > 0;

      let response;
      
      // If there are filters selected, put the things in the body, otherwise call it empty to get all random graduates so you can fill the inventory.
      if (hasFilters) {
        response = await fetch(`/app/manager/api/graduates?page=${page}&pageSize=20`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(activeFilters)
        });
      } else {
        response = await fetch(`/app/manager/api/graduates?page=${page}&pageSize=20`);
      }
      
      if (!response.ok) {
        throw new Error(`Failed to load graduates: ${response.statusText}`);
      }
      
      const data = (await response.json()) as PaginatedGraduatesResponse;
      graduatesList = data.items || [];
      totalPages = data.pages || 1;
    } catch (err) {
      console.error('Failed to fetch graduates:', err);
      error = err instanceof Error ? err.message : 'An unexpected error occurred';
      graduatesList = [];
    } finally {
      loading = false;
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

  $effect(() => {
    // When triggerSearch changes, reset to page 1 and fetch
    // Need to see if i can use invalidateAll.
    if (triggerSearch > 0) {
      currentPage = 1;
      fetchGraduates(1);
    }
  });

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
    {#if loading}
      <div class="col-span-full flex justify-center items-center py-10">
        <GenericBoxVisible classes="gap-5 px-10">
          <Spinner size="16" />
          <h3>Now Loading...</h3>
        </GenericBoxVisible>
      </div>
    {:else if error}
      <div class="col-span-full flex justify-center items-center py-10">
        <GenericBoxVisible classes="ring-2 ring-red-500">
          <h3 class="font-semibold text-red-600 dark:text-red-400 mb-2">Error Loading Graduates</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">{error}</p>
          <button 
            onclick={() => fetchGraduates(currentPage)}
            class="mt-4 px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors"
          >
            Try Again
          </button>
        </GenericBoxVisible>
      </div>
    {:else if graduatesList.length === 0}
      <div class="col-span-full flex justify-center items-center py-10">
        <GenericBoxVisible classes="ring-2">
          <h3 class="font-semibold mb-2">No Graduates Found</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {activeFilters.technologies.length > 0 || activeFilters.englishLevels.length > 0 || activeFilters.tutorsFeedback.length > 0
              ? 'No graduates match the selected filters. Try adjusting your search criteria.'
              : 'There are currently no graduates to display.'}
          </p>
        </GenericBoxVisible>
      </div>
    {:else}
      {#each graduatesList as graduate (graduate.id)}
        <GraduateCard {...graduate} />
      {/each}
    {/if}
  </div>

  <div class="flex justify-center mt-5 pb-4">
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