# Spotly — Client

![Svelte](https://img.shields.io/badge/Svelte-5.39.6-ff3e00?style=for-the-badge&logo=svelte)
![SvelteKit](https://img.shields.io/badge/SvelteKit-2.43.5-242424?style=for-the-badge&logo=svelte)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646cff?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/npm/v/tailwindcss?label=Tailwind%20CSS&style=for-the-badge&logo=tailwindcss)
![Flowbite Svelte](https://img.shields.io/npm/v/flowbite-svelte?style=for-the-badge&logo=flowbite)
![pnpm](https://img.shields.io/badge/pnpm-10.18.0-39a0ff?style=for-the-badge&logo=pnpm)


![Warp](https://img.shields.io/badge/Warp-Autodeployment%20Manager-1e1e3f?style=for-the-badge&logo=warp&logoColor=39a0ff)


## Quick local setup

```bash
# from repo root
cd client

# install
pnpm install

# dev
pnpm run dev
```

---

## Build & preview locally

```bash
# build
pnpm run build

# preview production build locally
pnpm run preview
# or with vercel CLI from the client folder:
vercel --cwd .            # preview (non-prod)
vercel --cwd . --prod    # production
```

Notes:
- The client package lives in `client/`. Use `--cwd client` when running Vercel CLI from repo root.
- `pnpm` is the recommended package manager for this project.

## Vercel (deploy preview & production)

Recommended Vercel settings for Git auto-deploys:
- Project Root / Root Directory: `client`
- Install Command: `pnpm install`
- Build Command: `pnpm run build`
- Output Directory: (SvelteKit handles output; no change required)

To make Vercel only auto-deploy `main` as production (prevent develop builds), add an Ignored Build Step in Vercel Git settings:

```bash
bash -lc 'if [ "$VERCEL_GIT_COMMIT_REF" != "main" ]; then exit 0; fi; exit 1'
```

Manual CLI:
- Preview deploy: `vercel --cwd client`
- Production deploy: `vercel --cwd client --prod --confirm` (or `vercel --prod --cwd client --force`)

If you prefer CI-controlled production deployments, create a Deploy Hook in Vercel for the `main` branch and trigger it from your CI pipeline.


## Cache headers (Vercel)

To keep images/fonts cached without forcing clients to reload, add a `vercel.json` with headers for:
- `/_app/immutable/*` → `public, max-age=31536000, immutable`
- `/fonts/*` → `public, max-age=31536000, immutable`
- `/images/*` → `public, max-age=604800, stale-while-revalidate=86400`

# Project architecture — useful files & folders

<strong>Overview</strong>: the repo is split into a small repo root and a client app. The client is a SvelteKit app located in the `client/` folder. The structure below reflects the recommended places for components, services, server-only code and routes.

<strong>Purpose</strong>: keep components grouped by UI scope/role so ownership, reuse and styling boundaries are clear. I don't know if this is meta in front-end development, I use it because it's starting to become a mess.

- client/
  - src/
    - routes/                — SvelteKit routes. Use route groups for public vs protected:
      - +layout.svelte       — global shell (site background, head, public layout)
      - (app)/+layout.svelte — protected app area; contains AuthBox to protect `/app/**`
      - (app)/...            — all private pages live here (e.g. `/app/manager`, `/app/graduate`)
      - login/+page.svelte   — public login
      - signup/+page.svelte  — public signup
    - lib/
      - components/          — UI components grouped by scope:
        - main/              — Header, Footer, shared UI for general users
        - manager/           — manager-only components (Sidebar, manager widgets)
        - graduate/          — graduate-only components
        - error/             — Unauthorized, NotFound, ErrorCard
        - ...each scope has a utils/ folder for small internal helpers
      - stores/              — Svelte stores (pure reactive state used by the UI)
      - services/            — client-side helpers (API wrappers, localStorage, theme)
      - server/              — server-only helpers (token verification, DB calls) — NOT bundled to client
      - constants/           — small shared constants (e.g. publicRoutes)
    - app.css                — base global CSS and Tailwind utilities
  - static/                  — publicly served assets (images, fonts, icons)
  - package.json             — client scripts (dev/build/preview) and engines
  - .nvmrc                   — Node version hint for developers

Key patterns
- Separation: put server-only code (secrets, DB, token validation) under `src/lib/server` so it cannot accidentally be shipped to the browser.
- Services vs Stores:
  - services/* — side-effectful logic and API wrappers (safe to import on client).
  - stores/* — tiny reactive stores that import services to perform initialization.
- Route groups:
  - Use a route group like `(app)` to wrap protected routes with `AuthBox` in `src/routes/(app)/+layout.svelte`.
  - Keep public pages (e.g. `/login`, `/signup`) outside that group.
- Component scope: group components by role/scope (main, manager, graduate) to reduce cross-role coupling.
- Barrel files: use `index.ts` inside scope folders to export the public surface (`import { Sidebar } from '$lib/components/manager'`).

Deployment & CI notes
- Vercel project root: `client/`. Configure environment variables in Vercel settings (PUBLIC_* for client-safe values).
- Enforce Node version for build (use `.nvmrc` and CI/Prebuild checks).

## Authentication Flow

The application uses a secure request signing mechanism to authenticate communication between the Vercel frontend and EC2 backend:

```
+page.server.ts → validates form → calls service → redirects
    ↓
lib/server/emailService.ts → makes authenticated request to backend
    ↓
EC2 backend → validates email against a control database, returns authentication status and token back to frontend server
```

**Flow Details:**
1. **Form Submission**: User submits email via login form
2. **Server Action**: `+page.server.ts` validates form data locally
3. **Service Layer**: `lib/server/emailService.ts` signs request and calls backend API
4. **Backend Validation**: EC2 backend verifies request signature and checks email against Holberton CSV
5. **Email Dispatch**: Backend sends login email if validation passes
6. **Client Redirect**: Frontend redirects user to next step on success

All backend requests use HMAC-SHA256 signatures with shared secrets to ensure only the frontend can make authenticated calls.

## Build & preview locally

```bash
# build
pnpm run build

# preview production build locally
pnpm run preview
# or with vercel CLI from the client folder:
vercel --cwd .            # preview (non-prod)
vercel --cwd . --prod    # production
```

Notes:
- The client package lives in `client/`. Use `--cwd client` when running Vercel CLI from repo root.
- `pnpm` is the recommended package manager for this project.

# AuthBox — usage & SSR notes

AuthBox is a tiny reusable wrapper that chooses what to render depending on the auth store (`$isAuth`). It uses Svelte 5 snippets via `@render` so you can pass renderable snippets from the caller.

This document explains:
- how the current AuthBox API works
- examples to reuse it to render an error component
- SSR considerations and a safe pattern

---

## AuthBox API (current implementation)
AuthBox expects two snippet props provided via the Svelte 5 snippet syntax:

- `authorizedContent` — snippet rendered when `$isAuth` is true
- `unauthorizedContent` — snippet rendered when `$isAuth` is false

---

## Simple usage example (render an error component)

1. Import the error component in the parent and pass snippets:

```svelte
<script>
  import AuthBox from '$lib/components/AuthBox.svelte';
  import Unauthorized from '$lib/components/error/Unauthorized.svelte';
</script>

<AuthBox>
  {#snippet authorizedContent()}
    <div class="flex items-center gap-2">
      <!-- authenticated UI -->
      <a href="/dashboard" class="btn">Dashboard</a>
    </div>
  {/snippet}

  {#snippet unauthorizedContent()}
    <!-- simply render the Unauthorized component -->
    <Unauthorized />
  {/snippet}
</AuthBox>
```

This will server-render the snippet where possible and hydrate on the client.

## Alternative: named-slot pattern
If you prefer slots instead of snippet props, refactor AuthBox to use named slots:

AuthBox.svelte:
```svelte
<script>
  import { isAuth } from '$lib/stores/auth';
</script>

{#if $isAuth}
  <slot name="authorized" />
{:else}
  <slot name="unauthorized" />
{/if}
```

Usage:
```svelte
<AuthBox>
  <div slot="authorized">...</div>
  <Unauthorized slot="unauthorized" />
</AuthBox>
```

- This renders the unauthenticated fallback on the server and only switches to authenticated UI on the client after hydration (no SSR mismatch warnings).
- If you can derive auth state on the server (via cookies/session in your load function), pass that as initial data and hydrate the store accordingly to enable true SSR rendering of the correct snippet.

## Reusing to render any component (error, UI, loaders)
You can pass any component or markup inside the snippet. Examples:
- render `Unauthorized` or `ErrorCard`
- render a compact avatar + dropdown
- render a loader while client verifies auth

Example showing an error with props:
```svelte
{#snippet unauthorizedContent()}
  <Unauthorized message="Please sign in to continue" showLoginLink={true} />
{/snippet}
```

## Notes
- Prefer snippet props when you want the caller to fully control rendering.
- Use the slot pattern if you want a simpler component API and slot composition.
- When possible, detect auth during SSR (load function) and set the store, so initial HTML matches the client.
- For transient checks (tokens in localStorage), gate auth-only UI behind `browser` or `onMount`.
- All routes under `/app/` are protected by the AuthBox.

