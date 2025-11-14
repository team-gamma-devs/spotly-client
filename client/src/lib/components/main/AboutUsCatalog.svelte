<script lang="ts">
	import GenericBoxInvisible from './utils/GenericBoxInvisible.svelte';
	import { LinkedinSolid, GithubSolid, CaretUpSolid, HammerSolid } from 'flowbite-svelte-icons';
	import { teamMembers } from '$lib/constants/authors';

	let selectedMember: string | null = null;
	let mobileSelectedMember: string | null = null;

	const selectMember = (memberId: string) => {
		selectedMember = memberId;
	};

	const toggleMobileMember = (memberId: string) => {
		mobileSelectedMember = mobileSelectedMember === memberId ? null : memberId;
	};
</script>

<GenericBoxInvisible classes="w-full max-w-7xl mt-16 md:mt-24 lg:mt-32 px-6 md:px-12 lg:px-20">
	<h2 class="text-3xl md:text-4xl font-bold text-center">Meet the Team</h2>
	<h3 class="text-md text-center mb-12 dark:text-gray-400 text-gray-600 zalando-font">Team Gamma Devs</h3>

	<!-- ******************* DESKTOP VERSION (hidden on mobile) ******************* -->
	<div class="hidden md:block">
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
						class="group relative overflow-hidden rounded-md transition-all duration-500 ease-in-out cursor-pointer w-70 h-70 max-w-100 shadow-xl"
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
							class="absolute bottom-0 left-0 right-0 w-fit rounded-xl mb-2 mr-auto ml-auto ring-1 ring-gray-600 bg-[#080C17D6] px-3 py-2 flex justify-center gap-4"
						>
							<a
								href={member.github}
								target="_blank"
								rel="noopener noreferrer"
								class="text-white hover:text-primary-400 transition-colors"
								title="{member.name}'s Github"
								on:click|stopPropagation
							>
								<GithubSolid class="h-6 w-6" />
							</a>
							<a
								href={member.linkedin}
								target="_blank"
								rel="noopener noreferrer"
								class="text-white hover:text-primary-400 transition-colors"
								title="{member.name}'s LinkedIn"
								on:click|stopPropagation
							>
								<LinkedinSolid class="h-6 w-6" />
							</a>
						</div>
					</button>

					<!-- ***************  Details Panel *************** -->
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
						<div class="absolute"></div>
					{/if}
				</div>
			{/each}
		</div>
		{#if selectedMember === null}
			<div class="flex flex-col justify-center items-center mt-8 gap-2 text-gray-600 dark:text-gray-400">
				<div class="hand-pointer"><CaretUpSolid class="shrink-0 h-6 w-6" /></div>
				<p class="text-sm font-medium">Click on a team member to learn more</p>
			</div>
		{/if}
	</div>

	<!-- ******************* MOBILE VERSION (visible only on mobile because I was scared to touch the desktop version) ******************* -->
	<div class="block md:hidden space-y-6">
		{#each teamMembers as member}
			<div class="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
				<button
					on:click={() => toggleMobileMember(member.id)}
					class="w-full text-left"
				>
					<div class="relative aspect-square overflow-hidden">
						<img
							src={member.image}
							alt={member.name}
							class="w-full h-full object-cover"
						/>
						<div
							class="absolute bottom-0 left-0 right-0 w-fit rounded-xl mb-2 mr-auto ml-auto ring-1 ring-gray-600 bg-[#080C17D6] px-3 py-2 flex justify-center gap-4"
						>
							<a
								href={member.github}
								target="_blank"
								rel="noopener noreferrer"
								class="text-white hover:text-primary-400 transition-colors"
								title="{member.name}'s Github"
								on:click|stopPropagation
							>
								<GithubSolid class="h-6 w-6" />
							</a>
							<a
								href={member.linkedin}
								target="_blank"
								rel="noopener noreferrer"
								class="text-white hover:text-primary-400 transition-colors"
								title="{member.name}'s LinkedIn"
								on:click|stopPropagation
							>
								<LinkedinSolid class="h-6 w-6" />
							</a>
						</div>
					</div>

					<div class="p-4 flex justify-between items-center">
						<div>
							<h3 class="text-xl font-bold">{member.name}</h3>
							<p class="text-primary-500 font-semibold text-sm">{member.role}</p>
						</div>
						<svg 
							class="w-6 h-6 transition-transform duration-300"
							class:rotate-180={mobileSelectedMember === member.id}
							fill="none" 
							stroke="currentColor" 
							viewBox="0 0 24 24"
						>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
						</svg>
					</div>
				</button>

				{#if mobileSelectedMember === member.id}
					<div 
						class="px-4 pb-4 border-t border-gray-200 dark:border-gray-700 pt-4"
						style:animation="slideDown 0.3s ease-out"
					>
						<p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
							{member.description}
						</p>
					</div>
				{/if}
			</div>
		{/each}

		<!-- Mobile hint -->
		<div class="flex flex-col justify-center items-center mt-8 gap-2 text-gray-600 dark:text-gray-400">
			<p class="text-sm font-medium text-center">Tap on a team member to learn more</p>
		</div>
	</div>
</GenericBoxInvisible>

<style>
	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateX(10px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			max-height: 0;
		}
		to {
			opacity: 1;
			max-height: 500px;
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
		animation: bounce-point 1s ease-in-out infinite;
		display: inline-block;
	}
</style>