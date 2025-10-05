import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    // tell SvelteKit to include fonts in the preload list
    const response = await resolve(event, {
        preload: ({ type }) => {
            return type === 'font';
        }
    });

    return response;
};