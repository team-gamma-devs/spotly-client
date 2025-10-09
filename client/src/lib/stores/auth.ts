import { writable } from "svelte/store"

export const isAuth = writable(true);
export const userRole = writable("manager");