// Auto-generated

// I'm thinking that feedback should be rated like this: ["Poor", "Average", "Good", "Excellent"] 
type Annotation = {
	id: string;
	createdAt: string;
	message: string;
};

type TutorFeedback = {
	[feedbackId: string]: {
		createdAt: string;
		professionalScore: 'Poor' | 'Average' | 'Good' | 'Excellent';
		technicalScore: 'Poor' | 'Average' | 'Good' | 'Excellent';
		tutorName: string;
		tutorId: string;
	};
};

type Graduate = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	avatarUrl: string;
	englishLevel: 'Basic' | 'Intermediate' | 'Advanced';
	cohort: string;
	techStack: string[];
	githubUrl: string;
	linkedinUrl: string;
	annotations: Annotation[];
	tutorsFeedback: TutorFeedback;
	updatedAt: string;
	worksInIt: boolean;
};

export const mockGraduates: Graduate[] = [
	{
		id: 'f1e2d3c4-b5a6-9780-1234-567890abcdef',
		firstName: 'Maria',
		lastName: 'Rodriguez',
		email: 'maria.rodriguez@holberton.com',
		avatarUrl: 'https://i.pravatar.cc/150?img=1',
		englishLevel: 'Advanced',
		cohort: 'C23',
		techStack: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'C++'],
		githubUrl: 'https://github.com/mariarodriguez',
		linkedinUrl: 'https://linkedin.com/in/mariarodriguez',
		updatedAt: 'Oct 18, 2025',
		annotations: [
			{
				id: 'a1b2c3d4-e5f6-7890-1111-111111111111',
				createdAt: '2025-10-18T14:30:00.000Z',
				message: 'Excellent problem solver, very proactive in team discussions.',
			},
			{
				id: 'a1b2c3d4-e5f6-7890-2222-222222222222',
				createdAt: '2025-10-10T09:15:00.000Z',
				message: 'Strong frontend skills, delivered pixel-perfect designs.',
			},
		],
		tutorsFeedback: {},
		worksInIt: true,
	},
	{
		id: 'a2b3c4d5-e6f7-8901-2345-678901bcdefg',
		firstName: 'James',
		lastName: 'Patterson',
		email: 'james.patterson@holberton.com',
		avatarUrl: 'https://i.pravatar.cc/150?img=12',
		englishLevel: 'Advanced',
		cohort: 'C23',
		techStack: ['Python', 'Django', 'AWS', 'Redis'],
		githubUrl: 'https://github.com/jpatterson',
		linkedinUrl: 'https://linkedin.com/in/jamespatterson',
		updatedAt: 'Oct 19, 2025',
		annotations: [
			{
				id: 'a1b2c3d4-e5f6-7890-3333-333333333333',
				createdAt: '2025-10-19T11:45:00.000Z',
				message: 'Great at backend architecture and API design.',
			},
		],
		tutorsFeedback: {
			'feedback-001': {
				createdAt: '2025-10-12T14:20:00.000Z',
				professionalScore: 'Good',
				technicalScore: 'Excellent',
				tutorName: 'Ignacio Capenziani',
				tutorId: 'd4e5f6a7-b8c9-0123-4567-def012234567',
			},
		},
		worksInIt: true,
	},
	{
		id: 'b3c4d5e6-f7a8-9012-3456-789012cdefgh',
		firstName: 'Aisha',
		lastName: 'Okonkwo',
		email: 'aisha.okonkwo@holberton.com',
		avatarUrl: 'https://i.pravatar.cc/150?img=5',
		englishLevel: 'Advanced',
		cohort: 'C22',
		techStack: ['JavaScript', 'Vue.js', 'MongoDB', 'Express'],
		githubUrl: 'https://github.com/aokonkwo',
		linkedinUrl: 'https://linkedin.com/in/aishaokonkwo',
		updatedAt: 'Oct 17, 2025',
		annotations: [
			{
				id: 'a1b2c3d4-e5f6-7890-4444-444444444444',
				createdAt: '2025-10-17T08:30:00.000Z',
				message: 'Consistently delivers clean, well-documented code.',
			},
			{
				id: 'a1b2c3d4-e5f6-7890-5555-555555555555',
				createdAt: '2025-10-05T13:00:00.000Z',
				message: 'Mentored junior students during peer learning sessions.',
			},
			{
				id: 'a1b2c3d4-e5f6-7890-6666-666666666666',
				createdAt: '2025-09-22T16:45:00.000Z',
				message: 'Led the team project with excellent communication.',
			},
		],
		tutorsFeedback: {
			'feedback-002': {
				createdAt: '2025-10-10T09:00:00.000Z',
				professionalScore: 'Excellent',
				technicalScore: 'Good',
				tutorName: 'Ignacio Capenziani',
				tutorId: 'd4e5f6a7-b8c9-0123-4567-def012234567',
			},
			'feedback-003': {
				createdAt: '2025-09-30T15:30:00.000Z',
				professionalScore: 'Poor',
				technicalScore: 'Poor',
				tutorName: 'Javier Valezzolo',
				tutorId: 'e5f6a7b8-c9d0-1234-5678-ef0123456789',
			},
		},
		worksInIt: true,
	},
	{
		id: 'c4d5e6f7-a8b9-0123-4567-890123defghi',
		firstName: 'Carlos',
		lastName: 'Mendez',
		email: 'carlos.mendez@holberton.com',
		avatarUrl: 'https://i.pravatar.cc/150?img=13',
		englishLevel: 'Basic',
		cohort: 'C23',
		techStack: ['Java', 'Spring Boot', 'Kubernetes', 'MySQL'],
		githubUrl: '',
		linkedinUrl: 'https://linkedin.com/in/carlosmendez',
		updatedAt: 'Oct 20, 2025',
		annotations: [],
		tutorsFeedback: {
			'feedback-004': {
				createdAt: '2025-10-18T11:15:00.000Z',
				professionalScore: 'Poor',
				technicalScore: 'Poor',
				tutorName: 'Javier Valezzolo',
				tutorId: 'e5f6a7b8-c9d0-1234-5678-ef0123456789',
			},
		},
		worksInIt: false,
	},
	{
		id: 'd5e6f7a8-b9c0-1234-5678-901234efghij',
		firstName: 'Emma',
		lastName: 'Thompson',
		email: 'emma.thompson@holberton.com',
		avatarUrl: 'https://i.pravatar.cc/150?img=9',
		englishLevel: 'Intermediate',
		cohort: 'C22',
		techStack: ['TypeScript', 'Angular', 'Firebase', 'GraphQL'],
		githubUrl: 'https://github.com/emmathompson',
		linkedinUrl: 'https://linkedin.com/in/emmathompson',
		updatedAt: 'Oct 16, 2025',
		annotations: [
			{
				id: 'a1b2c3d4-e5f6-7890-7777-777777777777',
				createdAt: '2025-10-16T10:20:00.000Z',
				message: 'Exceptional attention to detail in UI/UX implementation.',
			},
		],
		tutorsFeedback: {
			'feedback-005': {
				createdAt: '2025-10-08T13:45:00.000Z',
				professionalScore: 'Poor',
				technicalScore: 'Average',
				tutorName: 'Javier Valezzolo',
				tutorId: 'e5f6a7b8-c9d0-1234-5678-ef0123456789',
			},
			'feedback-006': {
				createdAt: '2025-09-25T09:30:00.000Z',
				professionalScore: 'Poor',
				technicalScore: 'Poor',
				tutorName: 'Pagarico Fedenini',
				tutorId: 'c3d4e5f6-a7b8-9012-3456-cdef01123456',
			},
		},
		worksInIt: true,
	},
	{
		id: 'e6f7a8b9-c0d1-2345-6789-012345fghijk',
		firstName: 'Raj',
		lastName: 'Patel',
		email: 'raj.patel@holberton.com',
		avatarUrl: 'https://i.pravatar.cc/150?img=15',
		englishLevel: 'Basic',
		cohort: 'C23',
		techStack: ['Go', 'gRPC', 'Docker', 'Terraform'],
		githubUrl: 'https://github.com/rajpatel',
		linkedinUrl: '',
		updatedAt: 'Oct 19, 2025',
		annotations: [
			{
				id: 'a1b2c3d4-e5f6-7890-8888-888888888888',
				createdAt: '2025-10-19T15:00:00.000Z',
				message: 'Strong understanding of microservices architecture.',
			},
			{
				id: 'a1b2c3d4-e5f6-7890-9999-999999999999',
				createdAt: '2025-10-12T11:30:00.000Z',
				message: 'Always willing to help teammates debug issues.',
			},
		],
		tutorsFeedback: {
			'feedback-007': {
				createdAt: '2025-10-14T16:20:00.000Z',
				professionalScore: 'Good',
				technicalScore: 'Excellent',
				tutorName: 'Pagarico Fedenini',
				tutorId: 'c3d4e5f6-a7b8-9012-3456-cdef01123456',
			},
		},
		worksInIt: true,
	},
	{
		id: 'f7a8b9c0-d1e2-3456-7890-123456ghijkl',
		firstName: 'Sofia',
		lastName: 'Garcia',
		email: 'sofia.garcia@holberton.com',
		avatarUrl: '',
		englishLevel: 'Intermediate',
		cohort: 'C22',
		techStack: ['Ruby', 'Rails', 'PostgreSQL', 'Heroku'],
		githubUrl: '',
		linkedinUrl: 'https://linkedin.com/in/sofiagarcia',
		updatedAt: 'Oct 15, 2025',
		annotations: [
			{
				id: 'a1b2c3d4-e5f6-7890-aaaa-aaaaaaaaaaaa',
				createdAt: '2025-10-15T09:45:00.000Z',
				message: 'Demonstrated strong test-driven development practices.',
			},
		],
		tutorsFeedback: {
			'feedback-008': {
				createdAt: '2025-10-09T12:00:00.000Z',
				professionalScore: 'Excellent',
				technicalScore: 'Good',
				tutorName: 'Pagarico Fedenini',
				tutorId: 'c3d4e5f6-a7b8-9012-3456-cdef01123456',
			},
			'feedback-009': {
				createdAt: '2025-09-27T14:30:00.000Z',
				professionalScore: 'Good',
				technicalScore: 'Excellent',
				tutorName: 'Ignacio Capenziani',
				tutorId: 'd4e5f6a7-b8c9-0123-4567-def012234567',
			},
		},
		worksInIt: false,
	},
	{
		id: 'a8b9c0d1-e2f3-4567-8901-234567hijklm',
		firstName: 'Kwame',
		lastName: 'Mensah',
		email: 'kwame.mensah@holberton.com',
		avatarUrl: 'https://i.pravatar.cc/150?img=14',
		englishLevel: 'Basic',
		cohort: 'C23',
		techStack: ['C', 'Linux', 'Bash', 'Git'],
		githubUrl: 'https://github.com/kwamemensah',
		linkedinUrl: 'https://linkedin.com/in/kwamemensah',
		updatedAt: 'Oct 18, 2025',
		annotations: [
			{
				id: 'a1b2c3d4-e5f6-7890-bbbb-bbbbbbbbbbbb',
				createdAt: '2025-10-18T13:15:00.000Z',
				message: 'Deep understanding of low-level programming concepts.',
			},
			{
				id: 'a1b2c3d4-e5f6-7890-cccc-cccccccccccc',
				createdAt: '2025-10-07T10:00:00.000Z',
				message: 'Contributed to open source project during cohort.',
			},
		],
		tutorsFeedback: {
			'feedback-010': {
				createdAt: '2025-10-11T15:45:00.000Z',
				professionalScore: 'Good',
				technicalScore: 'Poor',
				tutorName: 'Pagarico Fedenini',
				tutorId: 'c3d4e5f6-a7b8-9012-3456-cdef01123456',
			},
		},
		worksInIt: false,
	},
	{
		id: 'b9c0d1e2-f3a4-5678-9012-345678ijklmn',
		firstName: 'Lily',
		lastName: 'Zhang',
		email: 'lily.zhang@holberton.com',
		avatarUrl: 'https://i.pravatar.cc/150?img=47',
		englishLevel: 'Advanced',
		cohort: 'C22',
		techStack: ['React', 'Next.js', 'Tailwind', 'Vercel'],
		githubUrl: 'https://github.com/lilyzhang',
		linkedinUrl: 'https://linkedin.com/in/lilyzhang',
		updatedAt: 'Oct 20, 2025',
		annotations: [
			{
				id: 'a1b2c3d4-e5f6-7890-dddd-dddddddddddd',
				createdAt: '2025-10-20T08:00:00.000Z',
				message: 'Creates beautiful, responsive user interfaces.',
			},
		],
		tutorsFeedback: {
			'feedback-011': {
				createdAt: '2025-10-16T10:30:00.000Z',
				professionalScore: 'Good',
				technicalScore: 'Excellent',
				tutorName: 'Pagarico Fedenini',
				tutorId: 'c3d4e5f6-a7b8-9012-3456-cdef01123456',
			},
			'feedback-012': {
				createdAt: '2025-10-02T13:20:00.000Z',
				professionalScore: 'Excellent',
				technicalScore: 'Excellent',
				tutorName: 'Javier Cappenziani',
				tutorId: 'f6a7b8c9-d0e1-2345-6789-0123456789ab',
			},
		},
		worksInIt: true,
	},
	{
		id: 'c0d1e2f3-a4b5-6789-0123-456789jklmno',
		firstName: 'Ahmed',
		lastName: 'Hassan',
		email: 'ahmed.hassan@holberton.com',
		avatarUrl: 'https://i.pravatar.cc/150?img=11',
		englishLevel: 'Intermediate',
		cohort: 'C23',
		techStack: ['PHP', 'Laravel', 'MySQL', 'Apache'],
		githubUrl: 'https://github.com/ahmedhassan',
		linkedinUrl: 'https://linkedin.com/in/ahmedhassan',
		updatedAt: 'Oct 17, 2025',
		annotations: [
			{
				id: 'a1b2c3d4-e5f6-7890-eeee-eeeeeeeeeeee',
				createdAt: '2025-10-17T14:45:00.000Z',
				message: 'Reliable team member, always meets deadlines.',
			},
			{
				id: 'a1b2c3d4-e5f6-7890-ffff-ffffffffffff',
				createdAt: '2025-10-08T09:30:00.000Z',
				message: 'Good understanding of security best practices.',
			},
		],
		tutorsFeedback: {
			'feedback-013': {
				createdAt: '2025-10-13T11:00:00.000Z',
				professionalScore: 'Good',
				technicalScore: 'Good',
				tutorName: 'Pagarico Fedenini',
				tutorId: 'c3d4e5f6-a7b8-9012-3456-cdef01123456',
			},
		},
		worksInIt: true,
	},
	{
		id: 'd1e2f3a4-b5c6-7890-1234-567890klmnop',
		firstName: 'Gabriel',
		lastName: 'San',
		email: 'elmascapo@holberton.com',
		avatarUrl: 'https://ca.slack-edge.com/T0423U1MW21-U08BFD05VD1-23499eb54714-512',
		englishLevel: 'Basic',
		cohort: 'C26',
		techStack: ['Svelte', 'Tailwind', 'Vercel'],
		githubUrl: 'https://github.com/glovek08',
		linkedinUrl: '',
		updatedAt: '0420-10-20T08:00:00.000Z',
		annotations: [
			{
				id: 'a1b2c3d4-e5f6-7890-0000-000000000000',
				createdAt: '2025-10-20T08:00:00.000Z',
				message: 'Incredible! The Goat!',
			},
		],
		tutorsFeedback: {
			'feedback-014': {
				createdAt: '2025-10-16T10:30:00.000Z',
				professionalScore: 'Poor',
				technicalScore: 'Average',
				tutorName: 'Pagarico Fedenini',
				tutorId: 'c3d4e5f6-a7b8-9012-3456-cdef01123456',
			},
			'feedback-015': {
				createdAt: '2025-10-02T13:20:00.000Z',
				professionalScore: 'Excellent',
				technicalScore: 'Excellent',
				tutorName: 'Bill Gates',
				tutorId: 'e5f6a7b8-c9d0-1234-5678-ef0123345678',
			},
		},
		worksInIt: true,
	},
	{
		id: 'a1b2c3d4-e5f6-7890-1234-abcdeffedcba',
		firstName: 'Gabe',
		lastName: 'Newell',
		email: 'elmascapo@holberton.com',
		avatarUrl: 'https://media.licdn.com/dms/image/v2/C5603AQH0M2JmCkssGg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1655779665424?e=2147483647&v=beta&t=34WUe4mxClKKR8rmUTFJyzW0LvDfHugQA3eNAQe11nM',
		englishLevel: 'Basic',
		cohort: 'C26',
		techStack: ['React.js', 'Tailwind', 'Vercel'],
		githubUrl: 'https://github.com/ignacio-capezzolo',
		linkedinUrl: '',
		updatedAt: '0420-10-20T08:00:00.000Z',
		annotations: [
			{
				id: 'b2c3d4e5-f6a7-8901-2345-bcdef0012345',
				createdAt: '2025-10-20T08:00:00.000Z',
				message: 'Incredible! The Goat!',
			},
		],
		tutorsFeedback: {
			'feedback-016': {
				createdAt: '2025-10-16T10:30:00.000Z',
				professionalScore: 'Poor',
				technicalScore: 'Average',
				tutorName: 'Pagarico Fedenini',
				tutorId: 'c3d4e5f6-a7b8-9012-3456-cdef01123456',
			},
			'feedback-017': {
				createdAt: '2025-10-02T13:20:00.000Z',
				professionalScore: 'Excellent',
				technicalScore: 'Excellent',
				tutorName: 'Bill Gates',
				tutorId: 'e5f6a7b8-c9d0-1234-5678-ef0123345678',
			},
		},
		worksInIt: false,
	},
];