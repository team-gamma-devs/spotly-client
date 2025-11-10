<script lang="ts">
	export let classes: string = '';
	export let title: string = '';
</script>

<div
	class="flex flex-col items-center justify-center
p-2 gap-3 mx-auto mt-10 mb-10 md:mt-auto md:mb-auto {classes}"
>
	<div class="mb-4 flex items-start w-full gap-3">
		<slot name="icon" />
		<h3 class="text-2xl font-bold">{title}</h3>
	</div>
	<slot />
</div>
