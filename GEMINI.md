# HOWLFLOW GEMINI CONTEXT

Howlflow is a gamified productivity application built on a modern TypeScript monorepo. It features a mobile application (Expo) and a documentation site (Next.js). The core concept revolves around focus sessions, task management, and routines, all tied together by a "wolf" companion that levels up and reacts to user progress.

## Project Overview

- **Architecture:** Turborepo-managed monorepo.
- **Package Manager:** Bun.
- **Mobile App (`apps/mobile`):** Built with Expo SDK 55+, React Native 0.83+, and Expo Router.
- **Docs (`apps/docs`):** Next.js documentation site.
- **Shared Packages:**
  - `packages/db`: SQLite schema and migrations (using `expo-sqlite`).
  - `packages/ui`: Shared React Native UI components with NativeWind (Tailwind).
  - `packages/core`: Core logic, theme definitions, constants, and types.
  - `packages/config` & `packages/env`: Standardized configurations and environment variable management.

## Tech Stack

- **Styling:** NativeWind (Tailwind CSS for React Native) with a custom dark-first theme.
- **State Management:** Zustand.
- **Database:** Local SQLite managed via `expo-sqlite` in the mobile app.
- **Navigation:** Expo Router (file-based).
- **Fonts:** Outfit (Variable font).

## Building and Running

### Prerequisites
- [Bun](https://bun.sh/)
- [Expo Go](https://expo.dev/expo-go) (for mobile testing) or iOS/Android Simulators.

### Commands
- `bun install`: Install all dependencies.
- `bun run dev`: Start both mobile and docs in development mode.
- `bun run dev:mobile`: Start only the Expo development server.
- `bun run ios`: Run the mobile app in the iOS simulator (requires prebuild).
- `bun run typecheck`: Run TypeScript type checking across the entire monorepo.
- `bun run lint`: Run linting across the monorepo.

## Development Conventions

### Styling & Theme
- Use **NativeWind** for styling React Native components.
- Follow the **Dark Theme** by default. Background is `#0A0E1A`, Primary is `#00D4FF`.
- Prefer using shared components from `packages/ui` (e.g., `GlassCard`, `Button`, `HFText`).

### Navigation
- Mobile navigation is file-based via `apps/mobile/src/app/`.
- Use `(tabs)` for main navigation and `(onboarding)` for new users.

### Database
- Schema is defined in `packages/db/src/schema.ts`.
- Any schema changes must be accompanied by migrations in `packages/db/src/migrations.ts`.
- The "wolf" state (level, xp, mood) is persisted in the `wolf_state` table.

### State Management
- Use **Zustand** for global client-side state (e.g., user preferences, temporary session data).
- Persistent data should reside in the SQLite database.

## Key Files & Directories

- `apps/mobile/src/app/_layout.tsx`: Root layout and theme provider.
- `packages/db/src/schema.ts`: Single source of truth for the SQLite schema.
- `packages/core/src/theme.ts`: Core theme constants.
- `packages/ui/src/`: Directory for reusable UI primitives.
