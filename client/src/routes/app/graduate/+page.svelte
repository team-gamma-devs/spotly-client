<script lang="ts">
    import Sidebar from '$lib/components/graduate/GraduateSidebar.svelte';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
</script>

<section id="dashboard-wrapper" class="w-full">
    <Sidebar {data} />
</section>