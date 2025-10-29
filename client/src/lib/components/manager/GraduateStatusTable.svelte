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
	} from 'flowbite-svelte';
	import { SearchOutline, TrashBinSolid, EnvelopeOpenSolid, FileCsvOutline } from 'flowbite-svelte-icons';
	import { GraduatePills } from '$lib/mocks/mockGraduatePill';

	const TOTAL_ROWS = 20; // Total number of rows to always display
  // TODO: The pagination stuff.

	let graduatesList = GraduatePills.map((graduate) => ({
		...graduate,
		fullName: `${graduate.firstName} ${graduate.lastName}`,
	}));

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

	type BadgeColor = 'green' | 'blue' | 'yellow' | 'red' | 'gray';

	function getStatusBadgeProps(status: string): { color: BadgeColor; class: string } {
		switch (status) {
			case 'Accepted':
				return { color: 'green' as const, class: 'w-full bg-green-300 dark:bg-green-900 font-bold max-w-[150px] py-1.5' };
			case 'Invited':
				return { color: 'blue' as const, class: 'w-full bg-blue-300 dark:bg-blue-950 font-bold max-w-[150px] py-1.5' };
			case 'Pending':
				return { color: 'yellow' as const, class: 'w-full bg-yellow-200 dark:bg-yellow-900 font-bold max-w-[150px] py-1.5' };
			case 'Expired':
				return { color: 'red' as const, class: 'w-full bg-red-300 dark:bg-red-900 font-bold max-w-[150px] py-1.5' };
			default:
				return { color: 'gray' as const, class: 'w-full bg-gray-300 dark:bg-gray-700 font-bold max-w-[150px] py-1.5' };
		}
	}

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
		console.log('Searching for:', searchTerm);
		// TODO: theres no endpoint to search for specific graduate.
	}

	let showModal = $state(false);
	let selectedGraduate = $state<(typeof graduatesList)[0] | null>(null);

	function openModal(graduate: (typeof graduatesList)[0]) {
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
			// TODO: call the invite endpoint that triggers the resend stuff, also didn't find one in backend so must tell fede.
			closeModal();
		}
	}
	async function handleAddTutorFeedback() {
		// TODO: on tutor add feedbackamsdlmwkqo mdasd 
		closeModal();
	}
	async function handleAddCSV() {
		//TODO: manager can upload CSV and generate invitations.
	}
</script>

<div class="flex gap-2 px-10 py-4 items-center justify-start bg-white dark:bg-background blur-bg">
	<Input type="text" placeholder="Search by name or email" bind:value={searchTerm} class="flex-1 max-w-[300px]" />
	<Button color="blue" onclick={handleSearch} class="cursor-pointer">
		<SearchOutline class="w-5 h-5 me-2" />
		Search
	</Button>
		<Button color="alternative" onclick={handleAddCSV} class="cursor-pointer">
		<FileCsvOutline class="w-5 h-5 me-2" />
		Upload CSV
	</Button>
</div>

<Table class="dark:bg-background blur-bg mr-0 w-full text-foreground dark:text-foreground overflow-x-auto">
	<TableHead class="text-center">
		<TableHeadCell>Name</TableHeadCell>
		<TableHeadCell>Email</TableHeadCell>
		<TableHeadCell>Invitation Status</TableHeadCell>
		<TableHeadCell>Last Updated</TableHeadCell>
		<TableHeadCell>Options</TableHeadCell>
	</TableHead>
	<TableBody>
		{#each filteredItems as graduate}
			<TableBodyRow class="h-16">
				<TableBodyCell class="text-center">{graduate.firstName} {graduate.lastName}</TableBodyCell>
				<TableBodyCell class="text-center">{graduate.email}</TableBodyCell>
				<TableBodyCell class="text-center">
					{@const badgeProps = getStatusBadgeProps(graduate.invitStatus)}
					<Badge color={badgeProps.color} class={badgeProps.class}>
						{graduate.invitStatus.toUpperCase()}
					</Badge>
				</TableBodyCell>
				<TableBodyCell class="text-center">{formatDate(graduate.updatedAt)}</TableBodyCell>
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
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>

<!-- ************* Options for graduate modal ************** -->
<Modal
	bind:open={showModal}
	size="xs"
	autoclose={false}
	class="min-w-100 bg-white dark:bg-gray-900 blur-bg"
>
	<div class="flex flex-col items-center gap-4 justify-center">
		{#if selectedGraduate}
			<div class="text-center mb-2">
				<h3 class="text-lg font-semibold text-gray-900 dark:text-white">
					{selectedGraduate.firstName}
					{selectedGraduate.lastName}
				</h3>
				<p class="text-sm text-gray-500 dark:text-gray-400">{selectedGraduate.email}</p>
			</div>
		{/if}

		<div class="flex gap-4 justify-center items-center">
			<Button
				color="red"
				class="!p-3 rounded-full cursor-pointer"
				onclick={handleDelete}
				aria-label="Delete graduate"
				title="Delete graduate"
			>
				<TrashBinSolid class="shrink-0 h-6 w-6" />
			</Button>

			<Button
				color="blue"
				class="!p-3 rounded-full cursor-pointer"
				onclick={handleSendInvite}
				aria-label="Send invitation"
				title="Send invitation"
			>
				<EnvelopeOpenSolid class="shrink-0 h-6 w-6" />
			</Button>
		</div>

		<Button size="sm" color="alternative" class="mt-2 cursor-pointer" onclick={closeModal}>Close</Button>
	</div>
</Modal>
