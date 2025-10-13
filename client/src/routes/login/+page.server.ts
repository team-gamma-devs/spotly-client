// You can invoke this action in the same route or from other pages using:
// <form method="POST" action="/login">

import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {
    default: async ({ request }) => {
        const form = await request.formData();
        const email = String(form.get('email') ?? '');
        // for (const [key, value] of form.entries()) { uncomment to check payload.
        //     console.log(key, value);
        // }
        
        if (!email) return { success: false, error: 'Email is required' }; // It's already check, but JIC.
        
        try {
            // await sendEmail(email); // Email logic goes here, check if the email is in the holberton csv, create the token.
            console.log('Email sent to Fede');
            // return { success: false, error: 'Email not registered' };
        } catch (error) {
            console.error('Email sending failed:', error);
            return { success: false, error: 'Failed to send email' };
        }
        throw redirect(303, '/app/graduate/github');
    }
};


