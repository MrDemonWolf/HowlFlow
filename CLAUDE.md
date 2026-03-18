# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package Manager

This repo uses **Bun** (not npm/yarn). Always use `bun` or `pnpm` commands — both are available, but Bun is the primary runtime. Turborepo orchestrates tasks across workspaces.

## Common Commands

Run from the repo root unless noted:

```bash
# Development
bun dev              # All apps
bun dev:mobile       # Mobile only
bun dev:docs         # Docs only

# Builds
bun build            # All workspaces
bun ios              # Expo iOS (development variant)
bun ios:prod         # Expo iOS (production variant)
bun prebuild         # Expo native prebuild (non-destructive)
bun prebuild:clean   # Expo native prebuild (clean)

# Quality
bun typecheck        # TypeScript across all workspaces (runs turbo)
bun lint             # ESLint across all workspaces

# Single app typechecking
cd apps/mobile && bun typecheck
cd apps/docs && bun typecheck
```

There are no unit tests currently — `turbo.json` defines a `test` task but it is not wired up.

## Architecture Overview

### Monorepo Layout

```
howlflow/
├── apps/
│   ├── mobile/        # Expo React Native app (primary product)
│   └── docs/          # Fumadocs + Next.js documentation site
└── packages/
    ├── config/        # Shared TypeScript + ESLint config bases
    ├── core/          # Core business logic (framework-agnostic)
    ├── db/            # Database layer (depends on @howlflow/core)
    ├── env/           # Env variable validation via t3-env + zod
    └── ui/            # Shared React Native components + NativeWind
```

All packages export from `src/index.ts`. Internal packages are referenced as `@howlflow/*`.

### Mobile App (`apps/mobile/`)

**Stack:** Expo SDK 55 · React Native 0.83 · React 19 · Expo Router v3 (file-based routing)

**State:** Zustand v5 stores with MMKV-backed persistence (`zustand-mmkv-storage`)

**Styling:** NativeWind v5 preview (Tailwind v4). Theme is defined in `global.css` using `@theme` blocks — dark mode values are embedded directly there (not via `:root` CSS variable overrides, which don't work in NativeWind v5 / React Native). The `dark:` variant prefix is controlled via `nativewindColorScheme.set()` from `react-native-css`.

**Routing structure:**
```
src/app/
├── _layout.tsx          # Root: fonts, splash, theme, notifications
├── (tabs)/              # Main tab navigator (home, routines, timer, den, settings)
├── (onboarding)/        # Onboarding flow
└── (dev)/debug.tsx      # Dev-only debug screen
```

Path alias `@/*` maps to `./src/*` (configured in `tsconfig.json`).

**Expo config variants** (`app.config.ts`): `APP_VARIANT` env var switches between `development`, `preview`, and `production` — changes the app name suffix and bundle ID suffix.

### CI/CD

- **CI** (`.github/workflows/ci.yml`): Runs on PR/push to `main`/`develop` — installs deps and runs typecheck.
- **EAS Build** (`.github/workflows/eas-build.yml`): Triggered on push to `main` (production iOS) or `develop` (preview iOS). Requires `EXPO_TOKEN` secret.
- **Docs Deploy** (`.github/workflows/docs.yml`): Deploys to GitHub Pages on push to `main` when `docs/**` or `packages/**` change.

## Key Constraints & Gotchas

- **NativeWind v5 dark mode:** `@media (prefers-color-scheme: dark)` with `:root` overrides does NOT work. Put dark values directly in the `@theme` block in `global.css`.
- **expo-notifications:** Use `shouldShowBanner` + `shouldShowList` (not deprecated `shouldShowAlert`).
- **`@howlflow/env`** uses `t3-env` — env vars must be declared in the schema there before use anywhere in the monorepo.
- Turbo caches `build` and `typecheck` outputs. If you change a shared package, the dependent apps will be rebuilt automatically via Turbo's task graph.
