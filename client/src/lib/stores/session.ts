import { readable } from 'svelte/store';
import { setContext, getContext } from 'svelte';

// Define the shape of our session data
export interface Session {
    isAuthenticated: boolean;
    userRole: 'graduate' | 'manager' | null;
}

// Create a unique key for the context API
const SESSION_SECRET = Symbol('session');

/**
 * Creates and sets the read-only session store in Svelte's context.
 * This should only be called once, in the root +layout.svelte.
 * @param initialData The session data securely passed from the server.
 */
export function setSession(initialData: Session) {
    const session = {
        isAuthenticated: readable(initialData.isAuthenticated),
        userRole: readable(initialData.userRole)
    };
    setContext(SESSION_SECRET, session);
}

/**
 * Retrieves the session stores from Svelte's context.
 * This can be called in any component.
 * @returns The read-only session stores.
 */
export function getSession() {
    return getContext<{
        isAuthenticated: typeof readable<boolean>;
        userRole: typeof readable<'graduate' | 'manager' | null>;
    }>(SESSION_SECRET);
}