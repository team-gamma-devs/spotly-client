export type EnglishLevel = 'Basic' | 'Intermediate' | 'Advanced';

export type ScoreLevel = 'Poor' | 'Average' | 'Good' | 'Excellent';

export interface Annotation {
    id: string;
    createdAt: string;
    annotation: string;
}

export type TutorFeedback = {
    [feedbackId: string]: {
        createdAt: string;
        professionalScore: 'Poor' | 'Average' | 'Good' | 'Excellent';
        technicalScore: 'Poor' | 'Average' | 'Good' | 'Excellent';
        tutorName: string;
        tutorId: string;
    };
};

export type TutorsFeedback = Record<string, TutorFeedback>;

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
    createdAt: string;
    updatedAt: string;
    worksInIt: boolean;
}

export interface PaginatedGraduatesResponse {
    items: Graduate[];
    pages: number;
    page: number;
    limit: number;
}


