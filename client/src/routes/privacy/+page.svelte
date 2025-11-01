<script lang="ts">
  import { ShieldCheckSolid, DatabaseSolid, EyeSolid } from 'flowbite-svelte-icons';
  import BtnGoBack from '$lib/components/main/utils/BtnGoBack.svelte';
</script>

<section
  class="bg-white dark:bg-background blur-bg border border-gray-200 dark:border-slate-800 rounded-lg shadow-md max-w-[720px] mx-auto p-6 m-5 sm:p-8 text-slate-800 dark:text-slate-100 leading-relaxed"
  aria-labelledby="privacy-notice-title"
>
  <div class="w-full flex justify-between items-center mb-3">
    <h2 id="privacy-notice-title" class="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100">
      Privacy Notice
    </h2>
    <BtnGoBack targetUrl="/app/graduate" classes="cursor-pointer" />
  </div>
  
  <div id="hr" class="w-full h-[1px] bg-primary-700 my-5"></div>
  
  <p class="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-4">
    At Spotly, we are committed to protecting your privacy and being transparent about how we collect, store, and use your data. This notice explains what information we store and how it is used within our platform.
  </p>

  <h3
    class="mt-6 text-base sm:text-lg font-medium text-slate-900 dark:text-slate-100 flex items-center justify-start gap-1"
  >
    <span aria-hidden="true"><DatabaseSolid class="shrink-0 h-6 w-6 block" /></span> What We Store
  </h3>
  
  <p class="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 mb-3">
    When you create a graduate profile on Spotly, we collect and store the following information:
  </p>

  <ul
    class="list-disc list-inside space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-4"
    aria-label="stored-data-list"
  >
    <li>
      <strong class="text-slate-900 dark:text-slate-100">Personal CV:</strong>
      <span class="text-slate-600 dark:text-slate-300">
        Your CV uploaded in PDF format is stored in an AWS S3 bucket. This file is publicly accessible via a direct link, allowing potential employers to view your qualifications.
      </span>
    </li>
    <li>
      <strong class="text-slate-900 dark:text-slate-100">Profile Avatar:</strong>
      <span class="text-slate-600 dark:text-slate-300">
        Your profile picture uploaded in JPEG, JPG, or PNG format is stored in an AWS S3 bucket and is publicly accessible.
      </span>
    </li>
    <li>
      <strong class="text-slate-900 dark:text-slate-100">LinkedIn Profile Link:</strong>
      <span class="text-slate-600 dark:text-slate-300">
        A link to your LinkedIn profile (if provided) is stored to help employers learn more about your professional background.
      </span>
    </li>
    <li>
      <strong class="text-slate-900 dark:text-slate-100">GitHub Profile Link:</strong>
      <span class="text-slate-600 dark:text-slate-300">
        A link to your GitHub profile (if provided) is stored. GitHub data is fetched in real-time when needed and is not stored on our servers. Learn more about <a href="/app/graduate/github/help" class="text-primary-600 dark:text-primary-400 hover:underline">how GitHub data is used</a>.
      </span>
    </li>
    <li>
      <strong class="text-slate-900 dark:text-slate-100">Profile Metadata:</strong>
      <span class="text-slate-600 dark:text-slate-300">
        Information such as your profile creation date and last update date is stored for administrative purposes.
      </span>
    </li>
  </ul>

  <h3
    class="mt-6 text-base sm:text-lg font-medium text-slate-900 dark:text-slate-100 flex items-center justify-start gap-1"
  >
    <span aria-hidden="true"><EyeSolid class="shrink-0 h-6 w-6 block" /></span> Who Can Access Your Data
  </h3>
  
  <p class="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 mb-3">
    We control access to your data to ensure it is used appropriately:
  </p>

  <ul
    class="list-disc list-inside space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-4"
    aria-label="access-control-list"
  >
    <li>
      <strong class="text-slate-900 dark:text-slate-100">Manager Accounts:</strong>
      <span class="text-slate-600 dark:text-slate-300">
        Users with manager role permissions can view graduate profiles, including CVs, avatars, and profile links. This allows employers and recruiters to discover and evaluate potential candidates.
      </span>
    </li>
    <li>
      <strong class="text-slate-900 dark:text-slate-100">Graduate Privacy:</strong>
      <span class="text-slate-600 dark:text-slate-300">
        Graduate users cannot view each other's profiles. Your information is only visible to you and to manager role accounts.
      </span>
    </li>
    <li>
      <strong class="text-slate-900 dark:text-slate-100">Public Accessibility:</strong>
      <span class="text-slate-600 dark:text-slate-300">
        Your CV and avatar are stored in publicly accessible storage. Anyone with the direct link can view these files. Please ensure you are comfortable with this level of visibility before uploading.
      </span>
    </li>
  </ul>

  <h3
    class="mt-6 text-base sm:text-lg font-medium text-slate-900 dark:text-slate-100 flex items-center justify-start gap-1"
  >
    <span aria-hidden="true"><ShieldCheckSolid class="shrink-0 h-6 w-6 block" /></span> Your Data and Privacy
  </h3>
  
  <p class="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 mb-3">
    We take your privacy seriously. Here's what you need to know:
  </p>

  <ul
    class="list-disc list-inside space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-300"
    aria-label="privacy-points"
  >
    <li>
      <strong class="text-slate-900 dark:text-slate-100">Real-Time GitHub Data:</strong>
      <span class="text-slate-600 dark:text-slate-300">
        When you connect your GitHub account, we fetch your data in real-time. We do not store any GitHub information on our servers. All fetched data is temporary and discarded after your session ends.
      </span>
    </li>
    <li>
      <strong class="text-slate-900 dark:text-slate-100">Secure Storage:</strong>
      <span class="text-slate-600 dark:text-slate-300">
        Your CV and avatar are stored securely in AWS S3, a trusted cloud storage service. However, these files are publicly accessible by design to facilitate job matching.
      </span>
    </li>
    <li>
      <strong class="text-slate-900 dark:text-slate-100">Control Over Your Data:</strong>
      <span class="text-slate-600 dark:text-slate-300">
        You can update or delete your profile information at any time through your account settings. Deleting your profile will remove your data from our platform.
      </span>
    </li>
    <li>
      <strong class="text-slate-900 dark:text-slate-100">Purpose of Data Collection:</strong>
      <span class="text-slate-600 dark:text-slate-300">
        We collect and store your data solely for the purpose of connecting graduates with potential employers. We do not sell or share your data with third parties for marketing purposes.
      </span>
    </li>
  </ul>

  <p class="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-6">
    If you have any questions or concerns about how your data is handled, please contact our support team.
  </p>
</section>