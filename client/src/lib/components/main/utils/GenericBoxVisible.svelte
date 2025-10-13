<script lang="ts">
    export let classes:string = "";
</script>

<div
    class="flex flex-col items-center justify-center bg-background dark:bg-background
    p-5 rounded ring-1 ring-gray-200 dark:ring-gray-900 shadow-lg blur-bg 
    mx-auto my-auto {classes}"
>
    <slot/>
</div>
