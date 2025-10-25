<script lang="ts">
	import BtnGoBack from './utils/BtnGoBack.svelte';
	import { GenericBoxInvisible, GenericBoxVisible } from './utils';
	import LoginForm from './utils/LoginForm.svelte';
</script>

<GenericBoxInvisible>
	<div id="form-logo-container" class="w-full flex items-center justify-center">
		<enhanced:img src="$lib/assets/svgs/spotly-logo-color.svg" width="50" height="50" alt="Spotly Logo"></enhanced:img>
		<h4 id="signup-header" class="zalando-font text-2xl">Spotly</h4>
	</div>

	<GenericBoxVisible classes="px-10">
		<div id="form-header" class=" flex items-center justify-between w-full mb-4">
			<h1 class="text-xl">Login</h1>
			<BtnGoBack targetUrl="/" classes="hidden md:block md:flex md:items-center md:justify-center" />
		</div>

		<LoginForm />
		<p class="p-signup text-foreground text-sm">You'll receive an access link <br> Check your spam folder</p>
		<p class="text-[10px] flex items-center justify-end mt-7 text-gray-400 w-full">
			Powered By <enhanced:img
				src="$lib/assets/pngs/supabase-logo.png"
				alt="Supabase"
				class="rounded ml-2 mr-1 brightness-70 dark:brightness-100"
				width="15"
				height="15"
			></enhanced:img><a
				href="https://supabase.com/auth"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Amazon Cognito"><b>Supabase</b></a
			>
		</p>
	</GenericBoxVisible>
</GenericBoxInvisible>

<style>
	.p-signup {
		margin: 0;
		margin-top: 1rem;
		max-width: 200px;
		text-align: center;
	}
</style>
