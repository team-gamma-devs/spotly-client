<script lang="ts">
	import { page } from '$app/state';
	import GenericBoxInvisible from '$lib/components/main/utils/GenericBoxInvisible.svelte';
	import GenericBoxVisible from '$lib/components/main/utils/GenericBoxVisible.svelte';
	import { Button, Card, Avatar, Badge, Timeline, TimelineItem } from 'flowbite-svelte';
	import {
		UserCircleSolid,
		CloseCircleOutline,
		BriefcaseSolid,
		ChartPieSolid,
		RocketSolid,
		UsersSolid,
		CheckCircleSolid,
		ClockSolid,
		ArrowRightOutline,
		FireSolid,
		FaceGrinStarsOutline,
		StarSolid,
	} from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';

	const user = $derived(page.data.user);
	const userFull = $derived(page.data.userFull);

	let stats = $state({
		totalGraduates: 0,
		activeSearches: 0,
		recentMatches: 0,
	});

	let heroVisible = $state(false);
	let statsVisible = $state(false);

	onMount(() => {
		setTimeout(() => (heroVisible = true), 100);
		setTimeout(() => (statsVisible = true), 300);
		console.log("UserFull: "+userFull);
		// TODO: Ask fede to implement live stats :D
		if (user) {
			setTimeout(() => {
				stats = {
					totalGraduates: 2,
					activeSearches: 12,
					recentMatches: 34,
				};
			}, 500);
		}
	});

	const features = [
		{
			icon: UsersSolid,
			title: 'Graduate Database',
			description: 'Access a complete database of Holberton graduates ready to join your team.',
			color: 'text-blue-600 dark:text-blue-400',
		},
		{
			icon: ChartPieSolid,
			title: 'Smart Filtering',
			description: 'Filter by technologies, English level, and tutor feedback to find the perfect match.',
			color: 'text-green-600 dark:text-green-400',
		},
		{
			icon: RocketSolid,
			title: 'Quick Onboarding',
			description: 'Streamlined invitation system to get graduates started with your organization.',
			color: 'text-purple-600 dark:text-purple-400',
		},
		{
			icon: FaceGrinStarsOutline,
			title: 'Quality Assured',
			description: 'All graduates are vetted with tutor feedback and comprehensive skill assessments.',
			color: 'text-yellow-600 dark:text-yellow-400',
		},
	];

	const quickActions = [
		{
			title: 'Search Graduates',
			description: 'Find your next team member',
			href: '/app/manager',
			icon: UsersSolid,
			color: 'bg-gradient-to-br from-blue-500 to-blue-700',
		},
		{
			title: 'Send Invitations',
			description: 'Invite graduates to join',
			href: '/app/manager',
			icon: RocketSolid,
			color: 'bg-gradient-to-br from-green-500 to-green-700',
		},
		{
			title: 'View Analytics',
			description: 'Track your recruiting metrics',
			href: '/app/manager',
			icon: ChartPieSolid,
			color: 'bg-gradient-to-br from-purple-500 to-purple-700',
		},
	];
</script>

