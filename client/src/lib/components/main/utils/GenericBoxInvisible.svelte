<script lang="ts">
	export let classes: string = '';
</script>

<div
	class="flex flex-col items-center justify-center
p-2 gap-3 mx-auto mt-10 mb-10 md:mt-auto md:mb-auto {classes}"
>
	<slot />
</div>
