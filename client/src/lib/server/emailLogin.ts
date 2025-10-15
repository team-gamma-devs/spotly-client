import { authenticatedFetch } from '$lib/server/auth_req';
import { redirect } from '@sveltejs/kit';

export async function sendEmailLogin(email: string) {
    // This will make the backend call.

    // Questions for fede, who receives the email and checks it in the backend?
    // raise HTTPException(status_code=status.HTTP_410_GONE, detail=str(e))
    // Fede's pattern is (status_code=BasDKW, detail="Blabllaweusds")

    console.log("I'm inside the email login server service.");

    // const resp = await authenticatedFetch('https://api.spotly.work/auth/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email })
    // });

    // console.log(resp);

    // if (resp.status === 200) {
    //     const data = await resp.json();
    //     // Caso 200.
    //     return { status_code: 200, detail: data };
    // }

    // if (resp.status === 403) {
    //     // Caso 403.
    //     return { status_code: 403, detail: "You're not authorized by Holberton" };
    // }

    // // catch if fede wants to go loco.
    // const fallback = await resp.text();
    // return { status_code: resp.status, detail: fallback };
    
}


