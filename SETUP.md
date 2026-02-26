# HowlFlow — Developer Setup

## Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| Node.js | 20+ | [nodejs.org](https://nodejs.org) |
| pnpm | 9.15.4 | `corepack enable && corepack prepare pnpm@9.15.4 --activate` |
| Xcode | 16+ | Mac App Store |
| Xcode CLI Tools | — | `xcode-select --install` |
| CocoaPods | — | `sudo gem install cocoapods` (or via Homebrew) |
| EAS CLI | latest | `npm install -g eas-cli` |
| Expo account | — | [expo.dev/signup](https://expo.dev/signup) |
| Apple Developer account | — | [developer.apple.com](https://developer.apple.com) |

## Clone & Install

```bash
git clone https://github.com/mrdemonwolf/HowlFlow.git
cd HowlFlow
pnpm install
```

## EAS Project Init (One-Time)

From the `apps/mobile/` directory, link the project to your Expo account:

```bash
cd apps/mobile
eas login
eas init
```

This generates a `projectId` — copy it into `app.json` → `extra.eas.projectId`.

Then fill in `eas.json` → `submit.production.ios`:
- `appleId` — your Apple ID email
- `appleTeamId` — your Apple Developer Team ID

## Running on iOS Simulator

```bash
# Generate native projects (first time or after config changes)
pnpm prebuild:clean

# Build & run on simulator
pnpm ios
```

Or from repo root:

```bash
pnpm run:ios
```

## Running on Physical iOS Device

Connect your device, then:

```bash
pnpm run:ios:device
```

You'll be prompted to select the connected device.

## Development Server

```bash
# Start Expo dev server (mobile only)
pnpm dev:mobile

# Start all dev servers (mobile + docs)
pnpm dev
```

## EAS Build (Cloud)

### Development Build (Internal)

```bash
cd apps/mobile
eas build --platform ios --profile development
```

### Production Build

```bash
cd apps/mobile
eas build --platform ios --profile production
```

### Submit to App Store

```bash
cd apps/mobile
eas submit --platform ios --profile production
```

## Type Checking

```bash
pnpm typecheck
```

## Docs Site

```bash
# Dev server
pnpm dev:docs

# Build static site
pnpm build
```

The docs site deploys to `mrdemonwolf.github.io/howlflow` via GitHub Pages.

## Local Notifications

HowlFlow uses **local-only** notifications for the focus timer. There are no push notifications, no server, and no push tokens involved.

### How It Works

1. When the user starts a focus timer, a local notification is scheduled via `expo-notifications` using `SchedulableTriggerInputTypes.TIME_INTERVAL`
2. iOS delivers the notification via `UNUserNotificationCenter` even when the app is backgrounded
3. When the timer is stopped or reset, the scheduled notification is cancelled
4. On app cold start, all stale scheduled notifications are cleared

### No Background Modes Required

`UIBackgroundModes` is **not** needed for local notifications. iOS handles scheduled local notifications natively. Omitting background modes avoids unnecessary App Store review scrutiny.

### Testing Notifications

1. Run the app on a simulator or device (notifications don't work in Expo Go)
2. Accept the notification permission prompt on first launch
3. Start a focus timer (e.g. set to 10 seconds for testing)
4. Background the app
5. The notification should appear when the timer completes
6. To test cancellation: start a timer, then stop/reset it before it completes — no notification should fire

### Permission Denied

If you denied notifications, the timer still works — it just won't fire a notification. To re-enable:
- iOS: Settings → HowlFlow → Notifications → Allow Notifications

## Troubleshooting

### `react-native-css` Bundling Error

If you see `failed to deserialize; expected an object-like struct named Specifier`, check `global.css` for nested `@media` + `@theme` blocks. NativeWind v5 preview doesn't support `@media (prefers-color-scheme)` nesting — light/dark switching is handled at runtime via NativeWind's `dark:` variant prefix.

### CocoaPods Issues

```bash
cd apps/mobile/ios
pod deintegrate
pod install
```

### Clean Rebuild

```bash
pnpm prebuild:clean
```

This deletes and regenerates the `ios/` and `android/` directories.

### EAS Build Failing

Verify your `eas.json` is valid:

```bash
cd apps/mobile
eas build --platform ios --profile development --dry-run
```
