<script lang="ts">
import { Button } from 'flowbite-svelte';
import { goto } from '$app/navigation';

export let targetUrl: string = '';
export let classes: string = '';

function handleClick(event: Event) {
  event.preventDefault();
  if (targetUrl) {
    goto(targetUrl);
  } else if (typeof window !== 'undefined' && window.history.length > 1) {
    window.history.back();
  } else {
    goto('/');
  }
}
</script>

<Button type="button" class="cursor-pointer {classes}" outline color="dark" aria-label="Go Back" onclick={handleClick}>
  <svg class="shrink-0 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
  </svg>
  Go Back
</Button>