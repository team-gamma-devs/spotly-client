export type UserMe = {
    id: string,
    firstName: string,
    lastName: string,
    role: 'graduate' | 'manager',
    avatarUrl: string | null,
    isFirstTime: boolean
} | null;