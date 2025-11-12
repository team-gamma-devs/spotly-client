<script lang="ts">
	import StatusSidebar from '$lib/components/manager/StatusSidebar.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.title}</title>
</svelte:head>

<StatusSidebar {data} />
