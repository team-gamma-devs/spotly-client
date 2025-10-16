# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.
To help catch bugs-predeployment. Pre-bundle the routine Catch'em All!

## Development Commands

The client package lives in `client/`. All commands should be run from the `client/` directory. The recommended package manager is `pnpm`.

- **Install dependencies**: `pnpm install`
- **Run development server**: `pnpm run dev`
- **Build for production**: `pnpm run build`
- **Preview production build**: `pnpm run preview`
- **Run linters and type checkers**: `pnpm run check`
- **Run unit tests**: `pnpm run test:unit`
- **Run component tests**: `pnpm run test:component`
- **Run E2E tests**: `pnpm run test:e2e`
- **Run all tests**: `pnpm run test:all`

## Code Architecture

The repository contains a SvelteKit application in the `client/` directory.

- **Routing**: SvelteKit's file-based routing is used. Routes are in `client/src/routes/`. Route groups are used to distinguish between public and protected routes.
- **Components**: Reusable UI components are located in `client/src/lib/components/` and are grouped by their functional area (e.g., `main`, `manager`, `graduate`).
- **Services**: Client-side logic, such as API wrappers and browser storage management, is in `client/src/lib/services/`.
- **Server-Side Code**: All backend-only code, including secret management and database interactions, is kept in `client/src/lib/server/` to prevent it from being bundled with the client application.
- **State Management**: Svelte stores are used for reactive state management and are located in `client/src/lib/stores/`.
- **Authentication**: Authentication is handled by a custom `AuthBox.svelte` component that conditionally renders content based on the user's authentication state. The authentication flow involves signed requests between the frontend and a backend service. All routes under `/app/` are protected.
