<script lang="ts">
  import GraduateCard from './GraduateCard.svelte';
  import { PaginationNav, Spinner } from 'flowbite-svelte';
  import { onMount } from 'svelte';
  import type { Graduate } from '$lib/types/graduate';
  import GenericBoxVisible from '../main/utils/GenericBoxVisible.svelte';

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
      
      const response = await fetch(`/api/graduates?page=${page}&pageSize=20`);
      
      if (!response.ok) {
        throw new Error(`Failed to load graduates: ${response.statusText}`);
      }
      
      const data = await response.json();
      graduatesList = data.graduates || [];
      totalPages = data.totalPages || 1;
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
          <p class="text-sm text-gray-600 dark:text-gray-400">
            There are currently no graduates to display.
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