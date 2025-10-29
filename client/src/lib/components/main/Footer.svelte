<script lang="ts">
	import { Footer, FooterCopyright, FooterLinkGroup, FooterLink, FooterBrand, FooterIcon } from 'flowbite-svelte';
	import { GithubSolid, DiscordSolid } from 'flowbite-svelte-icons';
</script>

<Footer footerType="socialmedia" class="bg-background dark:bg-background rounded-none backdrop-blur-xl">
	<div class="md:flex md:justify-between">
		<div class="mb-6 md:mb-0 zalando-font">
			<FooterBrand href="https://spotly.com" src="/icos/spotly-logo-color.svg" alt="Spotly Logo" name="Spotly" />
		</div>
		<div class="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6 p-2 place-items-center">
			<div class="min-w-[190px]">
				<h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h2>
				<FooterLinkGroup>
					<FooterLink class="mb-4 hover:text-accent" href="https://flowbite-svelte.com/" target="_blank"
						>Flowbite</FooterLink
					>
					<FooterLink class="mb-4 hover:text-accent" href="https://tailwindcss.com/" target="_blank"
						>Tailwind CSS</FooterLink
					>
				</FooterLinkGroup>
			</div>
			<div class="min-w-[190px]">
				<h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
				<FooterLinkGroup>
					<FooterLink class="mb-4 hover:text-accent" href="https://github.com/team-gamma-devs" target="_blank"
						>GitHub</FooterLink
					>
					<FooterLink class="mb-4 hover:text-accent" href="https://discord.gg/HU3s6k2hrf" target="_blank"
						>Discord</FooterLink
					>
				</FooterLinkGroup>
			</div>
			<div class="min-w-[190px]">
				<h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
				<FooterLinkGroup>
					<FooterLink class="mb-4 hover:text-accent" href="/privacy">Privacy Policy</FooterLink>
					<FooterLink class="mb-4 hover:text-accent" href="/legal">Terms & Conditions</FooterLink>
				</FooterLinkGroup>
			</div>
		</div>
	</div>
	<hr class="my-6 border-gray-200 sm:mx-auto lg:my-8 dark:border-gray-700" />
	<div class="sm:flex sm:items-center sm:justify-between">
		<div id="legal-box" class="text-gray-500">Spotly 2025 - Holberton Uruguay - Team Gamma Devs</div>
		<!-- <FooterCopyright></FooterCopyright> -->
		<div class="mt-4 flex space-x-6 sm:mt-0 sm:justify-center rtl:space-x-reverse">
			<FooterIcon href="https://discord.gg/HU3s6k2hrf" target="_blank">
				<DiscordSolid class="h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white" />
			</FooterIcon>
			<FooterIcon href="https://github.com/team-gamma-devs" target="_blank">
				<GithubSolid class="h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white" />
			</FooterIcon>
		</div>
	</div>
</Footer>
