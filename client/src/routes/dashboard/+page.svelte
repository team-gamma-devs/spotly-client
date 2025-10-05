<script>
    import Unauthorized from "$lib/components/error/Unauthorized.svelte";
    import Sidebar from "$lib/components/manager/Sidebar.svelte";
    import { isAuth } from "$lib/stores/auth";
</script>

{#if $isAuth}
<section id="dashboard-wrapper" class="ring-2 ring-red-500">
    <Sidebar />
    
</section>
{:else}
    <Unauthorized/>
{/if}

<style>

</style>