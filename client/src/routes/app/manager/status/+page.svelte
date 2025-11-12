<script lang="ts">
	import StatusSidebar from '$lib/components/manager/StatusSidebar.svelte';
	import type { PageData } from './$types';

	let { data } = $props<{ data: PageData }>();
</script>

<svelte:head>
	<title>{data.title}</title>
</svelte:head>

<StatusSidebar {data} />