<div class="min-h-screen">
	{#if user}
		<!-- LOGGED IN VERSION -->
		<div class="container mx-auto px-4 py-8">
			<div
				class="mb-12 transition-all duration-700 transform {heroVisible
					? 'opacity-100 translate-y-0'
					: 'opacity-0 -translate-y-4'}"
			>
				<div class="flex items-center justify-between flex-wrap gap-6">
					<div class="flex items-center gap-4">
						<Avatar
							src={user.avatarUrl || '/default-avatar.png'}
							size="xl"
							class="ring-4 ring-primary-500 dark:ring-primary-400"
						/>
						<div>
							<h1
								class="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent"
							>
								Welcome back, {user.firstName}!
							</h1>
							<p class="text-gray-600 dark:text-gray-400 mt-1 flex items-center gap-2">
								<FireSolid class="w-4 h-4 text-orange-500" />
								Ready to find amazing talent today?
							</p>
						</div>
					</div>
					{#if user.role === 'manager'}
						<Badge color="green" large class="flex items-center gap-2">
							<CheckCircleSolid class="w-4 h-4" />
							Manager Access
						</Badge>
					{:else}
						<Badge color="red" large class="flex items-center gap-2">
							<CloseCircleOutline class="w-4 h-4" />
							Manager Access
						</Badge>
					{/if}
				</div>
			</div>

			<!-- Stats Cards -->
			<div
				class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 transition-all duration-700 delay-200 transform {statsVisible
					? 'opacity-100 translate-y-0'
					: 'opacity-0 translate-y-4'}"
			>
				<GenericBoxVisible classes="w-full text-center hover:shadow-xl transition-shadow duration-300 p-3">
					<UsersSolid class="w-12 h-12 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
					<h3 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
						{stats.totalGraduates}
					</h3>
					<p class="text-gray-600 dark:text-gray-400">Total Graduates</p>
				</GenericBoxVisible>

				<GenericBoxVisible classes="w-full text-center hover:shadow-xl transition-shadow duration-300 p-3">
					<ChartPieSolid class="w-12 h-12 mx-auto mb-4 text-green-600 dark:text-green-400" />
					<h3 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
						{stats.activeSearches}
					</h3>
					<p class="text-gray-600 dark:text-gray-400">Active Searches</p>
				</GenericBoxVisible>

				<GenericBoxVisible classes="w-full text-center hover:shadow-xl transition-shadow duration-300 p-3">
					<StarSolid class="w-12 h-12 mx-auto mb-4 text-purple-600 dark:text-purple-400" />
					<h3 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
						{stats.recentMatches}
					</h3>
					<p class="text-gray-600 dark:text-gray-400">Recent Matches</p>
				</GenericBoxVisible>
			</div>

			<!-- Quick Actions -->
			<div class="mb-12">
				<h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
					<RocketSolid class="w-6 h-6 text-primary-600 dark:text-primary-400" />
					Quick Actions
				</h2>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
					{#each quickActions as action, i}
						<div
							class="transition-all duration-500 delay-{i * 100} transform {statsVisible
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-4'}"
						>
							<a href={action.href} class="block group">
								<Card class="h-full hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden p-5">
									<div
										class="{action.color} text-white p-6 rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300"
									>
										{#if action.icon === UsersSolid}
											<UsersSolid class="w-10 h-10" />
										{:else if action.icon === RocketSolid}
											<RocketSolid class="w-10 h-10" />
										{:else if action.icon === ChartPieSolid}
											<ChartPieSolid class="w-10 h-10" />
										{/if}
									</div>
									<h3
										class="text-xl font-bold mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
									>
										{action.title}
									</h3>
									<p class="text-gray-600 dark:text-gray-400 mb-4">
										{action.description}
									</p>
									<div
										class="flex items-center text-primary-600 dark:text-primary-400 font-semibold group-hover:gap-3 gap-2 transition-all"
									>
										Get Started
										<ArrowRightOutline class="w-4 h-4" />
									</div>
								</Card>
							</a>
						</div>
					{/each}
				</div>
			</div>

			<!-- Recent Activity Timeline -->
			<Card class="mb-8 p-5">
				<h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
					<ClockSolid class="w-6 h-6 text-primary-600 dark:text-primary-400" />
					Recent Activity
				</h2>
				<Timeline>
					<TimelineItem title="New graduate added" date="2 hours ago">
						<p class="flex items-center gap-2">
							<CheckCircleSolid class="w-4 h-4 text-green-600 dark:text-green-400" />
							Gabriel Barnada joined the platform with expertise in Python and FastAPI.
						</p>
					</TimelineItem>
					<TimelineItem title="Search completed" date="5 hours ago">
						<p class="flex items-center gap-2">
							<ChartPieSolid class="w-4 h-4 text-blue-600 dark:text-blue-400" />
							Your search for "Python + MongoDB" returned 23 matches.
						</p>
					</TimelineItem>
					<TimelineItem title="Invitation sent" date="1 day ago">
						<p class="flex items-center gap-2">
							<RocketSolid class="w-4 h-4 text-purple-600 dark:text-purple-400" />
							Batch invitation sent to 15 graduates from Cohort 26.
						</p>
					</TimelineItem>
				</Timeline>
			</Card>
		</div>
	{:else}
		<!-- ************************ LOGGED OUT VERSION *********************** -->
		<div class="container mx-auto px-4 py-16">
			<div
				class="text-center mb-20 transition-all duration-700 transform {heroVisible
					? 'opacity-100 translate-y-0'
					: 'opacity-0 -translate-y-4'}"
			>
				<div class="flex justify-center mb-6">
					<div class="relative">
						<div class="absolute inset-0 bg-primary-500 blur-3xl opacity-20 rounded-full"></div>
						<enhanced:img src="$lib/assets/svgs/spotly-logo-color.svg" aria-label="Spotly Logo" width="100" height="100" alt="Spotly Logo"
						></enhanced:img>
					</div>
				</div>
				<h1
					class="text-6xl font-bold mb-6 pb-2 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 bg-clip-text text-transparent"
				>
					Welcome to Spotly
				</h1>
				<p class="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
					Connect with talented graduates and build your dream team. Filter by skills, experience, and feedback to find
					the perfect match.
				</p>
				<div class="flex gap-4 justify-center flex-wrap">
					<Button
						size="xl"
						color="green"
						href="/login"
						class="font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
					>
						<UserCircleSolid class="w-5 h-5 mr-2" />
						Log In
					</Button>
					<Button
						size="xl"
						color="alternative"
						outline
						href="/welcome"
						class="font-bold hover:scale-105 transition-all duration-300"
					>
						Meet the Team
						<ArrowRightOutline class="w-5 h-5 ml-2" />
					</Button>
				</div>
			</div>

			<!--**************** Features Grid **************** -->
			<div class="mb-20">
				<h2 class="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Why Choose Spotly?</h2>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{#each features as feature, i}
						<div
							class="transition-all duration-500 delay-{i * 100} transform {statsVisible
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-4'}"
						>
							<GenericBoxVisible
								classes="text-center h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
							>
								{#if feature.icon === UsersSolid}
									<UsersSolid class="w-12 h-12 mx-auto mb-4 {feature.color}" />
								{:else if feature.icon === ChartPieSolid}
									<ChartPieSolid class="w-12 h-12 mx-auto mb-4 {feature.color}" />
								{:else if feature.icon === RocketSolid}
									<RocketSolid class="w-12 h-12 mx-auto mb-4 {feature.color}" />
								{:else if feature.icon === FaceGrinStarsOutline}
									<FaceGrinStarsOutline class="w-12 h-12 mx-auto mb-4 {feature.color}" />
								{/if}
								<h3 class="text-xl font-bold mb-3 text-gray-900 dark:text-white">
									{feature.title}
								</h3>
								<p class="text-gray-600 dark:text-gray-400">
									{feature.description}
								</p>
							</GenericBoxVisible>
						</div>
					{/each}
				</div>
			</div>

			<!-- *************************  CTA ******************* -->
			<Card class="min-w-[100%] bg-gradient-to-br from-primary-500 to-primary-700 text-white border-0">
				<div class="text-center py-12">
					<FaceGrinStarsOutline class="w-16 h-16 mx-auto mb-6 opacity-90" />
					<h2 class="text-4xl font-bold mb-4">Ready to Find Your Next Star?</h2>
					<p class="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
						Join <b>MILLIONS</b> of managers who trust Spotly to connect with exceptional graduates.
					</p>
					<Button
						size="xl"
						color="light"
						href="/login"
						class="font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
					>
						Start Your Journey
						<ArrowRightOutline class="w-5 h-5 ml-2" />
					</Button>
				</div>
			</Card>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
				<div>
					<div class="text-5xl font-bold text-primary-600 dark:text-primary-400 mb-2">12</div>
					<div class="text-gray-600 dark:text-gray-400">Talented Graduates</div>
				</div>
				<div>
					<div class="text-5xl font-bold text-primary-600 dark:text-primary-400 mb-2">50+</div>
					<div class="text-gray-600 dark:text-gray-400">Technologies</div>
				</div>
				<div>
					<div class="text-5xl font-bold text-primary-600 dark:text-primary-400 mb-2">99.999995%</div>
					<div class="text-gray-600 dark:text-gray-400">Quality Vetted</div>
				</div>
			</div>
		</div>
	{/if}
</div>
