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
	<div class="layout-container">
		<Header />
		<main class="main-content text-foreground my-2">
			<AuthBox>
				{#snippet authorizedContent()}
					{@render children?.()}
				{/snippet}
				{#snippet unauthorizedContent()}
					<Unauthorized />
				{/snippet}
			</AuthBox>
		</main>
		<Footer />
	</div>
{/if}

<style>
	.layout-container {
		display: flex;
		flex-direction: column;
		min-height: 130vh;
		background-color: var(--color-background);
		background-image: url("/images/abstract-bg-light-desktop.webp");
		background-repeat: no-repeat;
		background-size: cover;
		background-position-x: center;
		background-position-y: top;
	}
	:root.dark {
		.layout-container {
			background-image: url("/images/abstract-bg-dark-desktop.webp");
		}
	}
	.main-content {
		flex: 1 1 auto;
		min-height: 100%;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		outline: 1px solid rgb(37, 183, 76);
	}
</style>
