<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/main/Header.svelte';
	import Footer from '$lib/components/main/Footer.svelte';
	
	let { children } = $props();
</script>

<svelte:head>
	<!-- <link rel="icon" href={favicon} /> -->
</svelte:head>
<div class="layout-container">
	<Header />
	<main class="main-content">
		{@render children?.()}
	</main>
	<Footer />
</div>

<style>
	.layout-container {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background: url("/gggyrate.svg");
		background-repeat: no-repeat;
		background-size:cover;
	}
	.main-content {
		flex: 1 1 auto;
		min-height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>