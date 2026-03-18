import type { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "HowlFlow",
  slug: "howlflow",
  version: "0.1.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "howlflow",
  userInterfaceStyle: "dark",
  ...(({ newArchEnabled: true }) as Partial<ExpoConfig>),
  ios: {
    supportsTablet: false,
    bundleIdentifier: "com.mrdemonwolf.howlflow",
    appStoreUrl: undefined,
    config: {
      usesNonExemptEncryption: false,
    },
    infoPlist: {
      UIBackgroundModes: ["remote-notification"],
      MinimumOSVersion: "16.2",
    },
  },
  android: {
    adaptiveIcon: {
      backgroundColor: "#0A0E1A",
      foregroundImage: "./assets/images/android-icon-foreground.png",
      backgroundImage: "./assets/images/android-icon-background.png",
      monochromeImage: "./assets/images/android-icon-monochrome.png",
    },
    package: "com.mrdemonwolf.howlflow",
  },
  plugins: [
    "expo-router",
    [
      "expo-font",
      {
        fonts: ["./assets/fonts/Outfit-Variable.ttf"],
      },
    ],
    "expo-haptics",
    [
      "expo-notifications",
      {
        icon: "./assets/images/notification-icon.png",
        color: "#00D4FF",
      },
    ],
    [
      "expo-sqlite",
      {
        enableFTS: true,
      },
    ],
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#0A0E1A",
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
});
