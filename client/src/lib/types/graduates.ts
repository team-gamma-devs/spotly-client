
// This defines the graduate list used in the main dashboard.
// Check components/manager/GraduateCard.svelte

import type { EnglishLevel } from "./userFull";
import type { ScoreLevel } from "./userFull";

export interface Annotation {
    id: string;
    createdAt: string;
    annotation: string;
}

export type TutorFeedback = {
    [feedbackId: string]: {
        createdAt: string;
        professionalScore: ScoreLevel;
        technicalScore: ScoreLevel;
        tutorName: string;
        tutorId: string;
    };
};

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
    tutorsFeedback?: TutorFeedback | null;
    worksInIt: boolean;
    createdAt: string;
    updatedAt: string;
    cvUrl?: string | null;
}

export interface PaginatedGraduatesResponse {
    items: Graduate[];
    pages: number;
    page: number;
    limit: number;
}


