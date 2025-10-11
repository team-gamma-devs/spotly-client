// This should only keep stateful auth,
// secrets, token verify, DB Reads, or Node APIs. remain in server/auth.ts

import { writable } from "svelte/store"

export const isAuth = writable(true);
export const userRole = writable("graduate");