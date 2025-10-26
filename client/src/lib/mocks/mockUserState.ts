// export const mockUserState = {
//   _id: 'dev-user-123',
//   first_name: 'Pepe',
//   last_name: 'Pelotas',
//   email: 'pepe@pelotas.com',
//   avatar_url: 'pfp-fallback.svg',
//   isFirstTime: false,
//   cohort: 23,
//   github_info: '',
//   cv_info: [''],
//   tutors_feedback: [''],
//   tech_stack: ['react', 'mongodb', 'pepe', 'tailwind'],
//   role: 'graduate',
//   created_at: new Date().toISOString(),
//   updated_at: new Date().toISOString(),
// };
export interface MongoObjectId {
  $oid: string;
}

export interface MongoDate {
  $date: string;
}

export type UserRole = 'graduate' | 'manager';

export type EnglishLevel = 'basic' | 'intermediate' | 'advanced' ;

export interface UserCVInfo {
  personal_cv_url: string;
  personal_cv_path: string;
  linkedin_url: string;
  skills: string[];
  english_level: EnglishLevel;
  works_in_it: boolean;
  last_update: MongoDate;
}

export interface UserState {
  _id: MongoObjectId;
  first_name: string;
  last_name: string;
  email: string;
  avatar_url: string;
  avatar_path: string;
  role: UserRole;
  created_at: MongoDate;
  updated_at: MongoDate;
  github_info: string;
  cv_info: UserCVInfo;
  cohort: number;
}

export const mockUserState: UserState = {
  _id: { $oid: '68fd528c007c411b4191e836' },
  first_name: 'Federico',
  last_name: 'Paganini',
  email: 'perfedefer@gmail.com',
  avatar_url:
    'https://media.4-paws.org/d/2/5/f/d25ff020556e4b5eae747c55576f3b50886c0b90/cut%20cat%20serhio%2002-1813x1811-720x719.jpg',
  avatar_path: '',
  role: 'manager',
  created_at: { $date: '2025-10-25T19:43:24.025Z' },
  updated_at: { $date: '2025-10-25T19:43:24.025Z' },
  github_info: 'https://github.com/federico-paganini',
  cv_info: {
    personal_cv_url:
      '',
    personal_cv_path: '',
    linkedin_url:
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
    english_level: 'intermediate',
    works_in_it: true,
    last_update: { $date: '2025-10-25T19:43:23.457Z' },
  },
  cohort: 26,
};

