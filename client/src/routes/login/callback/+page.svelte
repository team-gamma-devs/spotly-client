<script lang="ts">  
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabaseClient';
	import { Spinner } from 'flowbite-svelte';
	import GenericBoxVisible from '$lib/components/main/utils/GenericBoxVisible.svelte';

	onMount(async () => {
		const hashParams = new URLSearchParams(window.location.hash.substring(1));

		const error = hashParams.get('error');
		const error_code = hashParams.get('error_code');
		const error_description = hashParams.get('error_description');

		if (error) {
			console.error('Auth error:', error_code, error_description);

			if (error_code === 'otp_expired') {
				goto('/login?error=link_expired');
				return;
			} else if (error === 'access_denied') {
				goto('/login?error=access_denied');
				return;
			} else {
				goto(`/login?error=${error_code || error}`);
				return;
			}
		}
		const access_token = hashParams.get('access_token');
		const refresh_token = hashParams.get('refresh_token');
		const type = hashParams.get('type');

		if (access_token && type === 'magiclink') {
			try {
				const { data, error } = await supabase.auth.setSession({
					access_token,
					refresh_token: refresh_token || '',
				});

				if (error) throw error;

				const response = await fetch('/api/auth/complete', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ access_token, refresh_token }),
				});

				const userData = await response.json();

				if (userData?.role === 'manager') {
					goto('/app/manager');
				} else if (userData?.isFirstTime) {
					goto('/app/graduate/upload_cv');
				} else if (!userData?.isFirstTime && userData?.role === 'graduate') {
					goto('/app/graduate');
				} else {
          goto('/')
        }
			} catch (error) {
				console.error('Error:', error);
				goto('/login?error=verification_failed');
			}
		} else {
			goto('/login?error=missing_token');
		}
	});
</script>

<GenericBoxVisible>
	<Spinner size="16" />
	<p>Verifying your login...</p>
</GenericBoxVisible>
