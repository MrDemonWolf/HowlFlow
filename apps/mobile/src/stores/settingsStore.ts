import { create } from "zustand";
import { persist } from "zustand/middleware";

import { zustandStorage } from "@/lib/storage";
import type { Settings, ThemePreference } from "@/types";
import { DEFAULT_SETTINGS } from "@/types";

interface SettingsState {
  settings: Settings;
  updateSettings: (patch: Partial<Settings>) => void;
  resetSettings: () => void;
  completeOnboarding: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: DEFAULT_SETTINGS,

      updateSettings: (patch) =>
        set((state) => ({
          settings: { ...state.settings, ...patch },
        })),

      resetSettings: () =>
        set({ settings: DEFAULT_SETTINGS }),

      completeOnboarding: () =>
        set((state) => ({
          settings: { ...state.settings, onboardingCompleted: true },
        })),
    }),
    {
      name: "howlflow_settings",
      version: 1,
      storage: {
        getItem: (name) => {
          const str = zustandStorage.getItem(name);
          if (!str) return null;
          return JSON.parse(str as string);
        },
        setItem: (name, value) => {
          zustandStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          zustandStorage.removeItem(name);
        },
      },
      migrate: (persisted, version) => {
        const state = persisted as SettingsState;
        if (version === 0) {
          // Existing users who had settings before onboarding was added
          // should skip onboarding (they already configured settings).
          if (
            state.settings &&
            !("onboardingCompleted" in state.settings)
          ) {
            (state.settings as Settings).onboardingCompleted = true;
          }
        }
        return state;
      },
    }
  )
);

/**
 * Read stored theme synchronously at module level.
 * Used in _layout.tsx before first render to avoid theme flash.
 */
export function getStoredTheme(): ThemePreference {
  try {
    const raw = zustandStorage.getItem("howlflow_settings");
    if (raw) {
      const parsed = JSON.parse(raw as string);
      const pref = parsed?.state?.settings?.themePreference;
      if (pref === "light" || pref === "dark" || pref === "auto") {
        return pref;
      }
    }
  } catch {}
  return "dark";
}

/**
 * Read onboardingCompleted synchronously at module level.
 * Used in _layout.tsx to determine initial route before first render.
 */
export function getOnboardingCompleted(): boolean {
  try {
    const raw = zustandStorage.getItem("howlflow_settings");
    if (raw) {
      const parsed = JSON.parse(raw as string);
      return parsed?.state?.settings?.onboardingCompleted === true;
    }
  } catch {}
  return false;
}
