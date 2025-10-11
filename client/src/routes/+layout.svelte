<script lang="ts">
	import "../app.css";
	import Header from "$lib/components/main/Header.svelte";
	import Footer from "$lib/components/main/Footer.svelte";
	import UnderConstruction from "$lib/components/UnderConstruction.svelte";
	import AuthBox from "$lib/components/AuthBox.svelte";
	import Unauthorized from "$lib/components/error/Unauthorized.svelte";
	import { dev } from "$app/environment";
	import { PUBLIC_SHOW_COMING_SOON } from "$env/static/public";
	import { page } from "$app/state";

	let { children } = $props();

	let showComingSoon = $derived(
		PUBLIC_SHOW_COMING_SOON === "true" &&
			(!dev || !page?.url.searchParams.has("dev")),
	);
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
	<link
		rel="preload"
		href="/fonts/Figtree-Light.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	<link
		rel="icon"
		href="/icos/favicon-128x128.png"
		sizes="128x128"
		type="image/png"
	/>
</svelte:head>
{#if showComingSoon}
	<UnderConstruction />
{:else}
	<div class="site-bg" aria-hidden="true"></div>
	<div class="layout-container">
		<Header />
		<main class="main-content text-foreground ring-2 ring-red-500">
			{@render children?.()}
		</main>
		<Footer />
	</div>
{/if}

<style>
	.layout-container {
		display: flex;
		flex-direction: column;
		min-height: 100dvh;
		background-color: transparent;
		background-repeat: no-repeat;
		background-size: cover;
		background-position-x: center;
		background-position-y: top;
	}
	.site-bg {
		position: fixed;
		inset: 0;
		z-index: -10;
		pointer-events: none;
		background-repeat: no-repeat;
		background-position: center top;
		background-size: cover; /* change to `cover` if you want it to fill/crop */
		background-image: url("/images/abstract-bg-light-desktop.webp");
	}
	:root.dark .site-bg {
		background-image: url("/images/abstract-bg-dark-desktop.webp");
		background-color: black;
	}
	.main-content {
		flex: 1 1 auto;
		min-height: 80dvh;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: flex-start;
		/* outline: 1px solid rgb(223, 146, 101); */
	}
	@media (max-width: 768px) {
		.site-bg {
			background-image: url("/images/abstract-bg-light-mobile.webp");
		}
		:root.dark .site-bg {
			background-image: url("/images/abstract-bg-dark-mobile.webp");
		}
	}
</style>
