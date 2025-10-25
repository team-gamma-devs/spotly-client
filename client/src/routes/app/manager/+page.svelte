<script>
	import Sidebar from '$lib/components/manager/ManagerSidebar.svelte';
	// import { page } from "$app/state";
	// page.data.title = ""
</script>

<section id="dashboard-wrapper" class="w-full">
	<!-- The ManagerInventory component holds the graduate's cards grid, it is inside the sidebar due to it
     being in relative position, it's more responsive that way. -->
	<Sidebar />
</section>
