<script lang="ts">
	import GenericBoxInvisible from './utils/GenericBoxInvisible.svelte';
	import { LinkedinSolid, GithubSolid, CaretUpOutline } from 'flowbite-svelte-icons';
	import { teamMembers } from '$lib/constants/authors';
	import { span } from 'flowbite-svelte';

	let selectedMember: string | null = null;

	const selectMember = (memberId: string) => {
		selectedMember = memberId;
	};
</script>

<GenericBoxInvisible classes="w-full max-w-7xl mt-16 md:mt-24 lg:mt-32 px-6 md:px-12 lg:px-20">
	<h2 class="text-3xl md:text-4xl font-bold text-center">Meet the Team</h2>
	<h3 class="text-md text-center mb-12 dark:text-gray-400 text-gray-600 zalando-font">Team Gamma Devs</h3>

	<div
		class="flex gap-6 transition-all duration-500 ease-in-out"
		class:flex-row={selectedMember === null}
		class:flex-col={selectedMember !== null}
	>
		{#each teamMembers as member}
			<div
				class="flex gap-6 items-start transition-all duration-500 ease-in-out"
				class:flex-col={selectedMember !== null && selectedMember !== member.id}
				class:lg:flex-row={selectedMember === member.id}
				class:flex-1={selectedMember === null}
			>
				<button
					on:click={() => selectMember(member.id)}
					class="group relative overflow-hidden rounded-sm transition-all duration-500 ease-in-out cursor-pointer w-70 h-70 max-w-100"
					class:w-full={selectedMember === null || selectedMember !== member.id}
					class:lg:w-64={selectedMember === member.id}
					class:opacity-100={selectedMember === null || selectedMember === member.id}
					class:opacity-60={selectedMember !== null && selectedMember !== member.id}
					class:hover:opacity-80={selectedMember !== null && selectedMember !== member.id}
				>
					<img
						src={member.image}
						alt={member.name}
						class="display-block w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
					/>

					<!-- ************** SELECT YOUR CHARACTER ****************** -->
					<div
						class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex justify-center gap-4"
					>
						<a
							href={member.github}
							target="_blank"
							rel="noopener noreferrer"
							class="text-white hover:text-primary-400 transition-colors"
							on:click|stopPropagation
						>
							<GithubSolid class="h-6 w-6" />
						</a>
						<a
							href={member.linkedin}
							target="_blank"
							rel="noopener noreferrer"
							class="text-white hover:text-primary-400 transition-colors"
							on:click|stopPropagation
						>
							<LinkedinSolid class="h-6 w-6" />
						</a>
					</div>
				</button>

				<!-- ***************  Details Panel *************** -->
				<!-- TODO: Add FIFA stats -->
				{#if selectedMember === member.id}
					<div
						class="flex-1 bg-gray-50 dark:bg-gray-800 rounded-lg p-6 md:p-8 transition-all duration-500 ease-in-out"
						style:animation="slideIn 0.5s ease-out"
					>
						<div class="flex justify-between items-start mb-4">
							<div>
								<h3 class="text-2xl font-bold mb-1">{member.name}</h3>
								<p class="text-primary-500 font-semibold">{member.role}</p>
							</div>
							<button
								on:click={() => (selectedMember = null)}
								class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
								aria-label="Close Details"
							>
								<svg class="w-5 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>
						<p class="text-gray-700 dark:text-gray-300 leading-relaxed max-h-[140px] overflow-y-auto">
							{member.description}
						</p>
					</div>
				{:else if selectedMember !== null}
					<!-- This isn't being used but it works, this was a pain in the ass so don't remove it -->
					<!-- The idea was to have a filled empty div to prevent each image from growing past certain width while preserving animations -->
					<!-- Turned out quite tricky... And they say backend is hard... ;D -->
					<div class="absolute"></div>
				{/if}
			</div>
		{/each}
	</div>
	<!-- Animated click hint -->
	{#if selectedMember === null}
		<div class="flex flex-col justify-center items-center mt-8 gap-2 text-gray-600 dark:text-gray-400">
			<div class="hand-pointer"><CaretUpOutline class="shrink-0 h-6 w-6" /></div>
			<p class="text-sm font-medium">Click on a team member to learn more</p>
		</div>
	{/if}
</GenericBoxInvisible>

<style>
	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateX(20px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@keyframes bounce-point {
		0%,
		100% {
			transform: translateY(5px);
		}
		50% {
			transform: translateY(-5px);
		}
	}

	.hand-pointer {
		animation: bounce-point 1.5s ease-in-out infinite;
		display: inline-block;
	}
</style>
