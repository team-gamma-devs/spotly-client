# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

![Svelte](https://img.shields.io/badge/Svelte-5.39.6-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.13-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-10.17.1-F69220?style=for-the-badge&logo=pnpm&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![SvelteKit](https://img.shields.io/badge/SvelteKit-2.43.5-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)
![Flowbite](https://img.shields.io/badge/Flowbite-3.1.2-1C64F2?style=for-the-badge&logo=flowbite&logoColor=white)

## Developing

Once you've created a project and installed dependencies with `pnpm install`, start a development server:

```sh
pnpm dev
```

### TailwindCSS

If you're using VSCode, you might want to associate CSS files as TailwindCSS, for this create or add this to `.vscode/settings.json`:

```json
{
	"files.associations": {
		"*.css": "tailwindcss",
		"tailwind.config.js": "javascript",
		"tailwind.config.ts": "typescript"
	},
	"tailwindCSS.includeLanguages": {
		"svelte": "html",
		"html": "html",
		"css": "css",
		"scss": "css"
	},
	"tailwindCSS.experimental.configFile": "client/tailwind.config.js",
	"tailwindCSS.rootFontSize": 16,
	"tailwindCSS.validate": true,
	"tailwindCSS.lint.cssConflict": "warning",
	"tailwindCSS.lint.invalidApply": "error",
	"tailwindCSS.lint.invalidScreen": "error",
	"tailwindCSS.lint.invalidVariant": "error",
	"tailwindCSS.lint.invalidConfigPath": "error",
	"tailwindCSS.lint.invalidTailwindDirective": "error",
	"tailwindCSS.lint.recommendedVariantOrder": "warning",
	"css.validate": false,
	"scss.validate": false
}
```

## Building

To create a production version of your app:

```sh
pnpm run build
```

or preview:

```sh
pnpm run preview
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
