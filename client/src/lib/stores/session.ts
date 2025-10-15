import { readable, type Readable } from 'svelte/store';
import { setContext, getContext } from 'svelte';
import type { User } from '../../ambient';

// This can be your actual user type from the backend

// _id: "b70119aa-8414-4a21-9f45-84a6281744e6"
// full_name: "gabriel barnada"
// email: "gabedere2@live.com"
// cohort: 26
// token: "rwi1KM61230-98asdndasdasd2198nasd21-0-d12983lUA" <- do not handle.
// token_state: false
// log_state: false
// created_at: 2025-10-14T20:32:24.626+00:00
// expires_at: 2025-11-13T20:32:24.626+00:00

const USER_KEY = Symbol('user');

export function setUserStore(initialData: User) {
    const userStore = readable(initialData);
    setContext(USER_KEY, userStore);
}

export function getUserStore() {
    return getContext<Readable<User>>(USER_KEY);
}