<script lang="ts">
	import { page } from '$app/state';
	import GenericBoxInvisible from '$lib/components/main/utils/GenericBoxInvisible.svelte';
	import GenericBoxVisible from '$lib/components/main/utils/GenericBoxVisible.svelte';
	import { Button, Card, Avatar, Badge, Timeline, TimelineItem } from 'flowbite-svelte';
	import {
		UserCircleSolid,
		CloseCircleOutline,
		BadgeCheckSolid,
		ChartPieSolid,
		RocketSolid,
		UsersSolid,
		CheckCircleSolid,
		ClockSolid,
		ArrowRightOutline,
		FireSolid,
		FaceGrinStarsOutline,
		StarSolid,
		GithubSolid,
	} from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';

	const user = $derived(page.data.user);
	const userFull = $derived(page.data.userFull);

	let title = 'Welcome to Spotly';
	let letters: string[] = $state([]);

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
		letters = title.split('');
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
			color: 'text-blue-500 dark:text-blue-400',
		},
		{
			icon: ChartPieSolid,
			title: 'Smart Filtering',
			description: 'Filter by technologies, English level, and tutor feedback to find the perfect match.',
			color: 'text-green-500 dark:text-green-400',
		},
		{
			icon: RocketSolid,
			title: 'Quick Onboarding',
			description: 'Streamlined invitation system to get graduates started with your organization.',
			color: 'text-purple-500 dark:text-purple-400',
		},
		{
			icon: BadgeCheckSolid,
			title: 'Quality Assured',
			description: 'All graduates are vetted with tutor feedback and skill assessments.',
			color: 'text-red-600 dark:text-yellow-400',
		},
	];

	const managerQuickActions = [
		{
			title: 'Search Graduates',
			description: 'Find your next team member',
			href: '/app/manager',
			icon: UsersSolid,
			color: 'bg-gradient-to-br from-blue-500 to-blue-700',
		},
		{
			title: 'Send Invitations',
			description: 'Invite graduates to join this wonderful app',
			href: '/app/manager/status',
			icon: RocketSolid,
			color: 'bg-gradient-to-br from-green-500 to-green-700',
		},
		{
			title: 'View Analytics',
			description: 'Track your recruiting metrics',
			href: '/app/manager/stats',
			icon: ChartPieSolid,
			color: 'bg-gradient-to-br from-purple-500 to-purple-700',
		},
	];

	const graduateQuickActions = [
		{
			title: 'My Dashboard',
			description: 'View and manage your profile',
			href: '/app/graduate',
			icon: UserCircleSolid,
			color: 'bg-gradient-to-br from-blue-500 to-blue-700',
		},
		{
			title: 'GitGudStats',
			description: 'Check your GitHub statistics',
			href: '/app/graduate',
			icon: GithubSolid,
			color: 'bg-gradient-to-br from-gray-700 to-gray-900',
		},
	];

	const quickActions = $derived(user?.role === 'manager' ? managerQuickActions : graduateQuickActions);

	// ============= ECCENTRIC LOGGED OUT SECTION =============
	let canvasRef = $state<HTMLCanvasElement | undefined>();
	let mouseX = $state(0);
	let mouseY = $state(0);
	let particles: Array<{ x: number; y: number; vx: number; vy: number; size: number; color: string }> = [];

	onMount(() => {
		if (!user && canvasRef) {
			const ctx = canvasRef.getContext('2d');
			if (!ctx) return;

			// Set canvas size
			const resizeCanvas = () => {
				if (canvasRef) {
					canvasRef.width = window.innerWidth;
					canvasRef.height = window.innerHeight;
				}
			};
			resizeCanvas();
			window.addEventListener('resize', resizeCanvas);

			// Create particles
			const colors = ['#ff6b35', '#f7931e', '#ff4500', '#ff8c00', '#ffa500'];
			for (let i = 0; i < 80; i++) {
				particles.push({
					x: Math.random() * canvasRef.width,
					y: Math.random() * canvasRef.height,
					vx: (Math.random() - 0.5) * 0.5,
					vy: (Math.random() - 0.5) * 0.5,
					size: Math.random() * 3 + 1,
					color: colors[Math.floor(Math.random() * colors.length)],
				});
			}

			// Animation loop
			const animate = () => {
				if (!canvasRef) return;
				ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);

				// Update and draw particles
				particles.forEach((p, i) => {
					p.x += p.vx;
					p.y += p.vy;

					// Bounce off edges
					if (canvasRef && (p.x < 0 || p.x > canvasRef.width)) p.vx *= -1;
					if (canvasRef && (p.y < 0 || p.y > canvasRef.height)) p.vy *= -1;

					// Draw particle
					ctx.fillStyle = p.color;
					ctx.beginPath();
					ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
					ctx.fill();

					// Draw connections
					particles.slice(i + 1).forEach((p2) => {
						const dx = p.x - p2.x;
						const dy = p.y - p2.y;
						const dist = Math.sqrt(dx * dx + dy * dy);

						if (dist < 150) {
							ctx.strokeStyle = `${p.color}${Math.floor((1 - dist / 150) * 30)
								.toString(16)
								.padStart(2, '0')}`;
							ctx.lineWidth = 0.5;
							ctx.beginPath();
							ctx.moveTo(p.x, p.y);
							ctx.lineTo(p2.x, p2.y);
							ctx.stroke();
						}
					});
				});

				requestAnimationFrame(animate);
			};
			animate();

			return () => {
				window.removeEventListener('resize', resizeCanvas);
			};
		}
	});

	const handleMouseMove = (e: MouseEvent) => {
		mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
		mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
	};
