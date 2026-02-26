# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**HowlFlow** — ADHD daily companion mobile app with wolf theming. Local-first architecture with iCloud sync, zero backend, users own their data.

- **Owner:** MrDemonWolf, Inc. (Nathanial)
- **Bundle ID:** com.mrdemonwolf.howlflow
- **SKU:** MDW-HowlFlow
- **Target:** iOS App Store (public) + Mac via Catalyst (Designed for iPad)

## Monorepo Structure

This is a **Turborepo monorepo** with pnpm workspaces:

- `apps/mobile` — Expo SDK 55 + NativeWind v5 preview React Native app
- `apps/docs` — Fumadocs (Next.js) static site for marketing, Privacy Policy, ToS (deployed to `mrdemonwolf.github.io/howlflow`)

## Tech Stack

### Mobile (`apps/mobile`)
- React Native 0.83 + Expo SDK 55, TypeScript (strict)
- Expo Router (file-based routing, `src/app/` convention)
- NativeWind v5 preview for styling (Tailwind CSS v4 for RN)
- Zustand + MMKV persist middleware for state
- react-native-mmkv for local storage
- React Native Reanimated 4 for animations
- expo-haptics, expo-notifications (local only), react-native-svg
- Fonts via expo-google-fonts: Cinzel, JetBrains Mono, Montserrat, Roboto

### Docs (`apps/docs`)
- Next.js 15 + Fumadocs (static export)
- Tailwind CSS v4
- Deployed to GitHub Pages at `/howlflow` base path

## Commands

```bash
pnpm install                      # Install all dependencies
pnpm dev                          # Start all dev servers (turbo)
pnpm dev:mobile                   # Start Expo dev server only
pnpm dev:docs                     # Start docs dev server only
pnpm build                        # Build all apps
pnpm typecheck                    # Type check all apps

# Mobile-specific (run from apps/mobile)
npx expo run:ios                  # Run on iOS simulator
npx expo run:ios --device         # Run on physical device
npx expo prebuild                 # Generate native projects
npx expo install <package>        # Install with correct version
```

## Architecture

### Data Flow

```
User Action → Zustand Store → MMKV (instant persist) → iCloud KV (background sync)
```

MMKV is always primary. iCloud is a bonus sync layer. **App MUST work fully without iCloud** (Apple requirement).

### Storage Strategy

| Data | Storage | Syncs to iCloud |
|------|---------|-----------------|
| Daily blocks & tasks | MMKV | No (ephemeral) |
| Timer state | MMKV | No |
| Brain dump entries | MMKV | Archived to iCloud Documents |
| Block templates | MMKV + iCloud KV | Yes |
| Streak data & stats | MMKV + iCloud KV | Yes |
| User settings | MMKV + iCloud KV | Yes |

### Key Directories (Mobile)

- `src/app/` — Expo Router screens (file-based routing)
- `src/app/(tabs)/` — Tab navigator screens: schedule (index), timer, dump, wins
- `src/components/` — Reusable components organized by feature (ui/)
- `src/lib/` — Utilities: storage, constants
- `src/stores/` — Zustand stores: scheduleStore, timerStore, dumpStore, statsStore, settingsStore
- `src/types/` — TypeScript interfaces

### Core Data Types

`BlockType`: `"routine" | "focus" | "break" | "planning" | "social" | "light"`

Key models: `BlockTemplate` (reusable schedule templates), `DailyBlock` (generated daily from templates with tasks), `SubTask`, `BrainDump`, `FocusSession`, `UserStats`, `UserSettings`

## Design System

**Supports light and dark mode** (follows system preference). Wolf theming adapts to both — dark mode is deep midnight den vibes, light mode is crisp icy trail energy.

### Color Palette (built from #0FACED + #091533)

**Dark mode (default):**
- `wolfBlue`: #0FACED — Primary brand, headings, accents
- `wolfDeep`: #0882B8 — Gradients, pressed states
- `wolfGlow`: #5DC8F5 — Highlights, glows
- `wolfIce`: #A3E0FA — Subtle highlights
- `wolfPurple`: #b794f4 — Secondary accent (brain dump, planning)
- `huntOrange`: #fc814a — Focus/action states, CTAs
- `denGreen`: #68d391 — Success, completion, breaks
- `bgDark`: #091533 — App background
- `bgCard`: #0F1F45 — Card backgrounds
- `bgSurface`: #0C1A3B — Elevated surfaces
- `textPrimary`: #E8F0FE — Main text
- `textSecondary`: #94A3C8 — Secondary text
- `textMuted`: #5E6F94 — Muted text
- `textDim`: #3A4A6B — Barely visible text

**Light mode:** Derived inversions of the above (see `global.css`)

### Block Type Colors

Each block type has a `bg rgba(..., 0.15)` and solid `border` color:
- routine → wolfBlue, planning → wolfPurple, focus → huntOrange
- break → denGreen, social → #f6e05e, light → textSecondary

### Typography

- **Cinzel** (600/700/900): App title, section headers, timer labels
- **JetBrains Mono** (400/700): Times, stats, counters
- **Montserrat** (400/600/700/800): Primary body text, task labels
- **Roboto** (400/500/700): Secondary body text, descriptions

All loaded via `expo-google-fonts` in root layout.

## Coding Conventions

- Functional components with TypeScript, no class components
- Named exports for components, default export for screens
- Zustand stores in `/stores` — never useState for shared state
- NativeWind `className` props only — no inline `StyleSheet` objects
- `crypto.randomUUID()` for IDs
- ISO 8601 date strings
- Always fire haptics on task/block completion and timer events
- Include `accessibilityLabel` on interactive elements
- Mac Catalyst: use flexible NativeWind sizing, no hardcoded widths

## Critical Rules

- **Never guilt the user** about incomplete tasks — always encouraging, ADHD-friendly
- **All data stays on-device** or in user's iCloud — collect nothing
- **Timer must work when backgrounded** via local notifications
- **Prioritize speed** — MMKV reads should feel instant
- **Support both light and dark mode** — follow system preference, use NativeWind `dark:` variants
