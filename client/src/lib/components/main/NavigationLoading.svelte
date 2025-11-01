<script lang="ts">
	import { navigating } from '$app/state';
	import { Spinner } from 'flowbite-svelte';
	import spotlyLogo from '$lib/assets/svgs/spotly-logo-color.svg';

	const isNavigating = $derived(navigating.to);
</script>

<div
	class="fixed inset-0 z-9999 flex items-center justify-center bg-white/80 dark:bg-black/80 backdrop-blur-sm transition-opacity duration-300 {isNavigating ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}"
	aria-hidden={!isNavigating}
	role="status"
	aria-live="polite"
>
	<div class="relative flex items-center justify-center mt-[45dvh] mb-auto">
		<Spinner size="16" class="text-primary-400" />
		<img src={spotlyLogo} alt="Spotly Logo" class="absolute w-12 h-12 pointer-events-none" />
	</div>
</div>

