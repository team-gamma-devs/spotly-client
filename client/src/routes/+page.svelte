<script>
	import { page } from '$app/state';
	import GenericBoxInvisible from '$lib/components/main/utils/GenericBoxInvisible.svelte';
	import { Button } from 'flowbite-svelte';


	const user = $derived(page.data.user);

	// onMount(() => {
	// 	console.log(JSON.stringify(user));

	// TODO: CHECK store/sessions.ts

	// });
</script>

<GenericBoxInvisible classes="pb-15">
	{#if user}
		<GenericBoxInvisible>
			<h1>
				Welcome {user.first_name}
				{user.last_name}!!
			</h1>
			<!-- <ul> Check supabase integration
			{#each data.countries as country}
				<li>{country.name}</li>
			{/each}
		</ul> -->
		</GenericBoxInvisible>
	{:else}
		<GenericBoxInvisible>
			<h1 class="text-xl font-bold">Welcome!</h1>
			<h2>Please log in to start using Spotly!</h2>
			<Button color="green" href="/login">Log In</Button>
		</GenericBoxInvisible>
	{/if}
</GenericBoxInvisible>
