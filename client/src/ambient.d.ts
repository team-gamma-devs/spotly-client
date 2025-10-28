/**
 * This represents the SAFE user data that the backend should send to the client.
 * It intentionally omits sensitive fields like 'token'.
 */
// export type User = {
// 	id: string;
// 	first_name: string;
// 	last_name: string;
// 	email: string;
// 	avatar_url: string;
// 	cohort: number;
// 	github: string;
// 	role: 'graduate' | 'manager';
// 	createdAt: string;
// 	updatedAt: string;
// } | null;
export type UserState = {
	id: string | null;
	firstName: string | null;
	lastName: string | null;
	isFirstTime: boolean;
	role: 'graduate' | 'manager';
} | null;