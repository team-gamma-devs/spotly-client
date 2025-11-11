<script lang="ts">
	import { GenericBoxVisible, GenericBoxInvisible } from '$lib/components/main/utils';
	import GraduateCard from '$lib/components/manager/GraduateCard.svelte';
	import { FileCsvOutline, FilterOutline, GithubSolid, FileDocOutline } from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';

	let heroAnimate = false;
	onMount(() => {
		heroAnimate = true;
	});

	function animateOnScroll(node: HTMLElement, direction: 'left' | 'right') {
		const translateStart = direction === 'left' ? -100 : 100;

		node.style.transition = 'none';
		node.style.opacity = '0';
		node.style.transform = `translateX(${translateStart}px)`;

		const updateAnimation = () => {
			const rect = node.getBoundingClientRect();
			const windowHeight = window.innerHeight;
			const elementTop = rect.top;
			const elementHeight = rect.height; // Might use it to hide them, don't remove.
			const animationStart = windowHeight;
			const animationEnd = windowHeight * 0.2;

			let progress: number;

			if (elementTop >= animationStart) {
				progress = 0;
			} else if (elementTop <= animationEnd) {
				progress = 1;
			} else {
				progress = 1 - (elementTop - animationEnd) / (animationStart - animationEnd);
			}

			progress = Math.max(0, Math.min(1, progress));

			const easedProgress = 1 - Math.pow(1 - progress, 3);
			const opacity = easedProgress;
			const translateX = translateStart * (1 - easedProgress);

			node.style.opacity = opacity.toString();
			node.style.transform = `translateX(${translateX}px)`;
		};

		const handleScroll = () => {
			requestAnimationFrame(updateAnimation);
		};
		updateAnimation();
		window.addEventListener('scroll', handleScroll, { passive: true });

		return {
			destroy() {
				window.removeEventListener('scroll', handleScroll);
			},
		};
	}
</script>

<svelte:head>
	<title>Spotly | Welcome</title>
</svelte:head>

