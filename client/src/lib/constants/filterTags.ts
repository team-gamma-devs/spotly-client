// This must be validated with a database call, needs to store all available tags from graduates.
// If the tag is not available in the graduate pool, it must not store it.
// In theory it should hold a huge ammount of data cause:
// -A: The graduate pool will not exceen 10.000.
// -B: Since they're graduates, chances of knowing a huge range of technolgies are low.
// React, TypeScript, Angular or MongoDB will be the majority.

export type FilterTag = {
    code: string, // The tag's key (react, typescript)
    title: string, // To display on html.
    color: string // Tailwind variable title. (--color-react, --color-)
}

export const availableFilterTags: FilterTag[] = [
    { code: 'react', title: 'React', color: 'react' },
    { code: 'typescript', title: 'TypeScript', color: 'typescript' },
    { code: 'angular', title: 'Angular', color: 'angular' },
    { code: 'mongodb', title: 'MongoDB', color: 'mongodb' },
    { code: 'python', title: 'Python', color: 'python' },
    { code: 'svelte', title: 'Svelte', color: 'svelte' },
    { code: 'vue', title: 'Vue.js', color: 'vue' },
    { code: 'node', title: 'Node.js', color: 'node' },
    { code: 'fastapi', title: 'FastAPI', color: 'fastapi' },
    { code: 'ruby', title: 'Ruby', color: 'ruby' }
];