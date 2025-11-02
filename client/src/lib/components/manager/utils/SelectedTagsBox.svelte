<script lang="ts">
	import TechTag from '$lib/components/main/utils/TechTag.svelte';
	import type { FilterTag } from '$lib/constants/filterTags';

	type Props = {
		selectedTags: FilterTag[];
		deselectTag: (tag: FilterTag) => void;
	};

	let { selectedTags, deselectTag }: Props = $props();
</script>

<div
	id="selected-tags-wrapper"
	class="max-h-[200px] w-full flex-wrap items-start justify-start overflow-y-auto px-2 py-1 text-white"
>
	{#each selectedTags as tag (tag.code)}
		<button
			onclick={() => deselectTag(tag)}
			aria-label={`Deselect ${tag.name}`}
			type="button"
			class="inline-block mb-1 mr-1"
		>
			<TechTag {tag} checked={true} />
		</button>
	{/each}
</div>
