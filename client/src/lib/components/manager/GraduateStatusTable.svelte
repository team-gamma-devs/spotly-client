<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Badge,
		Button,
		Input,
		Modal,
		PaginationNav,
		Spinner,
	} from 'flowbite-svelte';
	import { SearchOutline, TrashBinSolid, EnvelopeOpenSolid, FileCsvOutline } from 'flowbite-svelte-icons';
	import type { GraduateInvitation } from '$lib/types/graduateInvitation';
	import UploadCSV from './utils/UploadCSV.svelte';
	import { invalidateAll } from '$app/navigation';
	import { dev } from '$app/environment';

	interface Props {
		data: {
			graduatesList: GraduateInvitation[];
			error: string | null;
			totalPages: number;
			currentPage: number;
			[key: string]: any;
		};
	}

	let { data }: Props = $props();

	const TOTAL_ROWS = 20;

	let graduatesList = $state(data.graduatesList || []);
	let currentPage = $state(data.currentPage || 1);
	let totalPages = $state(data.totalPages || 1);
	let loading = $state(false);

	// this is to watch for data changes when invalidateAll is called.
	$effect(() => {
		graduatesList = data.graduatesList || [];
		currentPage = data.currentPage || 1;
		totalPages = data.totalPages || 1;
	});

	async function fetchInvitations(page: number, search?: string) {
		try {
			loading = true;

			const response = await fetch(`/app/manager/api/graduate-invitations?page=${page}&pageSize=20`, {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(search ? { searchTerm: search } : {}),
			});

			if (!response.ok) {
				throw new Error(`Failed to load invitations: ${response.statusText}`);
			}

			const result = await response.json();
			// Backend returns: { items: [...], pages: 10, page: 1, limit: 20 }
			graduatesList = result.items || [];
			totalPages = result.pages || 1;
			currentPage = result.page || page;
		} catch (err) {
			console.error('Failed to fetch invitations:', err);
		} finally {
			loading = false;
		}
	}

	function handlePageChange(page: number) {
		fetchInvitations(page, searchTerm);
	}

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		});
	}

	/**
	 * Determines invitation status based on logState and expiresAt
	 */
	function getInvitationStatus(logState: boolean, expiresAt: string): string {
		if (logState) {
			return 'Accepted';
		}

		const now = new Date();
		const expirationDate = new Date(expiresAt);

		if (expirationDate < now) {
			return 'Expired';
		}

		return 'Invited';
	}

	type BadgeColor = 'green' | 'blue' | 'yellow' | 'red' | 'gray';

	function getStatusBadgeProps(status: string): { color: BadgeColor; class: string } {
		switch (status) {
			case 'Accepted':
				return {
					color: 'green' as const,
					class: 'w-full bg-green-300 dark:bg-green-900 font-bold max-w-[150px] py-1.5',
				};
			case 'Invited':
				return { color: 'blue' as const, class: 'w-full bg-blue-300 dark:bg-blue-950 font-bold max-w-[150px] py-1.5' };
			case 'Pending':
				return {
					color: 'yellow' as const,
					class: 'w-full bg-yellow-200 dark:bg-yellow-900 font-bold max-w-[150px] py-1.5',
				};
			case 'Expired':
				return { color: 'red' as const, class: 'w-full bg-red-300 dark:bg-red-900 font-bold max-w-[150px] py-1.5' };
			default:
				return { color: 'gray' as const, class: 'w-full bg-gray-300 dark:bg-gray-700 font-bold max-w-[150px] py-1.5' };
		}
	}

	// *************** FOR THE SEARCHBOX *******************

	let searchTerm = $state('');

	let filteredItems = $derived.by(() =>
		graduatesList.filter(
			(item) =>
				!searchTerm ||
				item.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
				item.email.toLowerCase().includes(searchTerm.toLowerCase()),
		),
	);

	let emptyRowsCount = $derived(Math.max(0, TOTAL_ROWS - filteredItems.length));

	async function handleSearch() {
		if (dev) {
			console.log('Searching for:', searchTerm);
		}
		// Reset to page 1 when searching
		await fetchInvitations(1, searchTerm);
	}

	let showModal = $state(false);
	let showCSVModal = $state(false);
	let selectedGraduate = $state<GraduateInvitation | null>(null);

	function openModal(graduate: GraduateInvitation) {
		selectedGraduate = graduate;
		showModal = true;
	}

	function closeModal() {
		showModal = false;
		selectedGraduate = null;
	}

	async function handleDelete() {
		if (selectedGraduate) {
			console.log('Deleting graduate:', selectedGraduate.id);
			// TODO: call delete user logic, didn't find endpoint in backend, users are immune to cease of existance.
			closeModal();
		}
	}

	async function handleSendInvite() {
		if (selectedGraduate) {
			console.log('Sending invite to:', selectedGraduate.email);
			// TODO: call the invite endpoint that triggers the resend stuff.
			closeModal();
		}
	}

	function handleUploadSuccess() {
		invalidateAll();
		if (dev) {
			console.log('CSV uploaded successfully, refreshing data...');
		}
	}

	function handleUploadError(error: string) {
		console.error('CSV upload failed:', error);
		// Keep modal open so user can see the error and try again
	}
</script>

