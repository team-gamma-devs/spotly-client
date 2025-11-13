# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Commands

Use `pnpm` for all package management.

- **`pnpm install`**: Install dependencies.
- **`pnpm dev`**: Start the development server with hot module replacement.
- **`pnpm build`**: Create a production-ready build of the application.
- **`pnpm check`**: Run static type analysis using the TypeScript compiler.
- **`pnpm lint`**: Check for code style issues using ESLint and Prettier.
- **`pnpm test`**: Run all tests using Vitest.
- **`pnpm test <test-file-path>`**: Run tests in a specific file.

## Architecture

This is a SvelteKit application using TypeScript.

- **Routing**: File-based routing is used. All routes are in `src/routes`.
    - Public routes are in `src/routes/(group)`.
    - Protected routes requiring authentication are in `src/routes/(app)`.
    - API endpoints are defined in `+server.ts` files.
- **Components**: Reusable UI components are located in `src/lib/components`.
- **Services**: Business logic is encapsulated in services found in `src/lib/services`. These handle tasks like API communication and browser storage.
- **Server-side Logic**: Code that should only run on the server is in `src/lib/server`. This includes sensitive logic and direct database access.
- **State Management**: Application-wide state is managed with Svelte stores in `src/lib/stores`.
- **Styling**: TailwindCSS is used for styling, with configuration in `tailwind.config.js`.

## Documentation

- [SvelteKit](https://svelte.dev/docs/kit)
- [Flowbite Svelte](https://flowbite-svelte.com/docs)
- [TailwindCSS](https://tailwindcss.com/docs/)

## Enforce These Rules

- Must use Svelte 5 syntax.
- Avoid deprecated syntax like: `$: doubled = count * 2;`, this is the modern (Svelte 5) syntax: `let doubled = $derived(count * 2);`.
- Components come from `flowbite-svelte`.
- Use icons from `flowbite-svelte-icons`.
- Strict CORS configuration.
- Wrap debug code in `if (dev){/*Debug code*/}`, `dev` comes from `$app/environment` and is automatically `null` in production.
- Resort to back-end (Sveltekit Server) as source of truth.
- `{BACKEND_URL}` already contains `/v1/`.
- Avoid using `$effect` for non-related purposes.
