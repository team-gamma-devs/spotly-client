export type UserAuthMe = {
	id: string | null;
	first_name: string | null;
	last_name: string | null;
	role: 'graduate' | 'manager';
  isFirstTime: boolean;
} | null;