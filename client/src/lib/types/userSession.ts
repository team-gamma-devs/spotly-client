// types/graduate.ts

export type EnglishLevel = 'Basic' | 'Intermediate' | 'Advanced';

export type ScoreLevel = 'Poor' | 'Average' | 'Good' | 'Excellent';

export interface TutorFeedback {
	id: string;
	tutorId: string;
	tutorName: string;
	professionalScore: string;
	technicalScore: string;
	annotation: string;
	createdAt: string; // ISO 8601 date string
}

export interface CvInfo {
	personalCvUrl: string;
	linkedinUrl: string;
	skills: string[];
	englishLevel: string;
	worksInIt: boolean;
	lastUpdate: string; // ISO 8601 date string
}

export interface User {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	avatarUrl: string;
	cohort: number;
	github: string;
	cvInfo: CvInfo;
	tutorsFeedback: TutorFeedback[];
	role: string;
	createdAt: string; // ISO 8601 date string
	updatedAt: string; // ISO 8601 date string
}

export interface AuthMeResponse {
	graduates: User[];
	totalCount: number;
	page: number;
	pageSize: number;
	totalPages: number;
}