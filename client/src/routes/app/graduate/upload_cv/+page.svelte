<script lang="ts">
    import UploadCVBox from '$lib/components/graduate/UploadCVBox.svelte';
    import type { ActionData } from './$types';

    // This receives the form action data
    let { form }: { form: ActionData } = $props();
</script>

<UploadCVBox {form} />