<div class="flex min-h-screen w-full flex-col items-center bg-transparent mb-20">
	<!-- *********************** HERO SECTION ************************ -->
	<div
		class="flex h-[80dvh] w-full flex-col items-center justify-center text-center backdrop-blur-md mb-40"
		style:opacity={heroAnimate ? 1 : 0}
		style:transition="opacity 1s ease-in-out"
	>
		<h1 class="mb-4 text-5xl font-extrabold tracking-tight md:text-7xl">
			Welcome to <span class="text-primary-500 zalando-font">Spotly</span>
		</h1>
		<p class="mb-8 max-w-2xl text-lg md:text-xl">
			The ultimate platform connecting brilliant Holbies with brilliant opportunities.
		</p>
		<a
			href="/login"
			class="rounded-lg bg-primary-600 px-8 py-4 text-lg font-bold text-white transition-transform hover:scale-105 hover:bg-primary-700"
		>
			Get Started
		</a>
	</div>

	<!-- ************************************* Features ******************************** -->
	<GenericBoxInvisible
		classes="w-full max-w-7xl space-y-16 md:space-y-24 lg:space-y-32 pt-15 pb-25 px-6 md:px-12 lg:px-20 backdrop-blur-xl rounded-3xl ring-1 ring-gray-300 dark:ring-gray-900"
	>
		<!--  *************** Upload CV (from LEFT) ******************** -->
		<div
			use:animateOnScroll={'left'}
			id="upload-cv-container"
			class="grid grid-cols-1 items-center gap-6 md:gap-8 md:grid-cols-2"
		>
			<GenericBoxInvisible
				title="Effortless Profile Creation"
				classes="h-full"
				classTitle="justify-center md:justify-end"
			>
				<svelte:fragment slot="icon">
					<FileDocOutline class="h-7 w-7" />
				</svelte:fragment>
				<p class="text-center md:text-end">
					Seamlessly upload your CV and academic history. Our system parses your documents to build a comprehensive,
					searchable profile in seconds.
				</p>
			</GenericBoxInvisible>
			<div class="flex items-center justify-center">
				<dotlottie-player
					src="/lottie/upload-cv.json"
					background="transparent"
					speed="1"
					style="width: 200px; height: 200px;"
					class="md:w-[250px] md:h-[250px] lg:w-[300px] lg:h-[300px]"
					loop
					autoplay
				></dotlottie-player>
			</div>
		</div>

		<!-- ************   GitHub Integration (from RIGHT) **************** -->
		<div
			use:animateOnScroll={'right'}
			id="github-integration-container"
			class="grid grid-cols-1 items-center gap-8 md:grid-cols-2"
		>
			<div class="order-last flex items-center justify-center md:order-first">
				<div
					class="flex items-center justify-center rounded-full bg-white shadow-md"
					style="width: 320px; height: 320px;"
				>
					<dotlottie-player
						src="/lottie/github.json"
						background="transparent"
						speed="1"
						style="width: 300px; height: 300px;"
						loop
						autoplay
					></dotlottie-player>
				</div>
			</div>
			<GenericBoxInvisible title="Showcase Your Skills" classes="h-full" classTitle="justify-center md:justify-start">
				<svelte:fragment slot="icon">
					<GithubSolid class="h-7 w-7" />
				</svelte:fragment>
				<p class="text-center md:text-start">
					Show, don't just tell. Integrate your GitHub account to display your top repositories, language statistics,
					and contribution activity directly on your profile.
				</p>
			</GenericBoxInvisible>
		</div>

		<!-- **************** Filter Graduate (from LEFT) ******************-->
		<div
			use:animateOnScroll={'left'}
			id="filter-graduate-container"
			class="grid grid-cols-1 items-center gap-8 md:grid-cols-2"
		>
			<GenericBoxInvisible title="Candidate Filtering" classes="h-full" classTitle="justify-center md:justify-end">
				<svelte:fragment slot="icon">
					<FilterOutline class="h-7 w-7" />
				</svelte:fragment>
				<p class="text-center md:text-end">
					For managers, find the perfect candidate with our comprehensive filtering system, powered by AI CV parsing.
				</p>
			</GenericBoxInvisible>
			<div class="flex items-center justify-center">
				<dotlottie-player
					src="/lottie/filter-candidate.json"
					background="transparent"
					speed="1"
					style="width: 300px; height: 300px;"
					loop
					autoplay
				></dotlottie-player>
			</div>
		</div>

		<!-- ***********************  Bulk Invitations (from RIGHT) ********************** -->
		<div
			use:animateOnScroll={'right'}
			id="bulk-invitation-container"
			class="grid grid-cols-1 items-center gap-8 md:grid-cols-2"
		>
			<div class="order-last flex items-center justify-center md:order-first">
				<dotlottie-player
					src="/lottie/bulk-invitations.json"
					background="transparent"
					speed=".5"
					style="width: 300px; height: 300px;"
					loop
					autoplay
				></dotlottie-player>
			</div>
			<GenericBoxInvisible title="Streamlined Hiring" classes="h-full" classTitle="justify-center md:justify-start">
				<svelte:fragment slot="icon">
					<FileCsvOutline class="h-7 w-7" />
				</svelte:fragment>
				<p class="text-center md:text-start">
					Streamline your recruitment process. Upload a CSV to send bulk invitations to promising graduates, managing
					the entire workflow from one central dashboard.
				</p>
			</GenericBoxInvisible>
		</div>
	</GenericBoxInvisible>

	<!-- ******************* Graduate Card Showcase Section ************************* -->
	<GenericBoxInvisible classes="w-full max-w-7xl mt-16 md:mt-24 lg:mt-32 px-6 md:px-12 lg:px-20">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
			<!-- Graduate Card Demo -->
			<div class="flex items-center justify-center">
				<GraduateCard
					id="demo-graduate"
					firstName="Federico"
					lastName="Marrero"
					email="señordelosbizcochos@example.com"
					avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Federico"
					englishLevel="Advanced"
					cohort={25}
					techStack={['Python', 'Azure', 'React', 'Bash', 'PostgreSQL', 'Docker']}
					githubUrl="https://github.com"
					linkedinUrl="https://linkedin.com"
					updatedAt={new Date().toISOString()}
					annotations={[
						{
							id: '1',
							annotation: 'Excellent problem-solving skills demonstrated in technical interview.',
							createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
						},
						{
							id: '2',
							annotation: 'Strong portfolio projects with clean code and documentation.',
							createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
						},
					]}
					tutorsFeedback={{
						'feedback-1': {
							tutorName: 'Sarah Johnson',
							professionalScore: 'Poor',
							technicalScore: 'Average',
							createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
							tutorId: 'PepePelotas-123',
						},
					}}
					worksInIt={false}
				/>
			</div>

			<div class="space-y-6">
				<h3 class="text-2xl md:text-3xl font-bold">Everything You Need to know</h3>

				<div class="space-y-4">
					<div class="flex gap-3">
						<div
							class="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold"
						>
							1
						</div>
						<div>
							<h4 class="font-semibold mb-1">Quick Profile Overview</h4>
							<p class="text-gray-600 dark:text-gray-400 text-sm">
								View cohort, English proficiency, and current employment status at a glance.
							</p>
						</div>
					</div>

					<div class="flex gap-3">
						<div
							class="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold"
						>
							2
						</div>
						<div>
							<h4 class="font-semibold mb-1">Tech Stack Visualization</h4>
							<p class="text-gray-600 dark:text-gray-400 text-sm">
								See all programming languages and technologies the candidate is proficient in, beautifully displayed
								with color-coded tags.
							</p>
						</div>
					</div>

					<div class="flex gap-3">
						<div
							class="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold"
						>
							3
						</div>
						<div>
							<h4 class="font-semibold mb-1">Direct Access to Profiles</h4>
							<p class="text-gray-600 dark:text-gray-400 text-sm">
								One-click access to GitHub repositories and LinkedIn profiles to review their work and professional
								background.
							</p>
						</div>
					</div>

					<div class="flex gap-3">
						<div
							class="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold"
						>
							4
						</div>
						<div>
							<h4 class="font-semibold mb-1">Collaborative Notes</h4>
							<p class="text-gray-600 dark:text-gray-400 text-sm">
								Add and view annotations from your hiring team to track interview feedback and hiring decisions.
							</p>
						</div>
					</div>

					<div class="flex gap-3">
						<div
							class="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold"
						>
							5
						</div>
						<div>
							<h4 class="font-semibold mb-1">Tutor Insights</h4>
							<p class="text-gray-600 dark:text-gray-400 text-sm">
								Access detailed feedback from Holberton tutors including professional and technical scores.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</GenericBoxInvisible>
</div>
