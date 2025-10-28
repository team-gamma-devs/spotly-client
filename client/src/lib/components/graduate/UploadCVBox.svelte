<script lang="ts">
	/**
 * @fileoverview Upload CV Component - Handles file uploads for graduate user onboarding.
 * Provides a form interface for uploading LinkedIn PDF, personal CV, and optional avatar.
 * Includes real-time validation feedback, loading states, and success handling.
 * 
 * @component UploadCVBox
 * @requires GenericBoxVisible - Container component for consistent layout
 * @requires BtnGoBack - Navigation component for returning to previous page
 * @requires flowbite-svelte - UI component library (Alert, Label, Fileupload, Button)
 * @requires flowbite-svelte-icons - Icon components (ExclamationCircleSolid, CheckCircleSolid)
 * @requires $app/forms - SvelteKit form actions (applyAction, enhance)
 * @requires $app/navigation - SvelteKit navigation utilities (goto)
 * @requires $app/state - SvelteKit state management (page)
 */

	import { GenericBoxVisible } from '../main/utils';
	import BtnGoBack from '../main/utils/BtnGoBack.svelte';
	import { Alert } from 'flowbite-svelte';
	import { Label, Fileupload, Button } from 'flowbite-svelte';
	import { ExclamationCircleSolid, CheckCircleSolid } from 'flowbite-svelte-icons';
	import { applyAction, enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { ActionData } from '../../../routes/app/graduate/upload_cv/$types';
	import { page } from '$app/state';

	/**
	 * Component Props
	 * @property form - Form action data containing validation errors and success state
	 */
	let { form = $bindable() }: { form: ActionData } = $props();
	
	/** Loading state indicator for form submission */
	let isLoading = $state(false);

	/** Validation error message for LinkedIn PDF field */
	const linkedInError = $derived(form?.validation?.linkedin ? form.validation.linkedin : null);
	
	/** Validation error message for Personal CV field */
	const personalCvError = $derived(form?.validation?.personal ? form.validation.personal : null);
	
	/** Validation error message for Avatar field */
	const avatarError = $derived(form?.validation?.avatar ? form.validation.avatar : null);
	
	/** General error message from form submission */
	const generalError = $derived(form?.error ? form.error : null);
	
	/** Success state indicator, this is true when files are uploaded successfully */
	const uploadSuccess = $derived(form?.success === true);
	
	/**
	 * Magic link token extracted from URL query parameters.
	 * Used for authentication during the upload process.
	 */
	const magicToken = $derived(page.url.searchParams.get('token'));
	
	/**
	 * Navigates the user to the dashboard upon successful upload.
	 * Triggered by the "Continue" button after successful file upload.
	 */
	async function handleContinue() {
		await goto('/app/graduate');
	}
</script>

<GenericBoxVisible classes="mt-10 mb-10 md:m-auto">
	<div id="form-header" class="w-full p-2 gap-3 flex items-center justify-between mb-2">
		<h1 class="text-xl">Upload Files</h1>
		<BtnGoBack classes="hidden md:block md:flex md:items-center md:justify-center" />
	</div>

	<div class="w-full max-w-3xl mx-5 my-4">
		<div
			class="flex flex-col md:flex-row items-center md:items-center gap-4 border
                    border-gray-200 dark:border-slate-800 rounded-lg p-4 md:p-5 shadow-sm"
		>
			<div class="items-center m-auto">
				<h3 class="text-lg md:text-xl font-semibold text-foreground dark:text-white leading-tight text-center">
					To continue, please upload
				</h3>
				<p class="mt-1 text-sm text-muted-foreground dark:text-slate-400 text-center">
					Required files are marked with *. Max size: 3MB per file.
				</p>

				<ul class="mt-3 grid gap-2 md:gap-1 pl-4 items-center justify-center">
					<li class="flex items-start gap-3">
						{#if uploadSuccess}
							<CheckCircleSolid class="shrink-0 h-6 w-6 mb-2 text-green-600" />
						{:else}
							<ExclamationCircleSolid class="shrink-0 h-6 w-6 mb-2 text-red-600" />
						{/if}
						<span class="text-sm text-foreground dark:text-slate-100 pt-1"> LinkedIn-generated PDF * </span>
					</li>
					<li class="flex items-start gap-3">
						{#if uploadSuccess}
							<CheckCircleSolid class="shrink-0 h-6 w-6 text-green-600" />
						{:else}
							<ExclamationCircleSolid class="shrink-0 h-6 w-6 text-red-600" />
						{/if}
						<span class="text-sm text-foreground dark:text-slate-100 pt-1"> Personal CV (PDF or DOCX) * </span>
					</li>
				</ul>
			</div>
		</div>
	</div>

	<form
		method="POST"
		action="?/uploadFiles"
		enctype="multipart/form-data"
		use:enhance={() => {
			isLoading = true;
			return async ({ result }) => {
				await applyAction(result);
				isLoading = false;
			};
		}}
	>
		<!-- This hidden input sends the magic link from the url -->
		<input type="hidden" name="magic_token" value={magicToken} />

		<div class="p-2 flex flex-col items-center justify-center">
			<Label class="pb-1 pl-2 w-full">LinkedIn's Generated PDF *</Label>

			<div class="inline-file-input flex gap-2 w-full">
				<Fileupload name="linkedin_pdf" required disabled={uploadSuccess} accept=".pdf" />
			</div>

			{#if linkedInError}
				<Alert color="red" class="mt-2 w-full">
					<span class="font-semibold">LinkedIn PDF:</span>
					{linkedInError}
				</Alert>
			{/if}
		</div>

		<div class="p-2 flex flex-col items-center justify-center">
			<Label class="pb-1 pl-2 w-full">Your Personal CV *</Label>
			<div class="inline-file-input flex gap-2 w-full">
				<Fileupload name="personal_cv" required disabled={uploadSuccess} accept=".pdf,.docx" />
			</div>
	
			{#if personalCvError}
				<Alert color="red" class="mt-2 w-full">
					<span class="font-semibold">Personal CV:</span>
					{personalCvError}
				</Alert>
			{/if}
		</div>

		<div class="p-2 flex flex-col items-center justify-center">
			<Label class="pb-1 pl-2 w-full">Profile Avatar (Optional)</Label>
			<div class="inline-file-input flex gap-2 w-full">
				<Fileupload name="avatar" disabled={uploadSuccess} accept=".jpg,.jpeg,.png" />
			</div>
			<p class="text-xs text-muted-foreground dark:text-slate-400 mt-1 w-full pl-2">
				Supported formats: JPG, JPEG, PNG
			</p>

			{#if avatarError}
				<Alert color="red" class="mt-2 w-full">
					<span class="font-semibold">Avatar:</span>
					{avatarError}
				</Alert>
			{/if}
		</div>

		<!-- *************** General error ************* -->
		{#if generalError}
			<div class="p-2">
				<Alert color="red" class="w-full">{generalError}</Alert>
			</div>
		{/if}

		<!-- ************** Success ***************** -->
		{#if uploadSuccess}
			<div class="p-2">
				<Alert color="green" class="w-full">Files uploaded successfully!</Alert>
			</div>
		{/if}

		<div class="p-2 flex items-center justify-center gap-3">
			<!-- Real shit, don't delete -->
			{#if !uploadSuccess}
                <Button
                    type="submit"
                    color="blue"
                    class="my-3 min-w-[120px] cursor-pointer"
                    disabled={isLoading}
                    loading={isLoading}
                >
                    Upload Files
                </Button>
            {:else}
                <Button
                    color="green"
                    class="my-3 min-w-[120px]"
                    onclick={handleContinue}
                >
                    Continue
                </Button>
            {/if}
			<!-- DEBUG ONLY! -->
			<!-- <Button color="green" class="my-3 min-w-[120px] cursor-pointer" onclick={handleContinue}>Continue</Button> -->
		</div>
	</form>
</GenericBoxVisible>