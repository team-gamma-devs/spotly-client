<script lang="ts">
    import Sidebar from '$lib/components/manager/ManagerSidebar.svelte';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
</script>

<section id="dashboard-wrapper" class="w-full">
		<!-- For simplicity sake, send the sidebar (components/graduate/ManagerSidebar.svelte) data fetched on this page's server load as props,
	 		the layout for this page is handled inside the sidebar because it has a component to render stuff there that is easier to control,
			otherwise you'll gonna have to mess with this page responsiveness it's easier to just let flowbite handle responsiveness within
			the sidebar component. -->
    <Sidebar availableTags={data.availableTags} tagsError={data.tagsError} />
</section>
