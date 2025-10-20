<script>
	import { ShieldCheckSolid } from 'flowbite-svelte-icons';
	import BtnGoBack from '$lib/components/main/utils/BtnGoBack.svelte';
</script>

<section
	class="bg-white dark:bg-background blur-bg border border-gray-200 dark:border-slate-800 rounded-lg shadow-md max-w-[720px] mx-auto p-6 m-5 sm:p-8 text-slate-800 dark:text-slate-100 leading-relaxed"
	aria-labelledby="how-it-works-title"
>
	<div class="w-full flex justify-between items-center mb-3">
		<h2 id="how-it-works-title" class="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100">
			How it Works
		</h2>
		<BtnGoBack targetUrl="http://localhost:5173/app/graduate/github" classes="cursor-pointer" />
	</div>
	<div id="hr" class="w-full h-[1px] bg-primary-700 my-5"></div>
	<p class="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-4">
		Spotly allows you to connect your GitHub account to visualize your profile information and statistics in a unique
		and engaging way. When you connect, Spotly can access your public and private data (with your permission) to fetch
		details like:
	</p>

	<ul
		class="list-disc list-inside space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-4"
		aria-label="github-data-examples"
	>
		<li>Most used programming languages</li>
		<li>Repository sizes</li>
		<li>Commit history</li>
		<li>Contribution graphs</li>
		<li>and more!</li>
	</ul>

	<p class="text-sm sm:text-base text-slate-700 dark:text-slate-200 font-medium mb-4">
		We only display this information to you in a fashionable manner to help you understand your GitHub profile at a
		glance.
	</p>

	<h3
		class="mt-4 text-base sm:text-lg font-medium text-slate-900 dark:text-slate-100 flex items-center justify-start gap-1"
	>
		<span aria-hidden="true"><ShieldCheckSolid class="shrink-0 h-6 w-6 block" /></span> Your Data and Privacy
	</h3>

	<p class="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 mb-3">
		We take your privacy seriously. Here's what you need to know about your data:
	</p>

	<ul
		class="list-disc list-inside space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-300"
		aria-label="privacy-points"
	>
		<li>
			<strong class="text-slate-900 dark:text-slate-100">No Storage:</strong>
			<span class="text-slate-600 dark:text-slate-300">
				We do not store your GitHub data in our database. All the information you see is fetched in real-time when you
				are logged in.</span
			>
		</li>
		<li>
			<strong class="text-slate-900 dark:text-slate-100">Temporary Access:</strong>
			<span class="text-slate-600 dark:text-slate-300">
				Your data is only available for the duration of your session. Once you log out or close the app, the fetched
				information is discarded.</span
			>
		</li>
		<li>
			<strong class="text-slate-900 dark:text-slate-100">Limited Permissions:</strong>
			<span class="text-slate-600 dark:text-slate-300">
				We only request the minimum necessary permissions to provide you with the app's features. We cannot modify,
				delete, or create any of your GitHub data. In fact, your data is only accessible to you <strong>ONLY</strong
				></span
			>
		</li>
		<li>
			<strong class="text-slate-900 dark:text-slate-100">Public Data:</strong>
			<span class="text-slate-600 dark:text-slate-300">
				Even without logging in, if you introduce your GitHub account name, we'll be able to fetch only publica data.</span
			>
		</li>
	</ul>
</section>
