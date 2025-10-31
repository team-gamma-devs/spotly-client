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
	createdAt: string;
}

export interface CvInfo {
	personalCvUrl: string;
	linkedinUrl: string;
	skills: string[];
	englishLevel: string;
	worksInIt: boolean;
	lastUpdate: string;
}

export interface UserState {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	avatarUrl: string;
	cohort: number;
	githubUsername: string;
	cvInfo: CvInfo;
	tutorsFeedback: TutorFeedback[];
	role: string;
	createdAt: string;
	updatedAt: string;
}

export interface AuthMeResponse {
	graduates: UserState[];
	totalCount: number;
	page: number;
	pageSize: number;
	totalPages: number;
}