# HowlFlow - Your Streaming Companion

HowlFlow is a personal iOS app I built for myself to manage
my streaming workflow. It handles routines, timers, and
stream prep so I can focus on content instead of setup.
The source is open so you can fork it and adapt it for your
own channel.

Built with the mindset that streaming tools should work
for you, not the other way around.

## Features

- **Stream Routines** — Create and manage pre-stream,
  mid-stream, and post-stream checklists so nothing gets
  missed.
- **Timers** — Built-in timers for breaks, segments, and
  countdowns during your stream.
- **The Den** — A central hub for organizing your streaming
  notes and resources.
- **Onboarding Flow** — Guided setup to get your workflow
  configured on first launch.
- **Dark Mode** — Full dark theme out of the box, designed
  for late-night stream prep.
- **Offline-First** — Local SQLite database with MMKV-backed
  state. No account required, your data stays on your device.

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/MrDemonWolf/howlflow.git
cd howlflow
```

2. Install dependencies:

```bash
bun install
```

3. Run the mobile app in development:

```bash
bun ios
```

## Tech Stack

| Layer            | Technology                              |
| ---------------- | --------------------------------------- |
| Framework        | Expo SDK 55, React Native 0.83          |
| UI               | React 19, NativeWind v5, Tailwind v4    |
| Routing          | Expo Router v3 (file-based)             |
| State            | Zustand v5 + MMKV persistence           |
| Database         | expo-sqlite with FTS                    |
| Fonts            | Outfit (via @expo-google-fonts)         |
| Notifications    | expo-notifications                      |
| Monorepo         | Turborepo 2.8                           |
| Package Manager  | Bun                                     |
| Docs             | Fumadocs + Next.js                      |
| CI/CD            | GitHub Actions + EAS Build              |

## Development

### Prerequisites

- Bun v1.3.10 or later
- Xcode (for iOS simulator)
- An Apple developer account (for device builds)

### Setup

1. Clone and install:

```bash
git clone https://github.com/MrDemonWolf/howlflow.git
cd howlflow
bun install
```

2. Run the iOS development build:

```bash
bun ios
```

3. For documentation site:

```bash
bun dev:docs
```

### Development Scripts

- `bun dev` — Start all apps in development mode
- `bun dev:mobile` — Start mobile app only
- `bun dev:docs` — Start docs site only
- `bun build` — Build all workspaces
- `bun ios` — Run Expo iOS (development variant)
- `bun ios:prod` — Run Expo iOS (production variant)
- `bun prebuild` — Expo native prebuild (non-destructive)
- `bun prebuild:clean` — Expo native prebuild (clean)
- `bun typecheck` — TypeScript checking across all workspaces
- `bun lint` — ESLint across all workspaces

### Code Quality

- TypeScript strict mode across all packages
- ESLint with shared config (`@howlflow/config`)
- Turborepo caching for `build` and `typecheck` tasks

## Project Structure

```
howlflow/
├── apps/
│   ├── mobile/        # Expo React Native app (primary product)
│   └── docs/          # Fumadocs + Next.js documentation site
├── packages/
│   ├── config/        # Shared TypeScript + ESLint config bases
│   ├── core/          # Core business logic (framework-agnostic)
│   ├── db/            # Database layer (depends on @howlflow/core)
│   ├── env/           # Env validation via t3-env + zod
│   └── ui/            # Shared React Native components + NativeWind
├── CLAUDE.md          # AI tooling instructions
├── bunfig.toml        # Bun configuration
├── turbo.json         # Turborepo task definitions
└── package.json       # Root workspace config
```

## License

![GitHub license](https://img.shields.io/github/license/MrDemonWolf/howlflow.svg?style=for-the-badge&logo=github)

## Contact

Questions or feedback?

- Discord: [Join my server](https://mrdwolf.net/discord)

---

Made with love by [MrDemonWolf, Inc.](https://www.mrdemonwolf.com)
