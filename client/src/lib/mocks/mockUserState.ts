export interface MongoObjectId {
  $oid: string;
}
export interface MongoDate {
  $date: string;
}
export type UserRole = 'graduate' | 'manager';
export type EnglishLevel = 'basic' | 'intermediate' | 'advanced';
export interface UserCVInfo {
  githubInfo: string;
  personalCvUrl: string;
  personalCvPath: string;
  linkedinUrl: string;
  skills: string[];
  englishLevel: EnglishLevel;
  worksInIt: boolean;
  lastUpdate: MongoDate;
}
export interface UserState {
  id: MongoObjectId;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string;
  avatarPath: string;
  role: UserRole;
  createdAt: MongoDate;
  updatedAt: MongoDate;
  cvInfo: UserCVInfo;
  cohort: number;
}
export const mockUserState: UserState = {
  id: { $oid: '68fd528c007c411b4191e836' },
  firstName: 'Federico',
  lastName: 'Paganini',
  email: 'perfedefer@gmail.com',
  avatarUrl:'',
  avatarPath: '',
  role: 'graduate',
  createdAt: { $date: '2025-10-25T19:43:24.025Z' },
  updatedAt: { $date: '2025-10-25T19:43:24.025Z' },
  cvInfo: {
    githubInfo: 'https://github.com/federico-paganini',
    personalCvUrl:
'',
    personalCvPath: '',
    linkedinUrl:
'',
    skills: [
'Docker',
'React',
'Git',
'SQL',
'Flask',
'Nginx',
'MongoDB',
'AWS',
'JavaScript',
'TypeScript',
'Docker Compose',
'C',
'Bootstrap',
'Node.js',
'REST',
'CSS',
'Unittest',
'Python',
'FastAPI',
'HTML',
'GitHub',
],
    englishLevel: 'advanced',
    worksInIt: true,
    lastUpdate: { $date: '2025-10-25T19:43:23.457Z' },
},
  cohort: 26,
};