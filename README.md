# HowlFlow - Your ADHD Daily Companion

HowlFlow is a wolf-themed mobile app built to help people with ADHD
structure their day without the guilt. Block your time, lock into
focus hunts, dump your thoughts, and celebrate every win — all while
your data stays entirely on your device.

The strength of the pack is the wolf. You've got this.

## Features

- **Schedule Blocks** — Structure your day with ADHD-friendly time
  blocks: routines, focus sessions, breaks, planning, social, and
  light tasks. Fully customizable templates.
- **Focus Hunt Timer** — Distraction-free timer with haptic feedback
  and background notifications. Track focus sessions and build
  momentum over time.
- **Brain Dump** — Instantly capture racing thoughts with zero
  friction. Archive entries when you're ready — no pressure.
- **Pack Report** — Celebrate streaks, completed blocks, and focus
  minutes. Encouraging stats that never guilt you for off days.
- **Local-First Architecture** — All data stored on-device with MMKV.
  Optional iCloud sync puts you in control. No accounts, no servers,
  no tracking.
- **Light and Dark Mode** — Follows your system preference
  automatically. Dark mode is cozy den vibes, light mode is bright
  trail energy.
- **Wolf Theming** — Custom color palette, motivational wolf quotes,
  and encouraging completion messages throughout the experience.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/mrdemonwolf/HowlFlow.git
   cd HowlFlow
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the mobile dev server:

   ```bash
   pnpm dev:mobile
   ```

4. Press `i` to open in the iOS Simulator, or scan the QR code
   with Expo Go on your device.

## Tech Stack

| Layer            | Technology                               |
| ---------------- | ---------------------------------------- |
| Framework        | React Native 0.83 + Expo SDK 55         |
| Language         | TypeScript (strict mode)                 |
| Routing          | Expo Router (file-based)                 |
| Styling          | NativeWind v5 preview + Tailwind CSS v4  |
| State Management | Zustand v5 + MMKV persist middleware     |
| Local Storage    | react-native-mmkv                        |
| Animations       | React Native Reanimated 4                |
| Notifications    | expo-notifications (local only)          |
| Haptics          | expo-haptics                             |
| Fonts            | expo-google-fonts (Cinzel, JetBrains Mono, Montserrat, Roboto) |
| Docs Site        | Next.js 15 + Fumadocs                    |
| Monorepo         | Turborepo + pnpm workspaces              |
| CI/CD            | GitHub Actions + GitHub Pages            |

## Development

### Prerequisites

- **Node.js** 20+
- **pnpm** 9.15+
- **Xcode** 16+ (for iOS Simulator)
- **Expo CLI** (installed automatically via npx)

### Setup

1. Clone and install:

   ```bash
   git clone https://github.com/mrdemonwolf/HowlFlow.git
   cd HowlFlow
   pnpm install
   ```

2. Start the mobile app:

   ```bash
   pnpm dev:mobile
   ```

3. Start the docs site:

   ```bash
   pnpm dev:docs
   ```

4. Run on iOS Simulator (requires native build):

   ```bash
   cd apps/mobile
   npx expo run:ios
   ```

### Development Scripts

- `pnpm dev` — Start all dev servers via Turborepo
- `pnpm dev:mobile` — Start Expo dev server only
- `pnpm dev:docs` — Start Next.js docs dev server only
- `pnpm build` — Build all apps
- `pnpm typecheck` — Run TypeScript type checking across all apps
- `pnpm lint` — Run linting across all apps

### Code Quality

- TypeScript strict mode across all packages
- CI pipeline runs lint and typecheck on every push and PR
- NativeWind `className` only — no inline StyleSheet objects
- Zustand for all shared state — no useState for cross-component data

## Project Structure

```
HowlFlow/
├── apps/
│   ├── mobile/                # Expo React Native app
│   │   ├── src/
│   │   │   ├── app/           # Expo Router screens
│   │   │   │   ├── (tabs)/    # Tab navigator (schedule, timer, dump, wins)
│   │   │   │   └── settings.tsx
│   │   │   ├── components/    # Reusable UI components
│   │   │   ├── lib/           # Storage, constants, utilities
│   │   │   ├── stores/        # Zustand stores (schedule, timer, dump, stats, settings)
│   │   │   └── types/         # TypeScript interfaces
│   │   ├── assets/            # Images, fonts, icons
│   │   ├── app.json           # Expo config
│   │   ├── metro.config.js    # Metro bundler + NativeWind
│   │   └── global.css         # Wolf theme tokens (light + dark)
│   └── docs/                  # Fumadocs marketing site
│       └── src/app/           # Landing page, privacy policy, terms
├── .github/workflows/         # CI + GitHub Pages deployment
├── turbo.json                 # Turborepo task pipeline
├── pnpm-workspace.yaml        # Workspace configuration
└── package.json               # Root scripts and devDependencies
```

## License

![GitHub license](https://img.shields.io/github/license/mrdemonwolf/HowlFlow.svg?style=for-the-badge&logo=github)

## Contact

Questions, feedback, or just want to howl?

- Discord: [Join my server](https://mrdwolf.net/discord)

---

Made with love by [MrDemonWolf, Inc.](https://www.mrdemonwolf.com)
