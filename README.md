# Spotly — Client

![Node.js](https://img.shields.io/badge/Node.js%2022-2f7d32?style=for-the-badge&logo=node.js&logoColor=ffffff&labelColor=1f1f1f)
![Svelte](https://img.shields.io/badge/Svelte%205.39.6-C24B0C?style=for-the-badge&logo=svelte&logoColor=ffffff&labelColor=1f1f1f)
![SvelteKit](https://img.shields.io/badge/SvelteKit%202.43.5-C24B0C?style=for-the-badge&logo=svelte&logoColor=ffffff&labelColor=1f1f1f)
![Vite](https://img.shields.io/badge/Vite%207.1.7-4f56d9?style=for-the-badge&logo=vite&logoColor=ffffff&labelColor=1f1f1f)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS%203.4.14-0f7b9e?style=for-the-badge&logo=tailwindcss&logoColor=ffffff&labelColor=1f1f1f)
![Flowbite Svelte](https://img.shields.io/badge/Flowbite%20Svelte%201.16-AB422B?style=for-the-badge&logo=circle&logoColor=ffffff&labelColor=1f1f1f)
![pnpm](https://img.shields.io/badge/pnpm%2010.18.0-3088d8?style=for-the-badge&logo=pnpm&logoColor=ffffff&labelColor=1f1f1f)

![Claude](https://img.shields.io/badge/Claude%204.5%20Haiku-85470D?style=for-the-badge&logo=anthropic&logoColor=ffffff&labelColor=1f1f1f)
![Warp](https://img.shields.io/badge/Warp%20Code%20Review-0D3F85?style=for-the-badge&logo=warp&logoColor=ffffff&labelColor=1f1f1f)
![Vercel](https://img.shields.io/badge/Vercel-Stable-4B8A11?style=for-the-badge&logo=vercel&logoColor=ffffff&labelColor=1f1f1f)




## Quick local setup

I'm assuming you're running a Debian-based distro. I ***Will not** give detailed instructions for Windows/MacOS users. Check official documentation.

### Prerequisites

1. **Install pnpm** (if not already installed):
   ```bash
   npm install -g pnpm
   ```
   
   <details>
   <summary>Other platforms</summary>
   
   - **Windows**: `Invoke-WebRequest https://get.pnpm.io/install.ps1 -UseBasicParsing | Invoke-Expression`
   - **macOS/Other Linux**: `brew install pnpm`
   </details>
<br>

2. **Install nvm** (Node Version Manager):
   
   **Ubuntu/Linux:**
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
   # Restart your terminal or run:
   source ~/.bashrc
   ```
   
   <details>
   <summary>Other platforms</summary>
   - **Windows**: Download and install [nvm-windows](https://github.com/coreybutler/nvm-windows/releases)
   - **macOS**: Same as Linux (use the curl command above)
  
      **Note** For Macs with the Apple Silicon chip, node started offering arm64 arch Darwin packages since v16.0.0 and experimental arm64 support when compiling from source since v14.17.0. If you are facing issues installing node using nvm, you may want to update to one of those versions or later.
   </details>
<br>

3. **Install and use Node 22**:
   ```bash
   nvm install 22
   nvm use 22
   ```

4. **Run Vite Server**:
    ```bash
    # from repo root
    cd client

    # install dependencies
    pnpm install

    # start dev server
    pnpm run dev
    ```

## Environment Variables

### Required (Server-side)
- `BACKEND_URL` - Backend API base URL
- `BACKEND_SECRET` - Shared secret for HMAC request signing

### Required (Client-side)
- `PUBLIC_API_URL` - Public-facing API URL (optional if using relative paths)

### Optional
- `NODE_ENV` - Environment (development/production)

Create a `.env` file in the `client/` directory:
```env
BACKEND_URL=http://localhost:8000
BACKEND_SECRET=your-secret-here
```

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

<br>

## Common Problems I've encountered

### "Cannot read properties of undefined (reading 'src')"
- **Cause**: `enhanced:img` receiving undefined src in SSR
- **Fix**: Use regular `<img>` with fallback or ensure src is always defined

### Session not persisting
- **Cause**: Cookie not being set with correct attributes
- **Fix**: Check `cookies.set()` includes `path: '/', httpOnly: true, secure: true`

### Violating node ( ͡° ͜ʖ ͡°): Incorrect use of `<label for=FORM_ELEMENT>`

- **Cause**: I don't know.
- **Fix**: Ignore/Hide issues like this, doesn't appear to cause problems.

## Testing

**QA Engineer** Mr. Martin Marrero Will provide extensive documentation on testing.


# Project architecture — useful files & folders

### Note:
During the development and as I became more comfortable working with SvelteKit (and most importantly, as I started to understand stuff better), I found better ways to do things, so you'll find garbage code everywhere and very confusing stuff, and I'm sorry for that, every backend request needs to be moved to strict server-side, some components are Jesus and they have some savage prop drilling, I'm aware there's a mess of client and server-side functions. So bear with me... If I find the time, I will refactor this shit.

<strong>Overview</strong>: the repo is split into a small repo root and a client app. The client is a SvelteKit app located in the `client/` folder. The structure below reflects the recommended places for components, services, server-only code and routes.

<strong>Purpose</strong>: keep components grouped by UI scope/role so ownership, reuse and styling boundaries are clear. I don't know if this is meta in front-end development, I use it because it's starting to become a mess.

- client/
  - src/
    - routes/                      — SvelteKit routes. Use route groups for public vs protected:
      - +layout.svelte             — global shell (site background, head, public layout)
      - welcome/+page.svelte       — public landing page showcasing app features
      - login/+page.svelte         — public login
      - app/
        - +layout.svelte           — protected app area; contains AuthBox to protect `/app/**`
        - manager/                 — manager-only routes
          - +layout.svelte         — manager layout wrapper
          - status/+page.svelte    — manager dashboard with graduate cards
          - api/                   — manager-specific API routes (server-side only)
            - graduate-invitations/+server.ts  — fetch invitation data
            - upload-csv/+server.ts            — handle bulk CSV uploads
        - graduate/                — graduate-only routes
          - +page.svelte           — graduate dashboard
          - +page.server.ts        — loads full user data via internal API
          - github/                — GitHub OAuth flow
            - authorize/+server.ts — initiates GitHub OAuth
            - callback/+server.ts  — handles OAuth callback
            - result/+page.svelte  — displays OAuth result
          - api/                   — graduate-specific API routes (server-side only)
            - full-user/+server.ts — fetches full user data from backend
    - lib/
      - components/                — UI components grouped by scope:
        - main/                    — Header, Footer, shared UI for general users
          - utils/                 — GenericBoxVisible, GenericBoxInvisible, AuthBox
        - manager/                 — manager-only components
          - GraduateCard.svelte    — displays individual graduate data
          - GraduateStatusTable.svelte  — table view of all graduates
          - utils/                 — AvailableTagsBox, SelectedTagsBox, UploadCSV
        - graduate/                — graduate-only components
          - GraduateDashboard.svelte    — main graduate profile view
        - error/                   — Unauthorized, NotFound, ErrorCard
      - stores/                    — Svelte stores (pure reactive state used by the UI)
      - services/                  — client-side helpers (API wrappers, localStorage, theme)
      - server/                    — server-only helpers (token verification, request signing) — NOT bundled to client
        - authFetch.ts             — signedJsonFetch, signedGetFetch, signedMultipartFetch
      - types/                     — TypeScript type definitions
        - userFull.ts              — UserState, CVInfo, GitHubInfo types
      - constants/                 — small shared constants (e.g. publicRoutes, filterTags)
      - mocks/                     — mock data for development (mockUserState, mockUserMe)
    - app.css                      — base global CSS and Tailwind utilities
  - static/                        — publicly served assets (images, fonts, icons)
    - lottie/                      — Lottie animation files for landing page
  - package.json                   — client scripts (dev/build/preview) and engines
  - .nvmrc                         — Node version hint for developers

Key patterns
- Separation: put server-only code (secrets, DB, token validation) under `src/lib/server` so it cannot accidentally be shipped to the browser.
- API Routes: Use `+server.ts` files for internal API endpoints that handle backend communication. These act as a BFF (Backend-for-Frontend) layer.
- Services vs Stores:
  - services/* — side-effectful logic and API wrappers (safe to import on client).
  - stores/* — tiny reactive stores that import services to perform initialization.
- Route protection:
  - Wrap protected routes with `AuthBox` in layouts (e.g., `app/+layout.svelte`, `app/manager/+layout.svelte`).
  - Keep public pages (e.g. `/login`, `/welcome`) outside the `/app` directory.
- Component scope: group components by role/scope (main, manager, graduate) to reduce cross-role coupling.
- Barrel files: use `index.ts` inside scope folders to export the public surface (`import { Sidebar } from '$lib/components/manager'`).
- Request signing: All backend communication uses `signedJsonFetch`, `signedGetFetch`, or `signedMultipartFetch` from `authFetch.ts` to add HMAC-SHA256 signatures.

## Authentication Flow

The application uses a two-stage authentication process involving a magic link for login and a JWT for managing user sessions. All communication with the backend is secured using HMAC-SHA256 request signatures.

### 1. Login & User Identification

This flow handles both new and returning users.

```
[Login Page] --(email)--> [+page.server.ts Action] --(signed req)--> [Backend API /auth/login]
```

**Flow Details:**
1.  **Form Submission**: A user submits their email on the `/login` page.
2.  **Server Action**: The `login/+page.server.ts` action receives the email.
3.  **Backend Call**: The action sends a signed request to the backend's `/auth/login` endpoint.
4.  **Backend Logic**: The backend checks the email.
    *   **New User**: If the email is not recognized, the backend generates a temporary `signup_token`, and responds with `{ "isFirstTime": true, "signup_token": "..." }`.
    *   **Returning User**: If the email is recognized, the backend generates a standard JSON Web Token (JWT) and responds with `{ "isFirstTime": false, "access_token": "..." }`.
5.  **Frontend Redirect**:
    *   **New User**: The SvelteKit action redirects the user to the signup page (`/app/graduate/upload_cv?token=...`), passing the temporary `signup_token`. **No session cookie is set at this stage.**
    *   **Returning User**: The action sets the JWT in a secure, `HttpOnly` cookie named `spotly_session` and redirects the user to their dashboard (`/app/graduate`).

### 2. Signup Completion (New Users)

This flow completes the registration for new users after they follow the magic link.

```
[Upload CV Page] --(files, token)--> [+page.server.ts Action] --(signed req)--> [Backend API /signup]
```

**Flow Details:**
1.  **Form Submission**: The new user, now on the `/app/graduate/upload_cv` page, submits their CVs. The form includes the `signup_token` from the URL.
2.  **Server Action**: The `upload_cv/+page.server.ts` action receives the files and the `signup_token`.
3.  **Backend Call**: The action sends a signed multipart request to the backend's `/signup` endpoint, passing the `signup_token` in the URL.
4.  **Backend Logic**: The backend validates the `signup_token`, creates the user account, saves the files, and generates a final JWT. It responds with `{ "access_token": "..." }`.
5.  **Session Creation**: The SvelteKit action receives the JWT and sets the `spotly_session` cookie, officially logging the user in.

### 3. Authenticated Session Management

This flow runs on every server-side navigation for a logged-in user.

```
[Browser Request] --(cookie)--> [hooks.server.ts] --(signed req, JWT)--> [Backend API /auth/me]
```

**Flow Details:**
1.  **Request Interception**: The `hooks.server.ts` file intercepts every incoming request.
2.  **Cookie Check**: It reads the `spotly_session` cookie. If it doesn't exist, the user is considered logged out.
3.  **Token Validation**: If the cookie exists, the hook sends a signed request to the backend's `/auth/me` endpoint, passing the JWT as a `Bearer` token.
4.  **User Hydration**: If the backend confirms the JWT is valid, it returns the user's data. The hook then populates `event.locals.user` with this data, making it available to all server `load` functions and actions for that request.

### 4. Logout

```
[Logout Button] --(POST)--> [/logout Endpoint]
```

**Flow Details:**
1.  **POST Request**: The user clicks a logout button, which submits a form via POST to the `/logout` server endpoint.
2.  **Cookie Deletion**: The `/logout/+server.ts` endpoint deletes the `spotly_session` cookie.
3.  **Redirect**: The user is redirected to the homepage (`/`). The `hooks.server.ts` file will now treat them as a logged-out user on all subsequent requests.


## Server-Side Fetch Utilities (`authFetch.ts`)

All server-to-backend communication is handled by a set of specialized fetch wrappers located in `src/lib/server/authFetch.ts`. These functions ensure that every request sent to the backend API is correctly signed according to the project's security protocol.

### Core Signing Logic

The base utility, `signRequest`, generates an HMAC-SHA256 signature from a payload and a timestamp using a shared `BACKEND_SECRET`. The message format for the signature is `timestamp:payload`.

### `signedJsonFetch`

This is the standard fetch utility for all API calls that send and receive JSON data.

-   **Use Case**: Logging in, fetching user data, submitting simple forms.
-   **How it Works**:
    1.  Automatically stringifies the request `body` to create the signature payload.
    2.  Generates the signature and timestamp.
    3.  Adds the `Content-Type: application/json`, `X-Signature`, and `X-Timestamp` headers to the request.

**Example Usage (from `login/+page.server.ts`):**
```typescript
import { signedJsonFetch } from '$lib/server/authFetch';

const body = { email: 'user@example.com' };
const response = await signedJsonFetch(`${BACKEND_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(body)
});
```

### `signedMultipartFetch`

This is a specialized fetch utility designed exclusively for file uploads (`multipart/form-data`).

-   **Use Case**: Uploading user CVs during the signup process.
-   **How it Works**:
    1.  Generates the signature using an **empty string** as the payload. This is necessary because a `FormData` object cannot be read and stringified on the server. The backend must also expect an empty payload when validating a multipart request.
    2.  Crucially, it **omits** the `Content-Type` header. This allows the `fetch` API to automatically set the correct `multipart/form-data` header with the required `boundary` string.

**Example Usage (from `upload_cv/+page.server.ts`):**
```typescript
import { signedMultipartFetch } from '$lib/server/authFetch';

// `formData` is the FormData object from the request
const response = await signedMultipartFetch(
    `${BACKEND_URL}/signup`,
    {
        method: 'POST',
        body: formData 
    }
);
```

## AuthBox — usage & SSR notes

AuthBox is a tiny reusable wrapper that chooses what to render depending on the user's authentication status and role, derived from SvelteKit's `$page` store. It uses Svelte 5 snippets via `@render` so you can pass renderable content from the caller.

This document explains:
- how the current AuthBox API works
- examples for simple and role-based authorization
- how the component behaves in different states


## AuthBox API (current implementation)
AuthBox expects the following props:

- `authorizedContent` (required, Snippet): Rendered when the user is fully authorized (logged in and, if required, has the correct role).
- `unauthorizedContent` (optional, Snippet): Rendered when the user is logged out. If not provided, nothing is rendered for logged-out users.
- `requiredRole` (optional, `'manager' | 'graduate'`): Specifies the role a user must have. If provided, the user must be logged in AND have this role to be authorized.


## Simple Usage (Logged-in vs. Logged-out)

This example shows or hides content based only on whether a user is logged in, without checking for a specific role.

```svelte
<script>
  import AuthBox from '$lib/components/main/utils/AuthBox.svelte';
</script>

<AuthBox>
  {#snippet authorizedContent()}
    <!-- This UI is shown to ANY logged-in user -->
    <a href="/app/dashboard" class="btn">Dashboard</a>
  {/snippet}

  {#snippet unauthorizedContent()}
    <!-- This UI is shown to logged-out users -->
    <a href="/login" class="btn">Sign In</a>
  {/snippet}
</AuthBox>
```

## Role-Based Authorization

To protect content for a specific role, pass the `requiredRole` prop. The component handles the logic internally.

**Behavior:**
1.  If the user has the `manager` role, `authorizedContent` is rendered.
2.  If the user is logged in but has a different role (e.g., `graduate`), the component automatically renders a built-in `<Unauthorized />` error page.
3.  If the user is logged out, `unauthorizedContent` is rendered.

```svelte
<script>
  import AuthBox from '$lib/components/main/utils/AuthBox.svelte';
  import ManagerDashboard from '$lib/components/manager/ManagerDashboard.svelte';
</script>

<!-- This AuthBox protects the manager's dashboard -->
<AuthBox requiredRole={'manager'}>
  {#snippet authorizedContent()}
    <!-- This is only rendered for users with the 'manager' role -->
    <ManagerDashboard />
  {/snippet}

  {#snippet unauthorizedContent()}
    <!-- You can still provide a fallback for logged-out users -->
    <p>Please log in to access the application.</p>
  {/snippet}
</AuthBox>
```

## Notes
- **SSR Friendly**: The component relies on `$page.data.user`, which is populated by SvelteKit's server `load` functions. This ensures the correct content is rendered on the server, preventing UI flashes on the client.
- **Built-in Unauthorized UI**: When a `requiredRole` is specified and the user's role does not match, AuthBox automatically displays a generic `Unauthorized` component. You do not need to handle this case manually.
- **Flexibility**: You can pass any component or markup inside the `authorizedContent` and `unauthorizedContent` snippets.
- **Primary Use Case**: Use this component in your layout files (e.g., `src/routes/app/manager/+layout.svelte`) to protect entire sections of your application based on user roles.
