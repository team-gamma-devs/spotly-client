<script module lang="ts">
	// This is the svelte's component heritage equivalent.
	// Anything declared here, is shared by all instances of this component.
	let globalCounter = 0; // +1 everytime an instance of GraduateCard is generated but not provieded of an id

	/**
	 Fallback for the graduate card id if user id is not passed.
	 Same as 
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
	import { availableFilterTags } from '$lib/constants/filterTags';
	import { Button, Modal } from 'flowbite-svelte';
	import {
		GithubSolid,
		LinkedinSolid,
		AnnotationSolid,
		AddressBookSolid,
		AnnotationOutline,
		PhoneSolid,
	} from 'flowbite-svelte-icons';

	let {
		id = '',
		firstName = 'Pepe',
		lastName = 'Pelotas',
		email = 'pepe@pelotas.com',
		avatarUrl = '',
		updatedAt = 'Long Time Ago...',
		cohort = 'n/a',
		techStack = ['react', 'vue.js', 'vue', 'react'],
		githubUrl = 'https://www.github.com/glovek08',
		linkedinUrl = 'https://www.linkedin.com',
	} = $props();

	const uniqueId = `graduate-card-${id || nextId()}`;
	const imageSrc = $derived(avatarUrl || pfpFallback);

	let showContactModal = $state(false);

	const techTags = $derived(
		//This monster converts the tags to proper techtags for randoms.
		techStack.map((tech) => {
			if (typeof tech === 'object' && tech.code) return tech;
			const tagName = typeof tech === 'string' ? tech.toLowerCase() : '';
			const foundTag = availableFilterTags.find((t) => t.name.toLowerCase() === tagName || t.code === tagName);
			return (
				foundTag || {
					code: tagName,
					name: typeof tech === 'string' ? tech : 'Unknown',
					color: 'tag-default',
				}
			);
		}),
	);
</script>

<div
	id={uniqueId}
	class="card-container p-4 blur-bg w-auto md:min-w-[400px] md:max-w-[500px] md:max-h-[300px] flex flex-col gap-3
		ring-1 ring-gray-200 dark:ring-gray-900 bg-background rounded-lg shadow-md"
>
	<div class="flex gap-2 items-start">
		<div class="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden ring-2 ring-gray-300 dark:ring-gray-700">
			<img src={imageSrc} alt="Graduate Profile" class="w-full h-full object-cover" />
		</div>

		<!-- *********** Card Header *************** -->
		<div class="flex-1 ring-1 ring-red-600">
			<h3 class="font-semibold text-lg">{firstName} {lastName}</h3>
			<p class="text-sm text-gray-500 dark:text-gray-400">{updatedAt}</p>
			<!-- If available, this will list the links to the graduate's github and linkedin profiles -->
			<div class="flex gap-2 mt-2 ring-1 ring-green-600">
				{#if githubUrl}
					<a
						href={githubUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="w-8 h-8 flex items-center justify-center rounded bg-gray-800 dark:bg-black hover:bg-gray-600 text-white transition-colors"
						aria-label="{firstName + ' ' + lastName}'s GitHub Profile"
						title="{firstName + ' ' + lastName}'s GitHub Profile"
					>
						<GithubSolid class="w-5 h-5" />
					</a>
				{/if}
				{#if linkedinUrl}
					<a
						href={linkedinUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="w-8 h-8 flex items-center justify-center rounded bg-blue-800 dark:bg-blue-900 hover:bg-blue-600 text-white transition-colors"
						aria-label="{firstName + ' ' + lastName}'s LinkedIn Profile"
						title="{firstName + ' ' + lastName}'s LinkedIn Profile"
					>
						<LinkedinSolid class="w-5 h-5" />
					</a>
				{/if}
				{#if email}
					<div class="w-[1px] bg-gray-300 dark:bg-gray-600"></div>
					<Button
						type="button"
						color="alternative"
						class="flex items-center cursor-pointer p-1 text-sm rounded transition-colors"
						aria-label="Contact"
						title="Contact Information"
						onclick={() => { showContactModal = true; }}
					>
						<PhoneSolid class="shrink-0" />
					</Button>
				{/if}
			</div>
		</div>
	</div>

	<!-- The TECH TAGS! Gorgeous isn't it? -->
	<!-- For now, Using absolute w-h but the idea is to be able to cap the parent w-h and let it overflow Y -->
	{#if techTags.length > 0}
		<div class="flex flex-wrap gap-1.5 max-h-[90px] overflow-y-auto">
			{#each techTags as tag}
				<TechTag {tag} checked={true} editable={false} />
			{/each}
		</div>
	{/if}

	<!-- ***************** Card Footer *******************  -->
	<div class="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
		<!-- Add Note Button: Not implemented but leave it. -->
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
			<AnnotationOutline
				class="shrink-0 h-6 w-6 cursor-pointer text-gray-400 hover:text-gray-800 dark:text-gray-500 dark:hover:text-gray-300 transitions-colors duration-200"
			/>
			<AnnotationOutline
				class="shrink-0 h-6 w-6 cursor-pointer text-gray-400 hover:text-gray-800 dark:text-gray-500 dark:hover:text-gray-300 transitions-colors duration-200"
			/>
		</div>

		<!-- tutors feedback, on clikc display dialog with tutors feedback -->
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

<!-- ********************* Contact Modal *************************** -->
<Modal title="Contact Information for {firstName} {lastName}" class="bg-white dark:bg-background blur-bg text-foreground" bind:open={showContactModal}>
	<p class="">Email: {email}</p>
	<!-- {#snippet footer()}
		<Button color="primary" class ="cursor-pointer mr-0 ml-auto" onclick={() => { showContactModal = false; }}>Close</Button>
	{/snippet} -->
</Modal>
<!-- ******************* Tutors Feedback ************************* -->
 
