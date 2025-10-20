<script module lang="ts">
	// This is the svelte's component heritage equivalent.
	// Anything declared here, is shared by all instances of this component.
	let globalCounter = 0; // +1 everytime an instance of GraduateCard is generated but not provieded of an id

	/**
	 Fallback for the graduate card id if user id is not passed.
	*/
	export function nextId() {
		globalCounter += 1;
		return globalCounter;
	}
</script>

<script lang="ts">
	import pfpFallback from '$lib/assets/svgs/pfp-fallback.svg';
	import TechTag from '../main/utils/TechTag.svelte';
	import type { FilterTag } from '$lib/constants/filterTags';
	import { Button } from 'flowbite-svelte';
	import {
		GithubSolid,
		LinkedinSolid,
		AnnotationSolid,
		AddressBookSolid,
		AnnotationOutline,
	} from 'flowbite-svelte-icons';

	let {
		id = '',
		firstName = 'Pepe',
		lastName = 'Pelotas',
		avatarUrl = '',
		updatedAt = 'Long Time Ago...',
		cohort = 'n/a',
		techStack = ['React'],
		tutorsFeedback = [],
		githubUrl = '',
		linkedinUrl = '',
	} = $props();

	const uniqueId = `graduate-card-${id || nextId()}`;
	const imageSrc = $derived(avatarUrl || pfpFallback);
</script>

<div
	id={uniqueId}
	class="card-container p-4 blur-bg w-auto min-w-[400px] flex flex-col gap-3
		ring-1 ring-gray-200 dark:ring-gray-900 bg-background rounded-lg shadow-md"
>
	<div class="flex gap-3 items-start">
		<div class="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden ring-2 ring-gray-300 dark:ring-gray-700">
			<img src={imageSrc} alt="Graduate Profile" class="w-full h-full object-cover" />
		</div>

		<div class="flex-1">
			<h3 class="font-semibold text-lg">{firstName} {lastName}</h3>
			<p class="text-sm text-gray-500 dark:text-gray-400">{updatedAt}</p>
			<div class="flex gap-2 mt-2">
				{#if githubUrl}
					<a
						href={githubUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="w-8 h-8 flex items-center justify-center rounded bg-gray-800 hover:bg-gray-700 text-white transition-colors"
						aria-label="GitHub Profile"
					>
						<GithubSolid class="w-5 h-5" />
					</a>
				{/if}
				{#if linkedinUrl}
					<a
						href={linkedinUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="w-8 h-8 flex items-center justify-center rounded bg-blue-600 hover:bg-blue-700 text-white transition-colors"
						aria-label="LinkedIn Profile"
					>
						<LinkedinSolid class="w-5 h-5" />
					</a>
				{/if}
			</div>
		</div>
	</div>

	{#if techStack.length > 0}
		<div class="flex flex-wrap gap-1.5">
			{#each techStack as tag}
				<TechTag {tag} checked={true} editable={false} />
			{/each}
		</div>
	{/if}

	<div class="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
		<Button
			type="button"
			color="alternative"
			class="flex items-center gap-1.5 cursor-pointer px-3 py-1.5 text-sm rounded transition-colors"
			aria-label="See Annotations"
			title="See Annotations"
		>
			<AnnotationSolid class="w-4 h-4" />
			<span>Notes</span>
		</Button>
		<!-- Here added annotations will go, don't know how fede will store each annotation, but we should iterate over them and create a component -->
		<div
			id="{uniqueId}-annotations-container"
			class="flex items-center justify-start ml-2 mr-auto h-full min-h-[25px] min-w-[50px] overflow-x-auto"
		>
			<AnnotationOutline class="shrink-0 h-6 w-6 cursor-pointer text-gray-400 hover:text-gray-800 dark:text-gray-500 dark:hover:text-gray-300 transitions-colors duration-200" />
			<AnnotationOutline class="shrink-0 h-6 w-6 cursor-pointer text-gray-400 hover:text-gray-800 dark:text-gray-500 dark:hover:text-gray-300 transitions-colors duration-200" />
		</div>

		<Button
			type="button"
			class="w-9 h-9 flex items-center p-0 justify-center cursor-pointer rounded-full bg-primary-500 hover:bg-primary-600 text-white transition-colors"
			aria-label="Tutors Feedback"
			title="Tutors Feedback"
		>
			<AddressBookSolid class="w-5 h-5" />
		</Button>
	</div>
</div>
