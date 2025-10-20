<script lang="ts">
  import pfpFallback from "$lib/assets/svgs/pfp-fallback.svg";
  export let id: string = "none";
  export let firstName: string = "Pepe";
  export let lastName: string = "Pelotas";
  // export let avatarUrl: string = "";
  export let updatedAt: string = "Long time ago...";
  export let cohort: string = "n/a";
  export let tutorsFeedback: string[] = [];
</script>

<div
  id={"card-container-" + id}
  class="card-container p-2 blur-bg w-auto min-w-[300px] flex gap-2
        ring-1 ring-gray-200 dark:ring-gray-900 bg-background rounded-sm shadow-md"
>
  <div class="card-pfp-container h-full w-50 sm:block hidden ring-2">
    <img
      src={pfpFallback}
      alt="Graduate Profile"
      class="w-full h-full object-contain"
    />
  </div>
  <div class="card-data-container w-full ring-2 ring-red-800">
    <p class="font-semibold">{firstName} {lastName}</p>
    <p class="text-sm text-gray-500 dark:text-gray-400">{updatedAt}</p>
    <p class="text-sm">Cohort: {cohort}</p>
    {#if tutorsFeedback.length > 0}
      <ul class="text-xs mt-1">
        {#each tutorsFeedback as tutor}
          <li class="text-gray-400">Feedback from: {tutor}</li>
        {/each}
      </ul>
    {/if}
  </div>
</div>