</script>

<svelte:window on:mousemove={handleMouseMove} />

<div class="min-h-screen">
	{#if user}
		<!-- ****************************** LOGGED IN VERSION ****************************** -->
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
								{#if user.role === 'manager'}
									Ready to find amazing talent today?
								{:else}
									Keep building your portfolio!
								{/if}
							</p>
						</div>
					</div>
					{#if user.role === 'manager'}
						<Badge color="green" large class="flex items-center gap-2">
							<CheckCircleSolid class="w-4 h-4" />
							Manager Access
						</Badge>
					{:else if user.role === 'graduate'}
						<Badge color="blue" large class="flex items-center gap-2">
							<CheckCircleSolid class="w-4 h-4" />
							Graduate Access
						</Badge>
					{:else}
						<Badge color="red" large class="flex items-center gap-2">
							<CloseCircleOutline class="w-4 h-4" />
							Unknown Role
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
				<div class="grid grid-cols-1 md:grid-cols-{quickActions.length === 2 ? '2' : '3'} gap-6">
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
										{:else if action.icon === UserCircleSolid}
											<UserCircleSolid class="w-10 h-10" />
										{:else if action.icon === GithubSolid}
											<GithubSolid class="w-10 h-10" />
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
		<div class="relative overflow-hidden">
			<canvas bind:this={canvasRef} class="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-30"
			></canvas>

			<!-- Gradient Orbs -->
			<div
				class="fixed top-20 left-10 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob dark:opacity-10"
			></div>
			<div
				class="fixed top-40 right-10 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 dark:opacity-10"
			></div>
			<div
				class="fixed bottom-20 left-1/2 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 dark:opacity-10"
			></div>

			<div class="container mx-auto px-4 py-16 relative z-10">
				<div
					class="text-center mb-20 transition-all duration-700 transform {heroVisible
						? 'opacity-100 translate-y-0'
						: 'opacity-0 -translate-y-4'}"
					style="transform: perspective(1000px) rotateX({mouseY * 0.05}deg) rotateY({mouseX * 0.05}deg);"
				>
					<div class="flex justify-center mb-6">
						<div class="relative group">
							<div
								class="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 blur-2xl opacity-30 rounded-full animate-spin-slow group-hover:opacity-50 transition-opacity"
							></div>
							<div
								class="absolute inset-0 bg-gradient-to-r from-yellow-500 via-red-500 to-orange-500 blur-xl opacity-40 rounded-full animate-spin-reverse"
							></div>
							<div
								class="relative transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
							>
								<enhanced:img
									src="$lib/assets/svgs/spotly-logo-color.svg"
									aria-label="Spotly Logo"
									width="120"
									height="120"
									alt="Spotly Logo"
									class="drop-shadow-2xl animate-float"
								></enhanced:img>
							</div>
						</div>
					</div>

					<!-- Animated Title -->
					<div class="text-center mb-6">
							<h1 class="text-7xl md:text-8xl font-bold relative">
									<span class="bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600 bg-clip-text text-transparent">
											Welcome to Spotly
									</span>
							</h1>
					</div>

					<p
						class="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto mt-20 leading-relaxed backdrop-blur-sm bg-white/30 dark:bg-gray-900/30 p-6 rounded-2xl border border-white/20"
					>
						Connect with talented graduates and build your dream team. Filter by skills, experience, and feedback to
						find the perfect match.
					</p>

					<div class="flex gap-4 justify-center flex-wrap">
						<Button
							size="xl"
							color="green"
							href="/login"
							class="font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 hover:-translate-y-2 bg-gradient-to-r from-orange-600 to-red-600 border-0 group relative overflow-hidden"
						>
							<span
								class="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
							></span>
							<span class="relative flex items-center text-white">
								<UserCircleSolid class="w-5 h-5 mr-2 animate-pulse" />
								Log In
							</span>
						</Button>
						<Button
							size="xl"
							color="alternative"
							outline
							href="/welcome"
							class="font-bold hover:scale-110 hover:-translate-y-2 transition-all duration-300 backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 border-2 group"
						>
							<span class="flex items-center">
								Meet the Team
								<ArrowRightOutline class="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
							</span>
						</Button>
					</div>
				</div>

				<!--**************** Features Grid with 3D Cards **************** -->
				<div class="mb-20">
					<h2 class="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900 dark:text-white">
						<span class="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"
							>Why Choose Spotly?</span
						>
					</h2>
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{#each features as feature, i}
							<div
								class="transition-all duration-500 delay-{i * 100} transform {statsVisible
									? 'opacity-100 translate-y-0'
									: 'opacity-0 translate-y-4'}"
								style="transform: perspective(1000px) rotateX({mouseY * 0.02}deg) rotateY({mouseX * 0.02}deg);"
							>
								<div class="group relative">
									<div
										class="absolute -inset-1 bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"
									></div>

									<GenericBoxVisible
										classes="relative text-center h-full transition-all duration-500 hover:-translate-y-4 backdrop-blur-sm bg-white/30 dark:bg-gray-900/30 p-6 rounded-2xl border border-white/20"
									>
										<div class="transform transition-all duration-300 group-hover:scale-110">
											{#if feature.icon === UsersSolid}
												<UsersSolid class="w-16 h-16 mx-auto mb-4 {feature.color} drop-shadow-lg" />
											{:else if feature.icon === ChartPieSolid}
												<ChartPieSolid class="w-16 h-16 mx-auto mb-4 {feature.color} drop-shadow-lg" />
											{:else if feature.icon === RocketSolid}
												<RocketSolid class="w-16 h-16 mx-auto mb-4 {feature.color} drop-shadow-lg" />
											{:else if feature.icon === BadgeCheckSolid}
												<BadgeCheckSolid class="w-16 h-16 mx-auto mb-4 {feature.color} drop-shadow-lg" />
											{/if}
										</div>
										<h3
											class="text-xl font-bold mb-3 text-primary group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-red-600 group-hover:bg-clip-text transition-all duration-300"
										>
											{feature.title}
										</h3>
										<p class="text-gray-600 dark:text-gray-400 dark:group-hover:text-white group-hover:text-black">
											{feature.description}
										</p>
									</GenericBoxVisible>
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- *************************  CTA with Animated Background ******************* -->
				<div class="relative group mb-16 max-w-4xl min-w-full">
					<div
						class="relative min-w-[100%] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white border-0 overflow-hidden rounded-2xl card-glow"
					>
						<div
							class="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full -mr-40 -mt-40 animate-pulse-slow"
						></div>
						<div
							class="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-yellow-500/10 to-red-500/10 rounded-full -ml-48 -mb-48 animate-spin-very-slow"
						></div>
						<div
							class="absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-r from-red-500/20 to-yellow-500/20 rounded-full animate-pulse-slow"
							style="animation-delay: 1s;"
						></div>
						<div class="absolute inset-0 overflow-hidden rounded-2xl">
							<div
								class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 animate-shimmer"
							></div>
						</div>

						<div class="relative text-center py-16 px-6 z-10">
							<div class="animate-bounce-gentle mb-8">
								<i class="fas fa-star text-6xl text-yellow-400 opacity-90 drop-shadow-2xl"></i>
							</div>
							<h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-glow">Ready to Find Your Next Star?</h2>
							<p class="text-lg md:text-xl lg:text-2xl mb-10 opacity-90 max-w-2xl mx-auto leading-relaxed">
								Join <span class="font-bold text-yellow-300 animate-pulse">MILLIONS</span> of managers who trust Spotly to
								connect with exceptional graduates.
							</p>
							<Button
								class="font-bold text-lg px-10 py-4 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 bg-gradient-to-r from-orange-500 to-red-600 text-white border-0 group relative overflow-hidden"
								href="/login"
								aria-label="Login"
							>
								<span
									class="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-300 to-yellow-300 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
								></span>
								<span class="relative flex items-center justify-center font-bold">
									Start Your Journey
									<i class="fas fa-arrow-right ml-3 group-hover:translate-x-2 transition-transform duration-300"></i>
								</span>
							</Button>
							<p class="mt-6 text-gray-400 text-sm">No credit card required • Itsa free!!</p>
						</div>
					</div>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
					<div class="group transform transition-all duration-300 hover:scale-110">
						<div
							class="text-6xl md:text-7xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2 group-hover:animate-pulse"
						>
							+9800
						</div>
						<div class="text-gray-600 dark:text-gray-400 text-lg">Talented Graduates</div>
					</div>
					<div class="group transform transition-all duration-300 hover:scale-110">
						<div
							class="text-6xl md:text-7xl font-bold bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent mb-2 group-hover:animate-pulse"
						>
							+500
						</div>
						<div class="text-gray-600 dark:text-gray-400 text-lg">Technologies</div>
					</div>
					<div class="group transform transition-all duration-300 hover:scale-110">
						<div
							class="text-6xl md:text-7xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-2 group-hover:animate-pulse"
						>
							91.3%
						</div>
						<div class="text-gray-600 dark:text-gray-400 text-lg">Quality Vetted</div>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
    @keyframes gradient-x {
        0%, 100% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
    }

    @keyframes gradient-xy {
        0%, 100% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
    }

    @keyframes blob {
        0%, 100% {
            transform: translate(0, 0) scale(1);
        }
        33% {
            transform: translate(30px, -50px) scale(1.1);
        }
        66% {
            transform: translate(-20px, 20px) scale(0.9);
        }
    }

    @keyframes float {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-20px);
        }
    }

    @keyframes spin-slow {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @keyframes spin-reverse {
        from {
            transform: rotate(360deg);
        }
        to {
            transform: rotate(0deg);
        }
    }

    @keyframes spin-very-slow {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @keyframes bounce-subtle {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-10px);
        }
    }

    @keyframes bounce-gentle {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-15px);
        }
    }

    @keyframes pulse-slow {
        0%, 100% {
            opacity: 0.3;
            transform: scale(1);
        }
        50% {
            opacity: 0.5;
            transform: scale(1.05);
        }
    }

    @keyframes shimmer {
        0% {
            transform: translateX(-100%);
        }
        100% {
            transform: translateX(100%);
        }
    }

    /* Animation classes */
    .animate-gradient-x {
        background-size: 200% 200%;
        animation: gradient-x 3s ease infinite;
    }

    .animate-gradient-xy {
        background-size: 400% 400%;
        animation: gradient-xy 5s ease infinite;
    }

    .animate-blob {
        animation: blob 7s infinite;
    }

    .animate-float {
        animation: float 3s ease-in-out infinite;
    }

    .animate-spin-slow {
        animation: spin-slow 8s linear infinite;
    }

    .animate-spin-reverse {
        animation: spin-reverse 10s linear infinite;
    }

    .animate-spin-very-slow {
        animation: spin-very-slow 20s linear infinite;
    }

    .animate-bounce-subtle {
        animation: bounce-subtle 2s ease-in-out infinite;
    }

    .animate-bounce-gentle {
        animation: bounce-gentle 2s ease-in-out infinite;
    }

    .animate-pulse-slow {
        animation: pulse-slow 4s ease-in-out infinite;
    }

    .animate-shimmer {
        animation: shimmer 2s infinite;
    }

    .text-glow {
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
    }

    .card-glow {
        box-shadow: 0 0 20px rgba(255, 69, 0, 0.3);
    }

    /* Animation delays */
    .animation-delay-0 { animation-delay: 0ms; }
    .animation-delay-100 { animation-delay: 100ms; }
    .animation-delay-200 { animation-delay: 200ms; }
    .animation-delay-300 { animation-delay: 300ms; }
    .animation-delay-400 { animation-delay: 400ms; }
    .animation-delay-500 { animation-delay: 500ms; }
    .animation-delay-600 { animation-delay: 600ms; }
    .animation-delay-700 { animation-delay: 700ms; }
    .animation-delay-800 { animation-delay: 800ms; }
    .animation-delay-900 { animation-delay: 900ms; }
    .animation-delay-1000 { animation-delay: 1000ms; }
    .animation-delay-1100 { animation-delay: 1100ms; }
    .animation-delay-1200 { animation-delay: 1200ms; }
    .animation-delay-1300 { animation-delay: 1300ms; }
    .animation-delay-1400 { animation-delay: 1400ms; }
    .animation-delay-2000 { animation-delay: 2s; }
    .animation-delay-4000 { animation-delay: 4s; }
</style>
