// This must be validated with a database call, needs to store all available tags from graduates.
// If the tag is not available in the graduate pool, it must not store it.
// In theory it should hold a huge ammount of data cause:
// -A: The graduate pool will not exceen 10.000.
// -B: Since they're graduates, chances of knowing a huge range of technolgies are low.
// React, TypeScript, Angular or MongoDB will be the majority.

export type FilterTag = {
	code: string; // The tag's key (react, typescript)
	name: string; // To display on html.
	color: string; // Tailwind variable title. (--color-react, --color-)
};

export const availableFilterTags: FilterTag[] = [
	{ code: 'react', name: 'React', color: 'react' },
	{ code: 'typescript', name: 'TypeScript', color: 'typescript' },
	{ code: 'angular', name: 'Angular', color: 'angular' },
	{ code: 'mongodb', name: 'MongoDB', color: 'mongodb' },
	{ code: 'python', name: 'Python', color: 'python' },
	{ code: 'svelte', name: 'Svelte', color: 'svelte' },
	{ code: 'vue', name: 'Vue.js', color: 'vue' },
	{ code: 'node', name: 'Node.js', color: 'node' },
	{ code: 'fastapi', name: 'FastAPI', color: 'fastapi' },
	{ code: 'ruby', name: 'Ruby', color: 'ruby' },
];
