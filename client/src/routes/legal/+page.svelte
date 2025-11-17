<script lang="ts">
	import { ShieldCheckSolid, DatabaseSolid, EyeSolid, UserSolid, GlobeSolid } from 'flowbite-svelte-icons';
	import BtnGoBack from '$lib/components/main/utils/BtnGoBack.svelte';
</script>

<svelte:head>
	<title>Legal Policy - Spotly</title>
</svelte:head>

<section
	class="bg-white dark:bg-background backdrop-blur-xl border border-gray-200 dark:border-slate-800 rounded-lg shadow-md mx-auto p-6 m-5 sm:p-8 w-full md:max-w-[1600px] text-slate-800 dark:text-slate-100 leading-relaxed"
	aria-labelledby="legal-policy-title"
>
	<div class="w-full flex justify-between items-center mb-3">
		<h1 id="legal-policy-title" class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
			Legal Policy
		</h1>
		<BtnGoBack targetUrl="/welcome" classes="cursor-pointer" />
	</div>

	<p class="text-sm text-slate-500 dark:text-slate-400 mb-6">
		<strong>Last Updated:</strong> November 17, 2025
	</p>

	<div id="hr" class="w-full h-[1px] bg-primary-700 my-5"></div>

	<!-- Introduction -->
	<section class="mb-8">
		<p class="text-sm sm:text-base text-slate-600 dark:text-slate-300">
			Spotly ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we
			collect, use, disclose, and safeguard your information when you use our platform. By using Spotly, you agree to
			the collection and use of information in accordance with this policy.
		</p>
	</section>

	<!-- 1. Information We Collect -->
	<section class="mb-8">
		<h2 class="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
			<DatabaseSolid class="h-6 w-6" />
			1. Information We Collect
		</h2>

		<h3 class="text-lg font-medium text-slate-900 dark:text-slate-100 mt-4 mb-2">
			1.1 Information You Provide Directly
		</h3>
		<ul class="list-disc list-inside space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 ml-4">
			<li>
				<strong>Account Information:</strong> First name, last name, email address, and cohort number when you create an
				account or are invited by a manager.
			</li>
			<li><strong>CV/Resume:</strong> PDF files containing your professional experience, education, and skills.</li>
			<li><strong>Profile Picture:</strong> Avatar images in JPEG, JPG, or PNG format.</li>
			<li><strong>Professional Links:</strong> LinkedIn profile URL and GitHub username (optional).</li>
			<li>
				<strong>CV Metadata:</strong> Parsed information from your CV including skills, English proficiency level, employment
				status, and other professional details.
			</li>
		</ul>

		<h3 class="text-lg font-medium text-slate-900 dark:text-slate-100 mt-4 mb-2">
			1.2 Information We Collect Automatically
		</h3>
		<ul class="list-disc list-inside space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 ml-4">
			<li>
				<strong>Usage Data:</strong> Information about how you interact with our platform, including pages visited and features
				used.
			</li>
			<li><strong>Authentication Tokens:</strong> Secure tokens used to maintain your login session.</li>
			<li><strong>Timestamps:</strong> Profile creation date, last update date, and last login information.</li>
		</ul>

		<h3 class="text-lg font-medium text-slate-900 dark:text-slate-100 mt-4 mb-2">1.3 Information from Third Parties</h3>
		<ul class="list-disc list-inside space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 ml-4">
			<li>
				<strong>GitHub Data:</strong> When you connect your GitHub account via OAuth, we fetch your public profile
				information, repositories, and contribution data in real-time using GitHub's GraphQL API. This data is
				<strong>not stored</strong> on our servers and is only retrieved when needed during your active session.
			</li>
			<li>
				<strong>AI-Powered CV Analysis:</strong> Your uploaded CV is processed by our AI service (built with FastAPI and
				PydanticAI) to extract skills, experience levels, and other relevant professional information.
			</li>
		</ul>
	</section>

	<!-- 2. How We Use Your Information -->
	<section class="mb-8">
		<h2 class="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
			<GlobeSolid class="h-6 w-6" />
			2. How We Use Your Information
		</h2>

		<p class="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-3">
			We use the collected information for the following purposes:
		</p>

		<ul class="list-disc list-inside space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 ml-4">
			<li>
				<strong>Profile Creation and Management:</strong> To create and maintain your graduate profile on our platform.
			</li>
			<li>
				<strong>Talent Matching:</strong> To enable managers and recruiters to discover and evaluate potential candidates
				based on skills, experience, and qualifications.
			</li>
			<li>
				<strong>Platform Authentication:</strong> To verify your identity and maintain secure access to your account using
				Supabase authentication.
			</li>
			<li>
				<strong>Communication:</strong> To send you account-related notifications, invitations, and platform updates.
			</li>
			<li>
				<strong>Service Improvement:</strong> To analyze platform usage and improve our services, features, and user experience.
			</li>
			<li>
				<strong>Security:</strong> To protect against unauthorized access and ensure the integrity of our platform through
				HMAC-SHA256 request signing.
			</li>
		</ul>
	</section>

	<!-- 3. How We Share Your Information -->
	<section class="mb-8">
		<h2 class="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
			<EyeSolid class="h-6 w-6" />
			3. How We Share Your Information
		</h2>

		<h3 class="text-lg font-medium text-slate-900 dark:text-slate-100 mt-4 mb-2">3.1 Within the Platform</h3>
		<ul class="list-disc list-inside space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 ml-4">
			<li>
				<strong>Manager Accounts:</strong> Users with manager role permissions can view all graduate profiles, including
				CVs, avatars, professional links, skills, and parsed CV data. This facilitates the talent discovery and recruitment
				process.
			</li>
			<li>
				<strong>Graduate Privacy:</strong> Graduate users cannot view other graduates' profiles. Your information is only
				visible to you and authorized manager accounts.
			</li>
		</ul>

		<h3 class="text-lg font-medium text-slate-900 dark:text-slate-100 mt-4 mb-2">3.2 Public Accessibility</h3>
		<p class="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-3">
			<strong class="text-red-600 dark:text-red-400">Important:</strong> Your CV and profile avatar are stored in publicly
			accessible AWS S3 storage. Anyone with the direct URL can access these files. By uploading these files, you consent
			to this level of public visibility.
		</p>

		<h3 class="text-lg font-medium text-slate-900 dark:text-slate-100 mt-4 mb-2">3.3 Third-Party Service Providers</h3>
		<ul class="list-disc list-inside space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 ml-4">
			<li>
				<strong>AWS S3:</strong> We use Amazon Web Services S3 for secure cloud storage of your CV and avatar files.
			</li>
			<li><strong>Supabase:</strong> We use Supabase for user authentication and session management.</li>
			<li>
				<strong>GitHub:</strong> We integrate with GitHub's API to fetch your public repository and contribution data in
				real-time (with your consent).
			</li>
			<li><strong>Vercel:</strong> Our frontend application is hosted on Vercel's infrastructure.</li>
		</ul>

		<h3 class="text-lg font-medium text-slate-900 dark:text-slate-100 mt-4 mb-2">3.4 We Do NOT:</h3>
		<ul class="list-disc list-inside space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 ml-4">
			<li>Sell your personal information to third parties</li>
			<li>Share your data with marketing companies or advertisers</li>
			<li>Use your information for purposes other than those stated in this policy</li>
			<li>
				Store your GitHub data on our servers (all GitHub data is fetched in real-time and discarded after your session)
			</li>
		</ul>
	</section>

	<!-- 4. Data Storage and Security -->
	<section class="mb-8">
		<h2 class="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
			<ShieldCheckSolid class="h-6 w-6" />
			4. Data Storage and Security
		</h2>

		<h3 class="text-lg font-medium text-slate-900 dark:text-slate-100 mt-4 mb-2">4.1 Where We Store Your Data</h3>
		<ul class="list-disc list-inside space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 ml-4">
			<li><strong>File Storage:</strong> CVs and avatars are stored in AWS S3 buckets with public read access.</li>
			<li>
				<strong>Database:</strong> Account information, metadata, and parsed CV data are stored in our secure database infrastructure.
			</li>
			<li><strong>GitHub Data:</strong> Not stored. Fetched in real-time from GitHub's API when needed.</li>
		</ul>

		<h3 class="text-lg font-medium text-slate-900 dark:text-slate-100 mt-4 mb-2">4.2 Security Measures</h3>
		<ul class="list-disc list-inside space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 ml-4">
			<li>
				<strong>HMAC-SHA256 Request Signing:</strong> All communication between our frontend and backend is cryptographically
				signed to prevent unauthorized access.
			</li>
			<li>
				<strong>AWS Application Load Balancer:</strong> Additional security layer for traffic management and DDoS protection.
			</li>
			<li>
				<strong>OAuth 2.0:</strong> Secure authentication flow for GitHub integration without storing your GitHub credentials.
			</li>
			<li><strong>Encrypted Connections:</strong> All data transmission uses HTTPS encryption.</li>
			<li>
				<strong>Secure Session Management:</strong> Authentication tokens are stored securely using HTTP-only cookies.
			</li>
		</ul>

		<p class="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3">
			While we implement industry-standard security measures, no method of transmission over the Internet or electronic
			storage is 100% secure. We cannot guarantee absolute security of your information.
		</p>
	</section>

	<!-- 5. Your Rights and Choices -->
	<section class="mb-8">
		<h2 class="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
			<UserSolid class="h-6 w-6" />
			5. Your Rights and Choices
		</h2>

		<p class="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-3">
			You have the following rights regarding your personal information:
		</p>

		<ul class="list-disc list-inside space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 ml-4">
			<li>
				<strong>Access:</strong> You can view and download your profile information at any time through your account dashboard.
			</li>
			<li>
				<strong>Update:</strong> You can update your personal information, CV, and avatar through your account settings.
			</li>
			<li>
				<strong>Delete:</strong> You can request deletion of your account and all associated data. Note that this will permanently
				remove your profile from our platform.
			</li>
			<li>
				<strong>Revoke GitHub Access:</strong> You can disconnect your GitHub account at any time through your account settings
				or directly through GitHub's application settings.
			</li>
			<li>
				<strong>Opt-Out of Communications:</strong> You can unsubscribe from non-essential communications while still maintaining
				your account.
			</li>
		</ul>

		<p class="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3">
			To exercise these rights, please contact us using the information provided at the end of this policy.
		</p>
	</section>

	<!-- 6. Data Retention -->
	<section class="mb-8">
		<h2 class="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">6. Data Retention</h2>

		<p class="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-3">
			We retain your personal information for as long as your account is active or as needed to provide you services.
			Specifically:
		</p>

		<ul class="list-disc list-inside space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 ml-4">
			<li><strong>Active Accounts:</strong> Data is retained indefinitely while your account remains active.</li>
			<li>
				<strong>Deleted Accounts:</strong> Upon account deletion, your data is permanently removed from our active systems
				within 30 days.
			</li>
			<li>
				<strong>Backup Systems:</strong> Data in backup systems may be retained for up to 90 days for disaster recovery purposes.
			</li>
			<li>
				<strong>Legal Requirements:</strong> We may retain certain information if required by law or for legitimate business
				purposes (e.g., fraud prevention).
			</li>
		</ul>
	</section>

	<!-- 7. Cookies and Tracking -->
	<section class="mb-8">
		<h2 class="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
			7. Cookies and Tracking Technologies
		</h2>

		<p class="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-3">
			We use the following cookies and similar technologies:
		</p>

		<ul class="list-disc list-inside space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 ml-4">
			<li>
				<strong>Essential Cookies:</strong> Required for authentication and core platform functionality (e.g., session tokens).
			</li>
			<li><strong>Preference Cookies:</strong> Store your theme preferences (light/dark mode).</li>
			<li><strong>Security Cookies:</strong> Used to maintain secure sessions and prevent unauthorized access.</li>
		</ul>

		<p class="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3">
			We do not use third-party analytics or advertising cookies.
		</p>
	</section>

	<!-- 8. Children's Privacy -->
	<section class="mb-8">
		<h2 class="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">8. Children's Privacy</h2>

		<p class="text-sm sm:text-base text-slate-600 dark:text-slate-300">
			Spotly is not intended for individuals under the age of 18. We do not knowingly collect personal information from
			children. If we become aware that we have collected personal information from a child without parental consent, we
			will take steps to delete that information.
		</p>
	</section>

	<!-- 9. Changes to This Policy -->
	<section class="mb-8">
		<h2 class="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
			9. Changes to This Privacy Policy
		</h2>

		<p class="text-sm sm:text-base text-slate-600 dark:text-slate-300">
			We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy
			Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy
			periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
		</p>
	</section>

	<!-- 10. Contact Us -->
	<section class="mb-8">
		<h2 class="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">10. Contact Information</h2>

		<p class="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-3">
			If you have any questions about this Privacy Policy or our data practices, please contact us:
		</p>

		<div class="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
			<p class="text-sm sm:text-base text-slate-700 dark:text-slate-300">
				<strong>Email:</strong> privacy@spotly.work<br />
				<strong>Response Time:</strong> We aim to respond to all inquiries within 72 hours.
			</p>
		</div>
	</section>

	<!-- Legal Disclaimer -->
	<div class="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
		<p class="text-xs sm:text-sm text-yellow-800 dark:text-yellow-200">
			<strong>Legal Notice:</strong> This Privacy Policy constitutes a legally binding agreement between you and Spotly.
			By using our platform, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.
			If you do not agree with this policy, please do not use our services.
		</p>
	</div>
</section>
