<script lang="ts">
	import "../app.css";
	import Header from "$lib/components/main/Header.svelte";
	import Footer from "$lib/components/main/Footer.svelte";
	import UnderConstruction from "$lib/components/UnderConstruction.svelte";
    import { dev } from "$app/environment";
    import { PUBLIC_SHOW_COMING_SOON } from "$env/static/public";
    import { page } from "$app/state";

    let { children } = $props();

    let showComingSoon = $derived(
        PUBLIC_SHOW_COMING_SOON === "true" && 
        (!dev || !page?.url.searchParams.has("dev"))
    );
</script>

<svelte:head>
	<!-- <link rel="icon" href={favicon} /> -->
</svelte:head>
{#if showComingSoon}
	<UnderConstruction />
{:else}
	<div class="layout-container">
		<Header />
		<main class="main-content">
			{@render children?.()}
		</main>
		<Footer />
	</div>
{/if}

<style>
	.layout-container {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background-image: url("/oscillate-background.svg");
		background-color: var(--color-background);
		background-repeat: no-repeat;
		background-size: cover;
	}
	.main-content {
		flex: 1 1 auto;
		min-height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
