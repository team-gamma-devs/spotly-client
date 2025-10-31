export type UserMe = {
    id: string,
    firstName: string,
    lastName: string,
    role: 'graduate' | 'manager',
    isFirstTime: boolean
} | null;