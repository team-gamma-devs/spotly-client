<script lang="ts">
	import GenericBoxVisible from '$lib/components/main/utils/GenericBoxVisible.svelte';
	import { onMount } from 'svelte';

	let heroAnimate = false;
	onMount(() => {
		heroAnimate = true;
	});

	function animateOnScroll(node: HTMLElement) {
		let observer: IntersectionObserver;

		const handleIntersect = (entries: IntersectionObserverEntry[]) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					node.style.setProperty('--opacity', '1');
					node.style.setProperty('--transform', 'translateY(0)');
				}
			});
		};

		const createObserver = () => {
			const options = {
				root: null,
				threshold: 0.5
			};
			observer = new IntersectionObserver(handleIntersect, options);
			observer.observe(node);
		};

		createObserver();

		return {
			destroy() {
				if (observer) {
					observer.disconnect();
				}
			}
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

	<!-- *************** Features ********************** -->
	<div class="w-full max-w-6xl space-y-16">
		<!--  *************** Upload CV ******************** -->
		<div
			use:animateOnScroll
			class="grid grid-cols-1 items-center gap-8 md:grid-cols-2"
			style="--opacity: 0; --transform: translateY(20px); transition: all 0.7s ease-out;"
		>
			<GenericBoxVisible title="Effortless Profile Creation" classes="h-full">
				<p class="text-gray-300">
					Seamlessly upload your CV and academic history. Our system parses your documents to build a
					comprehensive, searchable profile in seconds.
				</p>
			</GenericBoxVisible>
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

		<!-- ************   GitHub Integration **************** -->
		<div
			use:animateOnScroll
			class="grid grid-cols-1 items-center gap-8 md:grid-cols-2"
			style="--opacity: 0; --transform: translateY(20px); transition: all 0.7s ease-out;"
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
			<GenericBoxVisible title="Showcase Your Skills" classes="h-full">
				<p class="text-gray-300">
					Show, don't just tell. Integrate your GitHub account to display your top repositories,
					language statistics, and contribution activity directly on your profile.
				</p>
			</GenericBoxVisible>
		</div>

		<!-- **************** Filter Graduate ******************-->
		<div
			use:animateOnScroll
			class="grid grid-cols-1 items-center gap-8 md:grid-cols-2"
			style="--opacity: 0; --transform: translateY(20px); transition: all 0.7s ease-out;"
		>
			<GenericBoxVisible title="AI-Powered Recruitment" classes="h-full">
				<p class="text-gray-300">
					For managers, find the perfect candidate with our comprehensive filtering system, powered by AI CV Parsing.
				</p>
			</GenericBoxVisible>
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

		<!-- *********************** Bulk Invitations ********************** -->
		<div
			use:animateOnScroll
			class="grid grid-cols-1 items-center gap-8 md:grid-cols-2"
			style="--opacity: 0; --transform: translateY(20px); transition: all 0.7s ease-out;"
		>
			<div class="order-last flex items-center justify-center md:order-first">
				<dotlottie-player
					src="/lottie/bulk-invitations.json"
					background="transparent"
					speed="1"
					style="width: 300px; height: 300px;"
					loop
					autoplay
				></dotlottie-player>
			</div>
			<GenericBoxVisible title="Streamlined Hiring" classes="h-full">
				<p class="text-gray-300">
					Streamline your recruitment process. Upload a CSV to send bulk invitations to promising
					graduates, managing the entire workflow from one central dashboard.
				</p>
			</GenericBoxVisible>
		</div>
	</div>
</div>