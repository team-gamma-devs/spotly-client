<script lang="ts">
	import { GenericBoxVisible, GenericBoxInvisible } from '$lib/components/main/utils';
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
	<div
		class="flex h-[80vh] w-full flex-col items-center justify-center text-center backdrop-blur-md mb-5"
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
	<GenericBoxVisible classes="w-full max-w-7xl space-y-32 py-10 px-20">
		<!--  *************** Upload CV (from LEFT) ******************** -->
		<div
			use:animateOnScroll={'left'}
			id="upload-cv-container"
			class="grid grid-cols-1 items-center gap-8 md:grid-cols-2"
		>
			<GenericBoxInvisible title="Effortless Profile Creation" classes="h-full" classTitle="justify-end">
				<svelte:fragment slot="icon">
					<FileDocOutline class="h-7 w-7" />
				</svelte:fragment>
				<p class="text-end">
					Seamlessly upload your CV and academic history. Our system parses your documents to build a comprehensive,
					searchable profile in seconds.
				</p>
			</GenericBoxInvisible>
			<div class="flex items-center justify-center">
				<dotlottie-player
					src="/lottie/upload-cv.json"
					background="transparent"
					speed="1"
					style="width: 300px; height: 300px;"
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
				<dotlottie-player
					src="/lottie/github.json"
					background="transparent"
					speed="1"
					style="width: 300px; height: 300px;"
					loop
					autoplay
				></dotlottie-player>
			</div>
			<GenericBoxInvisible title="Showcase Your Skills" classes="h-full">
				<svelte:fragment slot="icon">
					<GithubSolid class="h-7 w-7" />
				</svelte:fragment>
				<p>
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
			<GenericBoxInvisible title="Candidate Filtering" classes="h-full" classTitle="justify-end">
				<svelte:fragment slot="icon">
					<FilterOutline class="h-7 w-7" />
				</svelte:fragment>
				<p class="text-end">
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
			<GenericBoxInvisible title="Streamlined Hiring" classes="h-full">
				<svelte:fragment slot="icon">
					<FileCsvOutline class="h-7 w-7" />
				</svelte:fragment>
				<p>
					Streamline your recruitment process. Upload a CSV to send bulk invitations to promising graduates, managing
					the entire workflow from one central dashboard.
				</p>
			</GenericBoxInvisible>
		</div>
	</GenericBoxVisible>
</div>