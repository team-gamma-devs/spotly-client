# Spotly — Client

![Svelte](https://img.shields.io/badge/Svelte-5.39.6-ff3e00?style=for-the-badge&logo=svelte)
![SvelteKit](https://img.shields.io/badge/SvelteKit-2.43.5-242424?style=for-the-badge&logo=svelte)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646cff?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/npm/v/tailwindcss?label=Tailwind%20CSS&style=for-the-badge&logo=tailwindcss)
![Flowbite Svelte](https://img.shields.io/npm/v/flowbite-svelte?style=for-the-badge&logo=flowbite)
![pnpm](https://img.shields.io/badge/pnpm-locked-39a0ff?style=for-the-badge&logo=pnpm)

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



# Components — structure & rules

Purpose: keep components grouped by UI scope/role so ownership, reuse and styling boundaries are clear. I don't know if this is meta in front-end development, I use it because it's starting to become a mess.

Top-level location
- src/lib/components/

Directory rules (By Scope)
- main/ — components used by the public/main UI (Header, Footer, general shared UI for most users).
- manager/ — components specific to the manager role (Sidebar, ManagerDashboard widgets, manager-only controls).
- error/ — error and status UIs (Unauthorized, NotFound, ErrorCard).

Each scope folder
- MUST contain a utils/ folder for small helper components used only inside that scope.
  - Example: src/lib/components/manager/utils/FilterBox.svelte is a helper for manager Sidebar filters.
- SHOULD include an index.ts that re-exports the scope's public components (optional but recommended).

Naming & conventions
- Component files: PascalCase.svelte (e.g. Header.svelte, Sidebar.svelte, Unauthorized.svelte).
- Small helpers in utils: PascalCase.svelte as well (e.g. FilterBox.svelte).
- Stores & helpers: keep under src/lib/stores/ or src/lib/utils/ (not inside scope utils unless truly scope-specific).
- Keep each component focused (1 responsibility) and keep presentational logic in the component; move complex logic into stores/services.

Import examples
- Scoped component:
  import Header from '$lib/components/main/Header.svelte'
- Scoped util:
  import FilterBox from '$lib/components/manager/utils/FilterBox.svelte'
- Re-exported (if you add index.ts):
  import { Sidebar } from '$lib/components/manager'

Layout & ownership notes
- Use scope boundaries to avoid leaking role-specific CSS and logic to other areas.
- Utilities in manager/utils are allowed to import other manager components, but should not import main components.

Best practices
- Prefer named exports via index.ts for public components of a scope.
- Limit the depth of imports in pages — use the scope public surface when possible.
- Add a short header comment in utility components explaining where they’re used.
- Add accessibility and sizing helpers (e.g. .reserve-heading, .font-swap) as global utilities (app.css) rather than per-scope.

Example tree (minimal)
- src/lib/components/
  - main/
    - Header.svelte
    - Footer.svelte
    - index.ts
    - utils/
      - Logo.svelte
  - manager/
    - Sidebar.svelte
    - ManagerCard.svelte
    - index.ts
    - utils/
      - FilterBox.svelte
      - Badge.svelte
  - error/
    - Unauthorized.svelte
    - NotFound.svelte
    - utils/
      - ErrorIcon.svelte


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


## Useful files & folders

- client/src — SvelteKit source
- client/static — static assets (images, fonts, icons)
- client/package.json — scripts (dev, build, preview)
- client/.vercel/project.json — linked Vercel project id
- client/.svelte-kit & client/output — build artifacts


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

