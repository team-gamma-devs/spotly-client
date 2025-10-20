<!-- 
    This is a component to render the teachnology filter tag.
    It must hold:
        * Checkbox: It will store the checked status for the tag. The when the user presses submit, all tags
            with the checked state will be collected and sent to the DB.
        * Title: This must be collected from the availableFilterTags constant.
        * Color: Also must be collected from the availableFilterTags.
-->
<script module lang="ts">
	// This is the svelte's component heritage equivalent.
	// Anything declared here, is shared by all instances of this component.
	let globalCounter = 0; // +1 everytime an instance of TechTag is generated but not provieded of an userId

	export function nextId() {
		globalCounter += 1;
		return globalCounter;
	}
</script>

<!--
    This is a component to render the technology filter tag.
    It must hold:
        * Checkbox: It will store the checked status for the tag. When the user presses submit, all tags
            with the checked state will be collected and sent to the DB.
        * Title: This must be collected from the availableFilterTags constant.
        * Color: Also must be collected from the availableFilterTags.
        * Editable: If true, tag is interactive (checkbox, hover effects). If false, tag is read-only display.
-->
<script lang="ts">
	import { CheckCircleOutline, TrashBinOutline } from 'flowbite-svelte-icons';
	import type { FilterTag } from '$lib/constants/filterTags';

	type Props = {
		tag: FilterTag;
		checked: boolean;
		editable?: boolean;
	};

	let { tag, checked, editable = true }: Props = $props();
	let hovered = $state(false);

	const tagAction = $derived(checked ? `Remove ${tag.name}` : `Add ${tag.name}`);
	const uniqueId = `${tag.code}-checkbox-${nextId()}`;
</script>

{#if editable}
	<input type="checkbox" id={uniqueId} class="peer hidden" bind:checked />

	<label
		for={uniqueId}
		class="inline-flex h-6 cursor-pointer items-center justify-between rounded-md px-2 py-0 text-sm ring-2 ring-transparent transition-all duration-150"
		class:bg-gray-200={!checked}
		class:text-gray-800={!checked}
		class:dark:bg-gray-700={!checked}
		class:dark:text-gray-300={!checked}
		class:text-white={checked}
		class:peer-checked:ring-active-tag={checked}
		title={tagAction}
		style={checked ? `background-color: var(--color-${tag.color});` : ''}
		onmouseenter={() => (hovered = true)}
		onmouseleave={() => (hovered = false)}
	>
		{#if checked}
			<div class="symbol-container mr-1 flex items-center justify-center">
				<div class:hidden={!hovered} class="discard-symbol mr-0.5">
					<TrashBinOutline class="h-3 w-3 text-white" />
				</div>
				<div class:hidden={hovered} class="selected-symbol mr-0.5">
					<CheckCircleOutline class="h-3 w-3 text-white" />
				</div>
			</div>
		{/if}
		<div class="block flex items-center justify-center p-0 m-0">{tag.name}</div>
	</label>
{:else}
	<span
		class="inline-flex h-6 items-center justify-center rounded-md px-2 py-0 text-sm text-white"
		style="background-color: var(--color-{tag.color});"
	>
		{tag.name}
	</span>
{/if}
