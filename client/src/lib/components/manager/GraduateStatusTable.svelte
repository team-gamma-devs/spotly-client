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
		TableSearch,
	} from 'flowbite-svelte';
	import { GraduatePills } from '$lib/mocks/mockGraduatePill';
	import GraduatePill from './GraduatePill.svelte';

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
				return { color: 'green' as const, class: 'w-full bg-green-300 dark:bg-green-900 font-bold' };
			case 'Invited':
				return { color: 'blue' as const, class: 'w-full bg-blue-300 dark:bg-blue-950 font-bold' };
			case 'Pending':
				return { color: 'yellow' as const, class: 'w-full bg-yellow-300 dark:bg-yellow-900 font-bold' };
			case 'Expired':
				return { color: 'red' as const, class: 'w-full bg-red-300 dark:bg-red-900 font-bold' };
			default:
				return { color: 'gray' as const, class: 'w-full bg-gray-300 dark:bg-gray-700 font-bold' };
		}
	}

	let searchTerm = $state('');

	let filteredItems = $derived.by(() =>
		graduatesList.filter(
			(item) =>
				!searchTerm ||
				item.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
				item.email.toLowerCase().includes(searchTerm.toLowerCase())
		)
	);
</script>

<Table class="dark:bg-background blur-bg mr-0 min-h-[100dvh] w-full text-foreground dark:text-foreground">
  <TableSearch placeholder="Search by name or email" hoverable bind:inputValue={searchTerm}></TableSearch>
	<TableHead class="text-center">
		<TableHeadCell>Name</TableHeadCell>
		<TableHeadCell>Email</TableHeadCell>
		<TableHeadCell>Invitation Status</TableHeadCell>
		<TableHeadCell>Last Updated</TableHeadCell>
		<TableHeadCell>Options</TableHeadCell>
	</TableHead>
	<TableBody>
		{#each filteredItems as graduate}
			<TableBodyRow>
				<TableBodyCell class="text-center">{graduate.firstName} {graduate.lastName}</TableBodyCell>
				<TableBodyCell class="text-center">{graduate.email}</TableBodyCell>
				<TableBodyCell class="text-center">
					{@const badgeProps = getStatusBadgeProps(graduate.invit_status)}
					<Badge color={badgeProps.color} class={badgeProps.class}>
						{graduate.invit_status.toUpperCase()}
					</Badge>
				</TableBodyCell>
				<TableBodyCell class="text-center">{formatDate(graduate.updatedAt)}</TableBodyCell>
				<TableBodyCell class="text-center">
					<Button size="xs" color="alternative" class="cursor-pointer w-full">Show</Button>
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>