import type { ExpoConfig, ConfigContext } from "expo/config";

const IS_PROD = process.env.APP_VARIANT === "production";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: IS_PROD ? "HowlFlow" : "HowlFlow (Dev)",
  slug: "howlflow",
  version: "0.1.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "howlflow",
  userInterfaceStyle: "dark",
  // @ts-expect-error newArchEnabled is valid in Expo SDK 50+ but missing from @expo/config-types
  newArchEnabled: true,
  ios: {
    supportsTablet: false,
    bundleIdentifier: IS_PROD
      ? "com.mrdemonwolf.howlflow"
      : "com.mrdemonwolf.howlflow.dev",
    config: {
      usesNonExemptEncryption: false,
    },
    infoPlist: {
      UIBackgroundModes: ["remote-notification"],
      MinimumOSVersion: "16.2",
    },
  },
  plugins: [
    "expo-router",
    "expo-font",
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
