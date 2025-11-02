
// This defines the structure of the user data for the currently logged-in user, returned by the backend auth/me endpoint.
// Check src/hooks.server.ts, also used in components/main/Header.svelte through the page state.

export type UserMe = {
    id: string,
    firstName: string,
    lastName: string,
    role: 'graduate' | 'manager',
    avatarUrl: string | null,
    isFirstTime: boolean
} | null;