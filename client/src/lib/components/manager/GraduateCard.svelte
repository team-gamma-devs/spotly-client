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
	import usaIcon from '$lib/assets/svgs/united-states-flag-icon.svg';
	import TechTag from '../main/utils/TechTag.svelte';
	import { availableFilterTags } from '$lib/constants/filterTags';
	import { invalidateAll } from '$app/navigation';
	import { Button, Modal, Textarea, Label } from 'flowbite-svelte';
	import {
		GithubSolid,
		LinkedinSolid,
		AnnotationSolid,
		AddressBookSolid,
		AnnotationOutline,
		PhoneSolid,
	} from 'flowbite-svelte-icons';
	import { enhance } from '$app/forms';
	import type { Annotation, TutorsFeedback, EnglishLevel } from '$lib/types/graduates';

	let {
		id = '',
		firstName = 'n/a',
		lastName = 'n/a',
		email = 'n/a',
		avatarUrl = '$lib/assets/svgs/pfp-fallback.svg',
		englishLevel = 'Basic' as EnglishLevel,
		cohort = 0,
		techStack = [],
		githubUrl = '' as string | null | undefined,
		linkedinUrl = '',
		updatedAt = 'Long Time Ago...',
		annotations = [] as Annotation[] | null | undefined,
		tutorsFeedback = {} as TutorsFeedback | null | undefined,
		worksInIt = false,
	} = $props();

	const uniqueId = `graduate-card-${id || nextId()}`;
	const imageSrc = $derived(avatarUrl || pfpFallback);

	let showContactModal = $state(false); // Modal for the graduate's contact information.
	let showAnnotationsModal = $state(false); // Modal for the graduate's annotations.
	let showAddAnnotationModal = $state(false); // Modal to add new annotation.
	let showTutorsFeedback = $state(false); // Modal for the tutor's feedback on this graduate.

	let newAnnotation = $state('');
	let formError = $state('');
	let isSubmitting = $state(false);

	// Ensure we always work with a non-null object for tutors feedback in templates
	const safeTutorsFeedback = $derived((tutorsFeedback ?? {}) as TutorsFeedback);

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

	/**
	 * Formats a date string into a more readable 'MMM D, YYYY' format.
	 *
	 * This function takes a string that can be parsed by the `Date` constructor
	 * and converts it into a localized string format for the 'en-US' locale,
	 * resulting in an output like "Oct 20, 2025".
	 *
	 * @param {string} dateString - The string representation of the date to format.
	 * @returns {string} The formatted date string (e.g., "Oct 20, 2025").
	 */
	const formatDate = (dateString: string | undefined): string => {
		try {
			if (!dateString) return 'Unknown';
			const date = new Date(dateString);
			return date.toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'short',
				day: 'numeric',
			});
		} catch {
			return 'Unformateable Date';
		}
	};
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
		<div class="flex-1">
			<div class="w-full flex items-center justify-start gap-2">
				<h3 class="font-semibold text-lg">{firstName} {lastName}</h3>
				<p
					class="text-sm bg-red-800 dark:bg-red-900 rounded-md px-1 py-0.3 font-bold text-white"
					title="Cohort: {cohort}"
				>
					{cohort}
				</p>
				<p
					class="text-xs ring-1 ring-gray-700 rounded-md px-1 py-0.3 font-bold text-foreground flex items-center justify-center gap-1"
					title="English Level: {englishLevel}"
				>
					<img class="inline rounded-[2px]" src={usaIcon} alt="USA" width="13" height="5" />
					{englishLevel}
				</p>
				{#if worksInIt}
					<span
						class="text-xs bg-yellow-600 dark:bg-orange-900 rounded-md px-1.5 font-bold text-white font-bold flex items-center justify-center"
						title="Currently Working"
					>
						Working
					</span>
				{:else}
					<span
						class="text-xs bg-green-600 dark:bg-green-900 rounded-md px-1.5 font-bold text-white font-bold flex items-center justify-center"
						title="Currently Working"
					>
						Available
					</span>
				{/if}
			</div>
			<p class="text-sm text-gray-500 dark:text-gray-400">Last update: {formatDate(updatedAt)}</p>
			<!-- If available, this will list the links to the graduate's github and linkedin profiles -->
			<div class="flex gap-2 mt-2">
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
						onclick={() => {
							showContactModal = true;
						}}
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
	<div class="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700 mb-0 mt-auto">
		<Button
			type="button"
			color="alternative"
			class="flex items-center gap-1.5 cursor-pointer px-3 py-1.5 text-sm rounded transition-colors"
			aria-label="See Annotations"
			title="See Annotations"
			onclick={() => {
				showAnnotationsModal = true;
			}}
		>
			<AnnotationSolid class="w-4 h-4" />
			<span>Notes</span>
		</Button>

		{#if annotations && annotations.length > 0}
			<div
				id="{uniqueId}-annotations-container"
				class="flex items-center justify-start ml-2 mr-auto h-full min-h-[25px] min-w-[50px] overflow-x-auto"
			>
				{#if annotations.length > 0}
					{#each annotations.slice(0, 3) as annotation}
						<AnnotationOutline
							class="shrink-0 h-6 w-6 cursor-pointer text-gray-400 hover:text-gray-800 dark:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200"
							onclick={() => {
								showAnnotationsModal = true;
							}}
						/>
					{/each}
					{#if annotations.length === 0}
						<AnnotationOutline
							class="shrink-0 h-6 w-6 cursor-pointer text-gray-400 hover:text-gray-800 dark:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200"
							onclick={() => {
								showAnnotationsModal = true;
							}}
						/>
					{/if}
				{/if}
			</div>
		{/if}
		<!-- tutors feedback, on click display dialog with tutors feedback -->
		{#if Object.keys(safeTutorsFeedback).length > 0}
			<Button
				type="button"
				class="w-9 h-9 flex items-center p-0 justify-center cursor-pointer rounded-full bg-primary-500 hover:bg-primary-600 text-white transition-colors"
				aria-label="Tutors Feedback"
				title="Tutors Feedback"
				onclick={() => {
					showTutorsFeedback = true;
				}}
			>
				<AddressBookSolid class="w-5 h-5" />
			</Button>
		{/if}
	</div>
</div>

<!-- ********************* Contact Modal *************************** -->
<Modal
	title="Contact Information"
	class="bg-box-bg dark:bg-box-bg backdrop-blur-xl text-foreground mx-5 md:mx-auto"
	bind:open={showContactModal}
>
	<div class="space-y-3">
		<h3 class="text-lg font-semibold">{firstName} {lastName}</h3>
		<div class="space-y-2">
			<p class="text-sm text-gray-600 dark:text-gray-400 inline">
				<span class="font-medium">Email:</span>
			</p>
			<a href="mailto:{email}" class="text-primary-600 dark:text-primary-400 hover:underline">
				{email}
			</a>
		</div>
	</div>
	{#snippet footer()}
		<Button
			color="primary"
			class="cursor-pointer mr-0 ml-auto"
			onclick={() => {
				showContactModal = false;
			}}>Close</Button
		>
	{/snippet}
</Modal>

<!-- ********************* Annotations Modal *************************** -->
<Modal
	title="Annotations"
	class="bg-box-bg dark:bg-box-bg backdrop-blur-xl text-foreground mx-5 md:mx-auto"
	bind:open={showAnnotationsModal}
>
	<div class="space-y-4">
		<h3 class="text-lg font-semibold">Notes for {firstName} {lastName}</h3>
		{#if annotations && annotations.length > 0}
			<div class="space-y-3 max-h-96 overflow-y-auto">
				{#each annotations as annotation}
					<div class="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
						<p class="text-sm text-gray-600 dark:text-gray-400 mb-1">
							{formatDate(annotation.createdAt)}
						</p>
						<p class="text-gray-800 dark:text-gray-200">{annotation.message}</p>
					</div>
				{/each}
			</div>
		{:else}
			<p class="text-gray-500 dark:text-gray-400 italic">No annotations yet.</p>
		{/if}
	</div>
	{#snippet footer()}
		<Button
			color="alternative"
			class="cursor-pointer mr-0 ml-auto"
			onclick={() => {
				showAnnotationsModal = false;
			}}>Close</Button
		>
		<Button
			color="green"
			class="cursor-pointer mx-4"
			onclick={() => {
				showAnnotationsModal = false;
				showAddAnnotationModal = true;
			}}>Add</Button
		>
	{/snippet}
</Modal>

<!-- ******************* ADD ANNOTATION MODAL ************************** -->
<Modal
	title="Add Annotation"
	class="bg-box-bg dark:bg-box-bg backdrop-blur-xl text-foreground mx-5 md:mx-auto"
	bind:open={showAddAnnotationModal}
>
	<!-- This form submits to client/src/routes/app/manager/+page.server.ts -->
	<form
		method="POST"
		action="?/addAnnotation"
		use:enhance={() => {
			isSubmitting = true;
			formError = '';

			return async ({ result, update }) => {
				isSubmitting = false;

				if (result.type === 'success') {
					showAddAnnotationModal = false;
					newAnnotation = '';
					formError = '';
					await invalidateAll(); // Reload the page to update the contents.
				} else if (result.type === 'failure') {
					formError = JSON.stringify(result.data?.error) || 'An error occurred while adding the annotation';
				} else if (result.type === 'error') {
					formError = 'An unexpected error occurred. Please try again.';
				}

				await update();
			};
		}}
	>
		<input type="hidden" name="graduatedId" value={id} />

		<div class="space-y-4">
			<h3 class="text-lg font-semibold">Add note for {firstName} {lastName}</h3>

			{#if formError}
				<div class="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
					<p class="text-sm text-red-600 dark:text-red-400">{formError}</p>
				</div>
			{/if}

			<div>
				<Label for="annotation-textarea" class="mb-2">Annotation (max 300 characters)</Label>
				<Textarea
					id="annotation-textarea"
					name="annotation"
					placeholder="Enter your annotation here..."
					bind:value={newAnnotation}
					maxlength={300}
					required
					disabled={isSubmitting}
					class="w-full"
				/>
				<p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
					{newAnnotation.length}/300 characters
				</p>
			</div>
			<div id="add-annotation-modal-footer flex items-center justify-center gap-3">
				<Button
					color="alternative"
					class="cursor-pointer"
					type="reset"
					disabled={isSubmitting}
					onclick={() => {
						showAddAnnotationModal = false;
						newAnnotation = '';
						formError = '';
					}}>Cancel</Button
				>
				<Button color="green" class="cursor-pointer" type="submit" disabled={!newAnnotation.trim() || isSubmitting}>
					{isSubmitting ? 'Saving...' : 'Save'}
				</Button>
			</div>
		</div>
	</form>
</Modal>

<!-- ******************* Tutors Feedback Modal ************************* -->
<Modal
	title="Tutors Feedback"
	class="bg-box-bg dark:bg-box-bg backdrop-blur-xl text-foreground mx-5 md:mx-auto"
	bind:open={showTutorsFeedback}
>
	<div class="space-y-4">
		<h3 class="text-lg font-semibold">Feedback for {firstName} {lastName}</h3>
		{#if Object.keys(safeTutorsFeedback).length > 0}
			<div class="space-y-4 max-h-96 overflow-y-auto">
				{#each Object.entries(safeTutorsFeedback) as [feedbackId, feedback]}
					<div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
						<div class="flex items-center justify-between mb-2">
							<h4 class="font-semibold text-primary-600 dark:text-primary-400">{feedback.tutorName}</h4>
							<p class="text-xs text-gray-500 dark:text-gray-400">
								{formatDate(feedback.createdAt)}
							</p>
						</div>
						<p class="text-gray-800 dark:text-gray-200">Professional Score: {feedback.professionalScore}</p>
						<p class="text-gray-800 dark:text-gray-200">Technical Score: {feedback.technicalScore}</p>
					</div>
				{/each}
			</div>
		{:else}
			<p class="text-gray-500 dark:text-gray-400 italic">No tutor feedback yet.</p>
		{/if}
	</div>
	{#snippet footer()}
		<Button
			color="alternative"
			class="cursor-pointer"
			onclick={() => {
				showTutorsFeedback = false;
			}}>Close</Button
		>
	{/snippet}
</Modal>