{#if data.error}
	<div class="px-10 py-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded">
		Error loading invitations: {data.error}
	</div>
{/if}

<div class="flex gap-2 px-10 py-4 items-center justify-between bg-white dark:bg-background blur-bg">
	<div class="flex gap-2 items-center">
		<Input type="text" placeholder="Search by name or email" bind:value={searchTerm} class="max-w-[300px]" />
		<Button color="blue" onclick={handleSearch} class="cursor-pointer" disabled={loading}>
			<SearchOutline class="w-5 h-5 me-2" />
			Search
		</Button>
		<Button
			color="alternative"
			onclick={() => {
				showCSVModal = true;
			}}
			class="cursor-pointer flex items-center flex-row justify-center whitespace-nowrap"
		>
			<FileCsvOutline class="w-5 h-5 me-2" />
			Upload CSV
		</Button>
	</div>
	<PaginationNav
		{currentPage}
		{totalPages}
		onPageChange={handlePageChange}
		classes={{
			active: 'bg-green-100 bg-primary-300 text-foreground dark:bg-primary-500 dark:text-white',
		}}
	/>
</div>

{#if loading}
	<div class="flex justify-center items-center py-20">
		<Spinner size="12" />
	</div>
{:else}
	<Table class="dark:bg-background blur-bg mr-0 w-full text-foreground dark:text-foreground overflow-x-auto">
		<TableHead class="text-center">
			<TableHeadCell>Name</TableHeadCell>
			<TableHeadCell>Email</TableHeadCell>
			<TableHeadCell>Cohort</TableHeadCell>
			<TableHeadCell>Invitation Status</TableHeadCell>
			<TableHeadCell>Created At</TableHeadCell>
			<TableHeadCell>Expires At</TableHeadCell>
			<TableHeadCell>Options</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each filteredItems as graduate}
				{@const status = getInvitationStatus(graduate.logState, graduate.expiresAt)}
				{@const badgeProps = getStatusBadgeProps(status)}
				<TableBodyRow class="h-16">
					<TableBodyCell class="text-center">{graduate.fullName}</TableBodyCell>
					<TableBodyCell class="text-center">{graduate.email}</TableBodyCell>
					<TableBodyCell class="text-center">{graduate.cohort}</TableBodyCell>
					<TableBodyCell class="text-center">
						<Badge color={badgeProps.color} class={badgeProps.class}>
							{status.toUpperCase()}
						</Badge>
					</TableBodyCell>
					<TableBodyCell class="text-center">{formatDate(graduate.createdAt)}</TableBodyCell>
					<TableBodyCell class="text-center">{formatDate(graduate.expiresAt)}</TableBodyCell>
					<TableBodyCell class="text-center">
						<Button size="xs" color="alternative" class="cursor-pointer w-full" onclick={() => openModal(graduate)}
							>Show</Button
						>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
			<!-- This is to keep the layout fixed when there are empty rows. otherwise it affects the height and it's hard to control -->
			{#each Array(emptyRowsCount) as _, i}
				<TableBodyRow class="h-16">
					<TableBodyCell class="text-center">&nbsp;</TableBodyCell>
					<TableBodyCell class="text-center">&nbsp;</TableBodyCell>
					<TableBodyCell class="text-center">&nbsp;</TableBodyCell>
					<TableBodyCell class="text-center">&nbsp;</TableBodyCell>
					<TableBodyCell class="text-center">&nbsp;</TableBodyCell>
					<TableBodyCell class="text-center">&nbsp;</TableBodyCell>
					<TableBodyCell class="text-center">&nbsp;</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
{/if}

<!-- ************* Options for graduate modal ************** -->
<Modal
	bind:open={showModal}
	size="xs"
	autoclose={false}
	class="w-full md:w-auto bg-background dark:bg-background backdrop-blur-xl"
>
	<div class="flex flex-col items-center gap-4 justify-center">
		{#if selectedGraduate}
			<div class="text-center mb-2">
				<h3 class="text-lg font-semibold text-gray-900 dark:text-white">
					{selectedGraduate.fullName}
				</h3>
				<p class="text-sm text-gray-500 dark:text-gray-400">{selectedGraduate.email}</p>
				<p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Cohort {selectedGraduate.cohort}</p>
			</div>
		{/if}

		<div class="flex gap-4 justify-center items-center">
			<Button
				color="red"
				class="!p-3 rounded-full cursor-pointer"
				onclick={handleDelete}
				aria-label="Delete invitation"
				title="Delete invitation"
			>
				<TrashBinSolid class="shrink-0 h-6 w-6" />
			</Button>

			<Button
				color="blue"
				class="!p-3 rounded-full cursor-pointer"
				onclick={handleSendInvite}
				aria-label="Resend invitation"
				title="Resend invitation"
			>
				<EnvelopeOpenSolid class="shrink-0 h-6 w-6" />
			</Button>
		</div>

		<Button size="sm" color="alternative" class="mt-2 cursor-pointer" onclick={closeModal}>Close</Button>
	</div>
</Modal>

<!-- ************************ UPLOAD CSV WITH INVITATIONS *********************** -->
<Modal bind:open={showCSVModal} size="md" autoclose={false} class="bg-background dark:bg-background backdrop-blur-xl">
	<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Send Invitations</h3>
	<div class="space-y-3 mb-4">
		<p class="text-sm text-gray-600 dark:text-gray-400">
			To send out invitations, please provide a CSV file with the following format:
		</p>
		<div class="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg font-mono text-sm">
			<p class="text-gray-700 dark:text-gray-300">first_name,last_name,cohort,email</p>
			<p class="text-gray-600 dark:text-gray-400">Pepe,Pelotas,25,pepe_pelotas@gmail.com</p>
		</div>
		<p class="text-xs text-gray-500 dark:text-gray-500">Note: Maximum file size is 1MB</p>
	</div>

	<UploadCSV onSuccess={handleUploadSuccess} onError={handleUploadError} />

	<div class="mt-4 flex justify-end">
		<Button
			size="sm"
			color="alternative"
			onclick={() => {
				showCSVModal = false;
			}}
		>
			Close
		</Button>
	</div>
</Modal>
