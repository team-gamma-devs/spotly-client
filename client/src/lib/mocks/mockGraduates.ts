
// Auto-generated

// I'm thinking that feedbck should be rated like this: ["Poor", "Average", "Good", "Excellent"] 
type Annotation = {
	created_at: string;
	message: string;
};

type TutorFeedback = {
	[tutorName: string]: {
		created_at: string;
		professional_score: string;
		technical_score: string;
	};
};

type Graduate = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	avatarUrl: string;
	cohort: string;
	techStack: string[];
	githubUrl: string;
	linkedinUrl: string;
	updatedAt: string;
	annotations: Annotation[];
	tutorsFeedback: TutorFeedback;
};

export const mockGraduates: Graduate[] = [
	{
		id: '1',
		firstName: 'Maria',
		lastName: 'Rodriguez',
		email: 'maria.rodriguez@holberton.com',
		avatarUrl: 'https://i.pravatar.cc/150?img=1',
		cohort: 'C23',
		techStack: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
		githubUrl: 'https://github.com/mariarodriguez',
		linkedinUrl: 'https://linkedin.com/in/mariarodriguez',
		updatedAt: 'Oct 18, 2025',
		annotations: [
			{
				created_at: '2025-10-18T14:30:00.000Z',
				message: 'Excellent problem solver, very proactive in team discussions.',
			},
			{
				created_at: '2025-10-10T09:15:00.000Z',
				message: 'Strong frontend skills, delivered pixel-perfect designs.',
			},
		],
		tutorsFeedback: {},
	},
	{
		id: '2',
		firstName: 'James',
		lastName: 'Patterson',
		email: 'james.patterson@holberton.com',
		avatarUrl: 'https://i.pravatar.cc/150?img=12',
		cohort: 'C23',
		techStack: ['Python', 'Django', 'AWS', 'Redis'],
		githubUrl: 'https://github.com/jpatterson',
		linkedinUrl: 'https://linkedin.com/in/jamespatterson',
		updatedAt: 'Oct 19, 2025',
		annotations: [
			{
				created_at: '2025-10-19T11:45:00.000Z',
				message: 'Great at backend architecture and API design.',
			},
		],
		tutorsFeedback: {
			'Ignacio Capenziani': {
				created_at: '2025-10-12T14:20:00.000Z',
				professional_score: 'Good',
				technical_score: 'Excellent',
			},
		},
	},
	{
		id: '3',
		firstName: 'Aisha',
		lastName: 'Okonkwo',
		email: 'aisha.okonkwo@holberton.com',
		avatarUrl: 'https://i.pravatar.cc/150?img=5',
		cohort: 'C22',
		techStack: ['JavaScript', 'Vue.js', 'MongoDB', 'Express'],
		githubUrl: 'https://github.com/aokonkwo',
		linkedinUrl: 'https://linkedin.com/in/aishaokonkwo',
		updatedAt: 'Oct 17, 2025',
		annotations: [
			{
				created_at: '2025-10-17T08:30:00.000Z',
				message: 'Consistently delivers clean, well-documented code.',
			},
			{
				created_at: '2025-10-05T13:00:00.000Z',
				message: 'Mentored junior students during peer learning sessions.',
			},
			{
				created_at: '2025-09-22T16:45:00.000Z',
				message: 'Led the team project with excellent communication.',
			},
		],
		tutorsFeedback: {
			'Ignacio Capenziani': {
				created_at: '2025-10-10T09:00:00.000Z',
				professional_score: 'Excellent',
				technical_score: 'Good',
			},
			'Javier Valezzolo': {
				created_at: '2025-09-30T15:30:00.000Z',
				professional_score: 'Poor',
				technical_score: 'Poor',
			},
		},
	},
	{
		id: '4',
		firstName: 'Carlos',
		lastName: 'Mendez',
		email: 'carlos.mendez@holberton.com',
		avatarUrl: 'https://i.pravatar.cc/150?img=13',
		cohort: 'C23',
		techStack: ['Java', 'Spring Boot', 'Kubernetes', 'MySQL'],
		githubUrl: '',
		linkedinUrl: 'https://linkedin.com/in/carlosmendez',
		updatedAt: 'Oct 20, 2025',
		annotations: [],
		tutorsFeedback: {
			'Javier Valezzolo': {
				created_at: '2025-10-18T11:15:00.000Z',
				professional_score: 'Poor',
				technical_score: 'Poor',
			},
		},
	},
	{
		id: '5',
		firstName: 'Emma',
		lastName: 'Thompson',
		email: 'emma.thompson@holberton.com',
		avatarUrl: 'https://i.pravatar.cc/150?img=9',
		cohort: 'C22',
		techStack: ['TypeScript', 'Angular', 'Firebase', 'GraphQL'],
		githubUrl: 'https://github.com/emmathompson',
		linkedinUrl: 'https://linkedin.com/in/emmathompson',
		updatedAt: 'Oct 16, 2025',
		annotations: [
			{
				created_at: '2025-10-16T10:20:00.000Z',
				message: 'Exceptional attention to detail in UI/UX implementation.',
			},
		],
		tutorsFeedback: {
			'Javier Valezzolo': {
				created_at: '2025-10-08T13:45:00.000Z',
				professional_score: 'Poor',
				technical_score: 'Average',
			},
			'Pagarico Fedenini': {
				created_at: '2025-09-25T09:30:00.000Z',
				professional_score: 'Poor',
				technical_score: 'Poor',
			},
		},
	},
	{
		id: '6',
		firstName: 'Raj',
		lastName: 'Patel',
		email: 'raj.patel@holberton.com',
		avatarUrl: 'https://i.pravatar.cc/150?img=15',
		cohort: 'C23',
		techStack: ['Go', 'gRPC', 'Docker', 'Terraform'],
		githubUrl: 'https://github.com/rajpatel',
		linkedinUrl: '',
		updatedAt: 'Oct 19, 2025',
		annotations: [
			{
				created_at: '2025-10-19T15:00:00.000Z',
				message: 'Strong understanding of microservices architecture.',
			},
			{
				created_at: '2025-10-12T11:30:00.000Z',
				message: 'Always willing to help teammates debug issues.',
			},
		],
		tutorsFeedback: {
			'Pagarico Fedenini': {
				created_at: '2025-10-14T16:20:00.000Z',
				professional_score: 'Good',
				technical_score: 'Excellent',
			},
		},
	},
	{
		id: '7',
		firstName: 'Sofia',
		lastName: 'Garcia',
		email: 'sofia.garcia@holberton.com',
		avatarUrl: '',
		cohort: 'C22',
		techStack: ['Ruby', 'Rails', 'PostgreSQL', 'Heroku'],
		githubUrl: '',
		linkedinUrl: 'https://linkedin.com/in/sofiagarcia',
		updatedAt: 'Oct 15, 2025',
		annotations: [
			{
				created_at: '2025-10-15T09:45:00.000Z',
				message: 'Demonstrated strong test-driven development practices.',
			},
		],
		tutorsFeedback: {
			'Pagarico Fedenini': {
				created_at: '2025-10-09T12:00:00.000Z',
				professional_score: 'Excellent',
				technical_score: 'Good',
			},
			'Ignacio Capenziani': {
				created_at: '2025-09-27T14:30:00.000Z',
				professional_score: 'Good',
				technical_score: 'Excellent',
			},
		},
	},
	{
		id: '8',
		firstName: 'Kwame',
		lastName: 'Mensah',
		email: 'kwame.mensah@holberton.com',
		avatarUrl: 'https://i.pravatar.cc/150?img=14',
		cohort: 'C23',
		techStack: ['C', 'Linux', 'Bash', 'Git'],
		githubUrl: 'https://github.com/kwamemensah',
		linkedinUrl: 'https://linkedin.com/in/kwamemensah',
		updatedAt: 'Oct 18, 2025',
		annotations: [
			{
				created_at: '2025-10-18T13:15:00.000Z',
				message: 'Deep understanding of low-level programming concepts.',
			},
			{
				created_at: '2025-10-07T10:00:00.000Z',
				message: 'Contributed to open source project during cohort.',
			},
		],
		tutorsFeedback: {
			'Pagarico Fedenini': {
				created_at: '2025-10-11T15:45:00.000Z',
				professional_score: 'Good',
				technical_score: 'Poor',
			},
		},
	},
	{
		id: '9',
		firstName: 'Lily',
		lastName: 'Zhang',
		email: 'lily.zhang@holberton.com',
		avatarUrl: 'https://i.pravatar.cc/150?img=47',
		cohort: 'C22',
		techStack: ['React', 'Next.js', 'Tailwind', 'Vercel'],
		githubUrl: 'https://github.com/lilyzhang',
		linkedinUrl: 'https://linkedin.com/in/lilyzhang',
		updatedAt: 'Oct 20, 2025',
		annotations: [
			{
				created_at: '2025-10-20T08:00:00.000Z',
				message: 'Creates beautiful, responsive user interfaces.',
			},
		],
		tutorsFeedback: {
			'Pagarico Fedenini': {
				created_at: '2025-10-16T10:30:00.000Z',
				professional_score: 'Good',
				technical_score: 'Excellent',
			},
			'Javier Cappenziani': {
				created_at: '2025-10-02T13:20:00.000Z',
				professional_score: 'Excellent',
				technical_score: 'Excellent',
			},
		},
	},
	{
		id: '10',
		firstName: 'Ahmed',
		lastName: 'Hassan',
		email: 'ahmed.hassan@holberton.com',
		avatarUrl: 'https://i.pravatar.cc/150?img=11',
		cohort: 'C23',
		techStack: ['PHP', 'Laravel', 'MySQL', 'Apache'],
		githubUrl: 'https://github.com/ahmedhassan',
		linkedinUrl: 'https://linkedin.com/in/ahmedhassan',
		updatedAt: 'Oct 17, 2025',
		annotations: [
			{
				created_at: '2025-10-17T14:45:00.000Z',
				message: 'Reliable team member, always meets deadlines.',
			},
			{
				created_at: '2025-10-08T09:30:00.000Z',
				message: 'Good understanding of security best practices.',
			},
		],
		tutorsFeedback: {
			'Pagarico Fedenini': {
				created_at: '2025-10-13T11:00:00.000Z',
				professional_score: 'Good',
				technical_score: 'Good',
			},
		},
	},
	{
		id: '11',
		firstName: 'Gabriel',
		lastName: 'San',
		email: 'elmascapo@holberton.com',
		avatarUrl: 'https://ca.slack-edge.com/T0423U1MW21-U08BFD05VD1-23499eb54714-512',
		cohort: 'C26',
		techStack: ['Svelte', 'Tailwind', 'Vercel'],
		githubUrl: 'https://github.com/glovek08',
		linkedinUrl: '',
		updatedAt: '0420-10-20T08:00:00.000Z',
		annotations: [
			{
				created_at: '2025-10-20T08:00:00.000Z',
				message: 'Incredible! The Goat!',
			},
		],
		tutorsFeedback: {
			'Pagarico Fedenini': {
				created_at: '2025-10-16T10:30:00.000Z',
				professional_score: 'Poor',
				technical_score: 'Average',
			},
			'Bill Gates': {
				created_at: '2025-10-02T13:20:00.000Z',
				professional_score: 'Impressious',
				technical_score: 'Magnificus',
			},
		},
	},
];