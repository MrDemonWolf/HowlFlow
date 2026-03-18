# Plan: Add APP_VARIANT-based scripts from official-app

## Context
The `mrdemonwolf/official-app` repo uses `APP_VARIANT` environment variable to switch between development and production builds (different bundle IDs, app names, etc.). HowlFlow currently has minimal scripts. We want to bring over the same pattern for consistency.

## Changes

### 1. `apps/mobile/package.json` — add missing scripts
Currently has: `dev`, `android`, `ios`, `prebuild`, `typecheck`

Add to match official-app pattern:
```json
"scripts": {
  "dev": "expo start --clear",
  "dev:prod": "APP_VARIANT=production expo start --clear",
  "android": "expo run:android",
  "android:prod": "APP_VARIANT=production expo run:android",
  "ios": "expo run:ios",
  "ios:prod": "APP_VARIANT=production expo run:ios",
  "web": "expo start --web",
  "prebuild": "expo prebuild",
  "prebuild:clean": "expo prebuild --clean",
  "prebuild:prod": "APP_VARIANT=production expo prebuild",
  "lint": "expo lint",
  "typecheck": "tsc --noEmit"
}
```

### 2. `package.json` (root) — add convenience scripts
Currently has: `dev`, `build`, `typecheck`, `lint`, `dev:mobile`, `dev:docs`

Add:
```json
"scripts": {
  "dev": "turbo dev",
  "build": "turbo build",
  "typecheck": "turbo typecheck",
  "lint": "turbo lint",
  "dev:mobile": "turbo -F mobile dev",
  "dev:docs": "turbo -F docs dev",
  "ios": "turbo -F mobile ios",
  "ios:prod": "turbo -F mobile ios:prod",
  "android": "turbo -F mobile android",
  "android:prod": "turbo -F mobile android:prod",
  "prebuild": "turbo -F mobile prebuild",
  "prebuild:clean": "turbo -F mobile prebuild:clean",
  "docs:build": "turbo -F docs build"
}
```

### 3. `apps/mobile/app.config.ts` — wire up APP_VARIANT
Add variant switching logic so `APP_VARIANT=production` changes bundle ID suffix and app name (matching official-app pattern):
- Dev: `com.mrdemonwolf.howlflow.dev` / "HowlFlow (Dev)"
- Production: `com.mrdemonwolf.howlflow` / "HowlFlow"

## Files to modify
- `/Users/nathanialhenniges/Developer/mrdemonwolf/howlflow/apps/mobile/package.json`
- `/Users/nathanialhenniges/Developer/mrdemonwolf/howlflow/package.json`
- `/Users/nathanialhenniges/Developer/mrdemonwolf/howlflow/apps/mobile/app.config.ts`

## Verification
- `bun run ios` from root should start iOS via turbo
- `bun run typecheck` should still pass
- `APP_VARIANT=production` should change the bundle ID in app.config.ts
