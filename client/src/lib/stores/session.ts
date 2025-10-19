// import { readable, type Readable } from 'svelte/store';
// import { setContext, getContext } from 'svelte';
// import type { User } from '../../ambient';

// // Type for this user is declared in ambient.d.ts.
// // Needs to be the same as the model from the DB.

// const USER_KEY = Symbol('user');

// export function setUserStore(initialData: User) {
//     const userStore = readable(initialData);
//     setContext(USER_KEY, userStore);
// }

// export function getUserStore() {
//     return getContext<Readable<User>>(USER_KEY);
// }