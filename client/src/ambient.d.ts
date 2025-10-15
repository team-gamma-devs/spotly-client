/**
 * This represents the SAFE user data that the backend should send to the client.
 * It intentionally omits sensitive fields like 'token'.
 */
export type User = {
    id: string;
    full_name: string;
    email: string;
    role: 'graduate' | 'manager';
    cohort: number;
    token_state: boolean;
    log_state: boolean;
    created_at: string;
    expires_at: string;
} | null;