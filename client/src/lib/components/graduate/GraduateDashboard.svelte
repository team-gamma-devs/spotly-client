<script lang="ts">
	import { page } from '$app/state';
	import GenericBoxVisible from '../main/utils/GenericBoxVisible.svelte';
	import TechTag from '../main/utils/TechTag.svelte';
	import { availableFilterTags } from '$lib/constants/filterTags';
	import { GithubSolid, LinkedinSolid, FileCheckSolid } from 'flowbite-svelte-icons';
	import pfpFallback from '$lib/assets/svgs/pfp-fallback.svg';
	import murica from '$lib/assets/svgs/united-states-flag-icon.svg';
	import type { PageData } from '../../../routes/app/graduate/$types';
	import { dev } from '$app/environment';
	import { Spinner, Alert } from 'flowbite-svelte';

	let { data }: { data: PageData } = $props();

	const userData = $derived(data.userFull);
	const userName = $derived(`${userData?.firstName || ''} ${userData?.lastName || ''}`);
	const userPfp = $derived(userData?.avatarUrl || page.data.user.avatarUrl || pfpFallback);

	if (dev) {
		$effect(() => {
			console.log('Props data:', data);
			console.log('UserFull from props:', data.userFull);
		});
	}

	// same approach as in GraduateCard to convert skills to techTags
	const techTags = $derived(
		(userData?.cvInfo?.skills || []).map((skill: string) => {
			const tagName = typeof skill === 'string' ? skill.toLowerCase() : '';
			const foundTag = availableFilterTags.find((t) => t.name.toLowerCase() === tagName || t.code === tagName);
			return (
				foundTag || {
					code: tagName,
					name: typeof skill === 'string' ? skill : 'Unknown',
					color: 'tag-default',
				}
			);
		}),
	);
</script>

<section
	id="graduate-cards-grid"
	class="graduate-dashboard-container flex flex-col items-center justify-start gap-5 h-full"
>
	<div class="w-full max-w-[1600px]">
		<GenericBoxVisible>
			{#if userData}
				<div class="p-6 space-y-6">
					<!-- ******* Header **************** -->
					<div class="flex gap-4 items-start border-b border-gray-200 dark:border-gray-700 pb-6">
						<div class="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden ring-2 ring-gray-300 dark:ring-gray-700">
							<img src={userPfp} alt="{userName}'s Profile" class="w-full h-full object-cover" />
						</div>

						<div class="flex-1">
							<h1 class="text-3xl font-bold mb-2">{userName}</h1>
							<p class="text-gray-600 dark:text-gray-400 mb-3">{userData.email}</p>

							<div class="flex items-center gap-3 mb-3">
								<span class="text-sm bg-red-800 dark:bg-red-900 rounded-md px-2 py-1 font-bold text-white">
									Cohort {userData.cohort}
								</span>
								<span
									class="text-xs ring-1 ring-gray-700 rounded-md px-2 py-1 font-bold text-foreground capitalize flex items-center justify-center"
								>
									<img src={murica} alt="USA Flag" width="20" height="20" class="inline mr-2" />{userData.cvInfo
										?.englishLevel || 'N/A'} English
								</span>
								{#if userData.cvInfo?.worksInIt}
									<span class="text-xs bg-green-600 dark:bg-green-700 rounded-md px-2 py-1 font-bold text-white">
										Currently Working
									</span>
								{/if}
							</div>

							<!-- *********** Links ****************** -->
							<div class="flex gap-2">
								{#if userData.cvInfo?.linkedinUrl}
									<a
										href={userData.cvInfo.linkedinUrl}
										target="_blank"
										rel="noopener noreferrer"
										class="w-9 h-9 flex items-center justify-center rounded bg-blue-800 dark:bg-blue-900 hover:bg-blue-600 text-white transition-colors"
										aria-label="LinkedIn Profile"
										title="LinkedIn Profile"
									>
										<LinkedinSolid class="w-5 h-5" />
									</a>
								{/if}
								{#if userData.cvInfo?.personalCvUrl}
									<a
										href={userData.cvInfo.personalCvUrl}
										target="_blank"
										rel="noopener noreferrer"
										class="w-9 h-9 flex items-center justify-center rounded bg-gray-800 dark:bg-gray-900 hover:bg-gray-600 text-white transition-colors"
										aria-label="View CV"
										title="View CV"
									>
										<FileCheckSolid class="w-5 h-5" />
									</a>
								{/if}
								{#if userData.githubUsername}
									<a
										href={`https://github.com/${userData.githubUsername}`}
										target="_blank"
										rel="noopener noreferrer"
										class="w-9 h-9 flex items-center justify-center rounded bg-gray-800 dark:bg-gray-900 hover:bg-gray-600 text-white transition-colors"
										aria-label="GitHub Profile"
										title="GitHub Profile"
									>
										<GithubSolid class="w-5 h-5" />
									</a>
								{/if}
							</div>
						</div>
					</div>

					<!-- *********** techTags **************** -->
					<div>
						<h2 class="text-xl font-semibold mb-4">Technical Skills</h2>
						{#if techTags.length > 0}
							<div class="flex flex-wrap gap-2">
								{#each techTags as tag}
									<TechTag {tag} checked={true} editable={false} />
								{/each}
							</div>
						{:else}
							<p class="text-gray-500 dark:text-gray-400 italic">No skills added yet.</p>
						{/if}
					</div>

					<!-- ************  Quick Stats ****************  -->
					<div class="flex items-center justify-evenly gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
						<div class="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
							<p class="text-2xl font-bold text-primary-600 dark:text-primary-400">
								{techTags.length}
							</p>
							<p class="text-sm text-gray-600 dark:text-gray-400">Technologies</p>
						</div>
						<div class="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
							<p class="text-2xl font-bold text-primary-600 dark:text-primary-400">
								Cohort {userData.cohort}
							</p>
							<p class="text-sm text-gray-600 dark:text-gray-400">Graduate</p>
						</div>
						<div class="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
							<p class="text-2xl font-bold text-primary-600 dark:text-primary-400 capitalize">
								{userData.cvInfo?.englishLevel || 'N/A'}
							</p>
							<p class="text-sm text-gray-600 dark:text-gray-400">English Level</p>
						</div>
					</div>
				</div>
			{:else if data.userFullError}
				<Alert color="red" class="w-full">
					<span class="font-semibold">{data.userFullError}</span>
				</Alert>
			{:else}
				<div class="p-6 text-center">
					<p class="text-gray-500 dark:text-gray-400"><Spinner size="6" class="mr-3"></Spinner>Loading User Data...</p>
				</div>
			{/if}
		</GenericBoxVisible>
	</div>
</section>

<style>
	.graduate-dashboard-container {
		min-height: 100vh;
		width: 100%;
	}
</style>
