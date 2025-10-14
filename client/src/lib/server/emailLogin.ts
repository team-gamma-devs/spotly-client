import { authenticatedFetch } from '$lib/server/auth_req';
import { redirect } from '@sveltejs/kit';

export async function sendEmailLogin(email: string) {
    // This will make the backend call.

    console.log("I'm inside the email login server service.");
    return { HTTP: 403, msg: "You're not authorized by Holberton" }
}