<script lang="ts">
	export let classes: string = '';
	export let title:string = "";
</script>

<div title={title}
	class="flex flex-col items-center justify-center bg-background dark:bg-background
    p-5 rounded-md ring-1 ring-gray-200 dark:ring-gray-900 shadow-lg backdrop-blur-xl
    mx-auto my-auto {classes}"
>
	<div class="flex items-center gap-3">
		<slot name="icon" />
		<h3 class="text-2xl font-bold">{title}</h3>
	</div>
	<slot />
</div>
