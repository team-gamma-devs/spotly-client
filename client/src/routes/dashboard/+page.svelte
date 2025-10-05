<script>
    import AuthBox from "$lib/components/AuthBox.svelte";
    import Unauthorized from "$lib/components/error/Unauthorized.svelte";
    import Sidebar from "$lib/components/manager/Sidebar.svelte";
</script>

<AuthBox>
    {#snippet authorizedContent()}
    HELLO!
        <section id="dashboard-wrapper" class="ring-2 ring-red-500">
            <Sidebar />
        </section>
    {/snippet}
    {#snippet unauthorizedContent()}
        <Unauthorized />
    {/snippet}
</AuthBox>

<style>
</style>
