// types/graduate.ts

export type EnglishLevel = 'Basic' | 'Intermediate' | 'Advanced';

export type ScoreLevel = 'Poor' | 'Average' | 'Good' | 'Excellent';

export interface Annotation {
	id: string;
	createdAt: string; // ISO 8601 date string
	message: string;
}

export interface TutorFeedback {
	createdAt: string; // ISO 8601 date string
	professionalScore: ScoreLevel;
	technicalScore: ScoreLevel;
	tutorName: string;
	tutorId: string;
}

export interface Graduate {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	avatarUrl: string;
	englishLevel: EnglishLevel;
	cohort: string;
	techStack: string[];
	githubUrl: string;
	linkedinUrl: string;
	updatedAt: string;
	annotations: Annotation[];
	tutorsFeedback: Record<string, TutorFeedback>; // Key is feedback ID
	worksInIt: boolean;
}

export interface GraduatesListResponse {
	graduates: Graduate[];
	totalCount: number;
	page: number;
	pageSize: number;
	totalPages: number;
}