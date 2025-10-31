export interface Annotation {
    createdAt: string;
    message: string;
}

export type TutorsFeedback = Record<string, Record<string, unknown>>;

export interface Graduate {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    englishLevel: string;
    avatarUrl: string;
    cohort: number;
    techStack: string[];
    githubUrl: string;
    linkedinUrl: string;
    annotations: Annotation[];
    tutorsFeedback: TutorsFeedback;
    worksInIt: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface PaginatedGraduatesResponse {
    items: Graduate[];
    pages: number;
    page: number;
    limit: number;
}


