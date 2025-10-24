<script>
	import BtnGoBack from '$lib/components/main/utils/BtnGoBack.svelte';
	import GenericBoxVisible from '$lib/components/main/utils/GenericBoxVisible.svelte';
	import { TextPlaceholder, Button, Label, Input, Textarea, Alert } from 'flowbite-svelte';
	import { enhance } from '$app/forms';

	export let data;
	export let form;

	let isSubmitting = false;
</script>

<GenericBoxVisible>
	<div class="w-full flex items-center justify-between gap-5 w-full md:min-w-[400px] px-5">
		<h1 class="text-xl">Settings</h1>
		<BtnGoBack targetUrl="/app/manager" />
	</div>

	<div class="px-10 py-5 w-full">
		{#await data.config}
			<TextPlaceholder size="md" class="m-2" />
		{:then config}
			{#if config}
				{#if form?.success}
					<Alert color="green" class="mb-4">
						{form.message}
					</Alert>
				{/if}

				{#if form?.error}
					<Alert color="red" class="mb-4">
						{form.error}
					</Alert>
				{/if}

				<form
					method="POST"
					action="?/updateConfig"
					use:enhance={() => {
						isSubmitting = true;
						return async ({ update }) => {
							await update();
							isSubmitting = false;
						};
					}}
					class="space-y-6 w-full max-w-[500px]"
				>
					<div class="">
						<Label for="support-email-input" class="mb-2 text-md text-foreground font-bold">Support Email</Label>
            <p class="text-sm mb-2 text-gray-400">Graduates will contact this email if they can't access the app.</p>
						<Input
							id="support-email-input"
							name="supportEmail"
							type="email"
							class="w-full max-w-[500px]"
							value={config.supportEmail}
							placeholder="support@example.com"
							required
							disabled={isSubmitting}
						/>
					</div>

					<div>
						<Label for="lost-account-msg-input" class="mb-2 text-md text-foreground font-bold">Lost Account Message</Label>
            <p class="text-sm mb-2 text-gray-400">Graduates will see this when they click on "Lost my Holberton Account".</p>
						<Textarea
							id="lost-account-msg-input"
							name="lostAccountMsg"
							class="w-full max-w-[500px] min-h-[100px]"
							value={config.lostAccountMsg}
							placeholder="Enter the message users will see..."
							required
							disabled={isSubmitting}
						/>
					</div>

					<div class="flex justify-end">
						<Button type="submit" loading={isSubmitting} class="m-auto cursor-pointer">
							{isSubmitting ? 'Saving...' : 'Save Changes'}
						</Button>
					</div>
				</form>
			{:else}
				<div class="text-red-600 text-center">Failed to load configuration</div>
			{/if}
		{:catch error}
			<div class="text-red-600 text-center">Error loading configuration</div>
		{/await}
	</div>
</GenericBoxVisible>
