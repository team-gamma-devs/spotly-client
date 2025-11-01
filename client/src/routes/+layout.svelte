<script lang="ts">
	import '../app.css';
	import type { LayoutData } from './$types';
	import Header from '$lib/components/main/Header.svelte';
	import Footer from '$lib/components/main/Footer.svelte';
	import UnderConstruction from '$lib/components/UnderConstruction.svelte';
	import NavigationLoading from '$lib/components/main/NavigationLoading.svelte';
	import { dev } from '$app/environment';
	import { PUBLIC_SHOW_COMING_SOON } from '$env/static/public';
	import { page } from '$app/state';

	//SvelteKit handles data from load and children to slots as props.
	const { data, children } = $props<{ data: LayoutData; children: any }>();

	let showComingSoon = $derived(PUBLIC_SHOW_COMING_SOON === 'true' && (!dev || !page?.url.searchParams.has('dev')));
</script>

<svelte:head>
	<link rel="icon" href="/icos/favicon.ico" />
	<link rel="icon" href="/icos/spotly-logo-color.svg" type="image/svg+xml" />
	<link
		rel="preload"
		href="/fonts/ZalandoSansExpanded-Regular.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	<link rel="preload" href="/fonts/Figtree-Light.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
	<link rel="icon" href="/icos/favicon-128x128.png" sizes="128x128" type="image/png" />
	<link rel="preload" href="/images/abstract-bg-light-desktop.webp" as="image" media="(prefers-color-scheme: light)" />

	<link rel="preload" href="/images/abstract-bg-dark-desktop.webp" as="image" media="(prefers-color-scheme: dark)" />
	<title>Spotly | {page.data.title ?? 'Empowering Holbies!'}</title>
</svelte:head>
<NavigationLoading />
{#if showComingSoon}
	<UnderConstruction />
{:else}
	<div 
		class="fixed inset-0 -z-10 pointer-events-none 
			bg-[url('/images/abstract-bg-light-mobile.webp')] 
			md:bg-[url('/images/abstract-bg-light-desktop.webp')]
			dark:bg-[url('/images/abstract-bg-dark-mobile.webp')] 
			dark:md:bg-[url('/images/abstract-bg-dark-desktop.webp')]
			dark:bg-black
			bg-no-repeat bg-center bg-top bg-cover" 
		aria-hidden="true"
	></div>
	
	<div class="flex flex-col min-h-[100vh] bg-transparent">
		<Header />
		<main class="flex-1 min-h-[95dvh] flex items-center flex-col justify-center text-foreground">
			{@render children?.()}
		</main>
		<Footer />
	</div>
{/if}