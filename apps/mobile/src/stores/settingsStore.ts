import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { zustandStorage } from "@/lib/storage";
import { DEFAULT_USER_SETTINGS } from "@/lib/constants";
import type { UserSettings } from "@/types";

interface SettingsState extends UserSettings {
  updateSetting: <K extends keyof UserSettings>(
    key: K,
    value: UserSettings[K]
  ) => void;
  resetSettings: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...DEFAULT_USER_SETTINGS,
      updateSetting: (key, value) => set({ [key]: value }),
      resetSettings: () => set(DEFAULT_USER_SETTINGS),
    }),
    {
      name: "settings-storage",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
