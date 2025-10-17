/**
 * This represents the SAFE user data that the backend should send to the client.
 * It intentionally omits sensitive fields like 'token'.
 */
export type User = {
    _id: string,
    first_name: string,
    last_name: string,
    email: string,
    avatar_url: string,
    cohort: number,
    github_info: str,
    cv_info: str,
    tutors_feedback: Array<string>,
    tech_stack: Array<string>,
    role: "graduate" | "manager",
    created_at: string,
    updated_at: string,
} | null;