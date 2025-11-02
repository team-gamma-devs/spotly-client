<script lang="ts">
	import { Fileupload, Helper, Button, Alert, Spinner } from 'flowbite-svelte';
	import { CloudArrowUpSolid, CheckCircleSolid } from 'flowbite-svelte-icons';

// I'm doing double validation, first in client and then in the server endpoint
// to make the server more lightweight.

	const MAX_CSV_SIZE = 1 * 1024 * 1024; // 1MB in bytes

	type Props = {
		onSuccess?: () => void;
		onError?: (error: string) => void;
	};

	let { onSuccess, onError }: Props = $props();

	let selectedFiles = $state<FileList | null>(null);
	let isUploading = $state(false);
	let uploadError = $state<string | null>(null);
	let uploadSuccess = $state(false);

	let fileNames = $derived(
		selectedFiles
			? Array.from(selectedFiles)
					.map((file) => file.name)
					.join(', ')
			: 'No files selected',
	);

	let selectedFile = $derived(selectedFiles && selectedFiles.length > 0 ? selectedFiles[0] : null);

	function validateCSVFile(file: File): string | null {
		if (!file.name.toLowerCase().endsWith('.csv')) {
			return 'File must be a CSV file (.csv extension)';
		}

		if (file.size > MAX_CSV_SIZE) {
			return 'File size must be less than 1MB';
		}

		return null;
	}

	async function handleUpload() {
		if (!selectedFile) {
			uploadError = 'Please select a CSV file first';
			return;
		}

		const validationError = validateCSVFile(selectedFile);
		if (validationError) {
			uploadError = validationError;
			return;
		}

		try {
			isUploading = true;
			uploadError = null;
			uploadSuccess = false;

			const formData = new FormData();
			formData.append('file', selectedFile);

			const response = await fetch('/app/manager/api/upload-csv', {
				method: 'POST',
				body: formData,
				credentials: 'include',
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || `Upload failed: ${response.status}`);
			}

			uploadSuccess = true;
			uploadError = null;
			selectedFiles = null;

			if (onSuccess) {
				onSuccess();
			}
		} catch (error: any) {
			console.error('CSV upload error:', error);
			uploadError = error.message || 'Failed to upload CSV file';

			if (onError && uploadError) {
				onError(uploadError);
			}
		} finally {
			isUploading = false;
		}
	}

	function clearError() {
		uploadError = null;
	}

	function reset() {
		uploadError = null;
		uploadSuccess = false;
		selectedFiles = null;
	}
</script>

<div class="space-y-4">
	{#if uploadSuccess}
		<div class="flex flex-col items-center justify-center py-8 space-y-4">
			<div class="rounded-full bg-green-100 dark:bg-green-900 p-4">
				<CheckCircleSolid class="w-16 h-16 text-green-600 dark:text-green-400" />
			</div>
			<div class="text-center">
				<h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Upload Successful!</h4>
				<p class="text-sm text-gray-600 dark:text-gray-400">
					CSV uploaded and invitations are being processed.
				</p>
			</div>
			<Button color="blue" onclick={reset} class="cursor-pointer">
				Upload Another File
			</Button>
		</div>
	{:else}
		<Fileupload clearable bind:files={selectedFiles} accept=".csv" disabled={isUploading} onchange={clearError} />
		<Helper color={selectedFile && validateCSVFile(selectedFile) ? 'red' : 'green'} class="mt-2">
			Selected: {fileNames}
		</Helper>
		{#if uploadError}
			<Alert color="red" dismissable onclose={clearError}>
				<span class="font-medium">Upload failed!</span>
				{uploadError}
			</Alert>
		{/if}
		<div class="flex justify-center">
			<Button
				color="blue"
				class="w-auto cursor-pointer {!selectedFile ? 'cursor-not-allowed' : ''}"
				onclick={handleUpload}
				loading={isUploading}
				disabled={!selectedFile || isUploading || (selectedFile && !!validateCSVFile(selectedFile))}
			>
				{#if isUploading}
					<Spinner size="16"></Spinner>
					Uploading...
				{:else}
					<CloudArrowUpSolid class="w-5 h-5 mr-2" />
					Upload CSV
				{/if}
			</Button>
		</div>
	{/if}
</div>