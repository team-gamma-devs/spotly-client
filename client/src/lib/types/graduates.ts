export type EnglishLevel = 'Basic' | 'Intermediate' | 'Advanced';

export type ScoreLevel = 'Poor' | 'Average' | 'Good' | 'Excellent';

export interface Annotation {
    createdAt: string;
    message: string;
}

export interface TutorFeedbackItem {
    createdAt?: string;
    professionalScore?: ScoreLevel;
    technicalScore?: ScoreLevel;
    tutorName?: string;
    tutorId?: string;
}

export type TutorsFeedback = Record<string, TutorFeedbackItem>;

export interface Graduate {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    englishLevel: EnglishLevel;
    avatarUrl: string;
    cohort: number;
    techStack: string[];
    githubUrl?: string | null;
    linkedinUrl: string;
    annotations?: Annotation[] | null;
    tutorsFeedback?: TutorsFeedback | null;
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


