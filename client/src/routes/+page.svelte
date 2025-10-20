<script>
	import { page } from '$app/state';
	import { Button } from 'flowbite-svelte';
	import { onMount } from 'svelte';

	const user = $derived(page.data.user);

	onMount(() => {
		console.log(JSON.stringify(user));
	});
</script>

{#if user}
	<h1>
		Welcome {user.first_name}
		{user.last_name}!!
	</h1>
{:else}
	<h1>Welcome!</h1>
	<h2>please log in to start using Spotly!</h2>
	<Button color="green" href="/login">Log In</Button>
{/if}
