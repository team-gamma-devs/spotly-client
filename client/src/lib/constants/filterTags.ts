// This must be validated with a database call, needs to store all available tags from graduates.
// If the tag is not available in the graduate pool, it must not store it.
// In theory it should hold a huge ammount of data cause:
// -A: The graduate pool will not exceen 10.000.
// -B: Since they're graduates, chances of knowing a huge range of technolgies are low.
// React, TypeScript, Angular or MongoDB will be the majority.

export type FilterTag = {
	code: string; // The tag's key (react, typescript)
	name: string; // To display on html.
	color: string; // CSS variable name (--color-react, --color-typescript)
};

export const availableFilterTags: FilterTag[] = [
	// Frontend Frameworks & Libraries
	{ code: 'react', name: 'React', color: 'react' },
	{ code: 'vue', name: 'Vue.js', color: 'vue' },
	{ code: 'angular', name: 'Angular', color: 'angular' },
	{ code: 'svelte', name: 'Svelte', color: 'svelte' },
	{ code: 'next.js', name: 'Next.js', color: 'nextjs' },
	
	// Programming Languages
	{ code: 'javascript', name: 'JavaScript', color: 'javascript' },
	{ code: 'typescript', name: 'TypeScript', color: 'typescript' },
	{ code: 'python', name: 'Python', color: 'python' },
	{ code: 'java', name: 'Java', color: 'java' },
	{ code: 'c', name: 'C', color: 'c' },
	{ code: 'cpp', name: 'C++', color: 'cpp' },
	{ code: 'csharp', name: 'C#', color: 'csharp' },
	{ code: 'go', name: 'Go', color: 'go' },
	{ code: 'ruby', name: 'Ruby', color: 'ruby' },
	{ code: 'php', name: 'PHP', color: 'php' },
	{ code: 'rust', name: 'Rust', color: 'rust' },
	
	// Backend Frameworks
	{ code: 'node.js', name: 'Node.js', color: 'node' },
	{ code: 'express', name: 'Express', color: 'express' },
	{ code: 'django', name: 'Django', color: 'django' },
	{ code: 'fastapi', name: 'FastAPI', color: 'fastapi' },
	{ code: 'flask', name: 'Flask', color: 'flask' },
	{ code: 'spring', name: 'Spring Boot', color: 'spring' },
	{ code: 'rails', name: 'Rails', color: 'rails' },
	{ code: 'laravel', name: 'Laravel', color: 'laravel' },
	
	// Databases
	{ code: 'mongodb', name: 'MongoDB', color: 'mongodb' },
	{ code: 'postgresql', name: 'PostgreSQL', color: 'postgresql' },
	{ code: 'mysql', name: 'MySQL', color: 'mysql' },
	{ code: 'redis', name: 'Redis', color: 'redis' },
	{ code: 'firebase', name: 'Firebase', color: 'firebase' },
	
	// DevOps & Cloud
	{ code: 'docker', name: 'Docker', color: 'docker' },
	{ code: 'kubernetes', name: 'Kubernetes', color: 'kubernetes' },
	{ code: 'aws', name: 'AWS', color: 'aws' },
	{ code: 'azure', name: 'Azure', color: 'azure' },
	{ code: 'gcp', name: 'GCP', color: 'gcp' },
	{ code: 'terraform', name: 'Terraform', color: 'terraform' },
	
	// Tools & Others
	{ code: 'git', name: 'Git', color: 'git' },
	{ code: 'graphql', name: 'GraphQL', color: 'graphql' },
	{ code: 'tailwind', name: 'Tailwind CSS', color: 'tailwind' },
	{ code: 'sass', name: 'Sass', color: 'sass' },
	{ code: 'webpack', name: 'Webpack', color: 'webpack' },
	{ code: 'linux', name: 'Linux', color: 'linux' },
	{ code: 'bash', name: 'Bash', color: 'bash' },
];
