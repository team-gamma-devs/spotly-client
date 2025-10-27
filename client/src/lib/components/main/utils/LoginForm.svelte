<script lang="ts">
	import { Label, Input, Button } from 'flowbite-svelte';
	import { EnvelopeSolid, ExclamationCircleSolid, CheckCircleSolid } from 'flowbite-svelte-icons';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { error } from '@sveltejs/kit';

	let loading = $state(false);
	let errorMessage = $state('');
	let successMessage = $state('');
</script>

<form
	id="login-form"
	method="POST"
	action="?/login"
	use:enhance={() => {
		loading = true;
		errorMessage = '';
		successMessage = '';

		return async ({ result }) => {
			loading = false;
			console.log('Inside LoginForm: ' + JSON.stringify(result));
			if (result.type === 'failure' && result.data) {
				errorMessage = String(result.data.error) || 'Something went wrong, call the FBI.';
			}
			if (result.type === 'success' && result.data) {
				if (result.data.success === false) {
					errorMessage = String(result.data.error) || 'Something went wrong';
				} else {
					successMessage = String(result.data.msg);
				}
			} else if (result.type === 'redirect') {
				successMessage = 'Redirecting...';
				await new Promise((resolve) => setTimeout(resolve, 1500)); // you can delete, but actually it's kinda nice to have.
				console.log(`In LoginForm: ${result.location}`); // checking what url am I getting
				goto(result.location);
			}
		};
	}}
>
	{#if errorMessage}
		<div
			class="max-w-[300px] mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-red-700 dark:text-red-400 flex items-center justify-center"
		>
			<ExclamationCircleSolid class="inline w-4 h-4 mr-2" />
			{errorMessage}
		</div>
	{/if}
	{#if successMessage}
		<div
			class="max-w-[300px] mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded text-green-700 dark:text-green-400 flex items-center justify-center"
		>
			<CheckCircleSolid class="inline w-4 h-4 mr-2" />
			{successMessage}
		</div>
	{/if}
	<Label for="input-group-1" class="mb-2 block w-full">Enter your email</Label>
	<Input
		id="email"
		type="email"
		name="email"
		placeholder="pepe@holbertonschool.com"
		maxlength={30}
		required
		class="pl-8 w-auto sm:min-w-[300px] w-full"
	>
		{#snippet left()}
			<EnvelopeSolid class="h-5 w-5 text-gray-500 dark:text-gray-400" />
		{/snippet}
	</Input>
	<p class="text-sm mt-3 mb-5 text-right dark:text-gray-400 w-full">*Use your Holberton email</p>
<a
	href="/login/help"
	class="w-fit m-auto block mt-2 text-sm text-center text-blue-600 hover:text-blue-800 
           dark:text-blue-300 dark:hover:text-blue-200 underline underline-offset-2 transition-colors"
	aria-label="Need help logging in"
>
	Trouble logging in?
</a>

	<Button
		type="submit"
		color="green"
		class="block w-48 mx-auto font-bold cursor-pointer text-white hover:bg-green-600 hover:text-white mt-10 flex items-center justify-center"
		disabled={loading || !!successMessage}
		aria-busy={loading}
		{loading}
	>
		{#if loading}
			Sending...
		{:else}
			Submit
		{/if}
	</Button>
	<!-- If someone were to click the button, the browser would send the form data
             via POST request to the server, running the default action. -->
	<!-- Submiting this form is handled by +page.server.ts -->
</form>
