// This should only keep stateful auth,
// secrets, token verify, DB Reads, or Node APIs. remain in server/auth.ts

import { writable } from "svelte/store"

// Controls whether the user is authenticated through the server/backend.
// 401 Unauthorized otherwise.
// Check unauthorized component in $lib/components/error/Unauthorized.svelte
export const isAuth = writable(true);

// This controls the UI role-based components.
// For example graduate rol trying to enter manager dashboard.
// 403 Forbidden if the user doesn't have enough permissions
// Check forbidden component in $lib/components/error/Forbidden.svelte
export const userRole = writable("graduate");

 // This tells us if the user has already logged in to his github account.
export const isLoggedGithub = writable(false);