import { ConfigContext, ExpoConfig } from "expo/config";

const APP_VARIANT = process.env.APP_VARIANT || "development";
const IS_PRODUCTION = APP_VARIANT === "production";
const IS_PREVIEW = APP_VARIANT === "preview";

const BUNDLE_ID = IS_PRODUCTION || IS_PREVIEW
  ? "com.mrdemonwolf.howlflow"
  : "com.mrdemonwolf.howlflow.dev";

const APP_NAME = IS_PRODUCTION ? "HowlFlow" : IS_PREVIEW ? "HowlFlow" : "HowlFlow";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: APP_NAME,
  slug: "howlflow",
  version: "1.0.0",
  orientation: "portrait",
  icon: IS_PRODUCTION
    ? "./assets/images/icon.png"
    : IS_PREVIEW
      ? "./assets/images-preview/icon.png"
      : "./assets/images-dev/icon.png",
  scheme: "howlflow",
  userInterfaceStyle: "automatic",
  platforms: ["ios"],

  ios: {
    supportsTablet: false,
    bundleIdentifier: BUNDLE_ID,
    buildNumber: "1",
    icon: IS_PRODUCTION
      ? "./assets/AppIcon.icon"
      : IS_PREVIEW
        ? "./assets/images-preview/icon.png"
        : "./assets/images-dev/icon.png",
    config: {
      usesNonExemptEncryption: false,
    },
    infoPlist: {
      NSMotionUsageDescription:
        "HowlFlow uses haptic feedback to enhance your experience.",
      UIBackgroundModes: ["remote-notification"],
      NSSupportsLiveActivities: true,
    },
    entitlements: {
      "com.apple.developer.icloud-container-identifiers": [
        "iCloud.com.mrdemonwolf.howlflow",
      ],
      "com.apple.developer.icloud-services": ["CloudDocuments", "CloudKit"],
      "com.apple.developer.ubiquity-container-identifiers": [
        "iCloud.com.mrdemonwolf.howlflow",
      ],
      "com.apple.security.application-groups": [
        "group.com.mrdemonwolf.howlflow",
      ],
    },
  },

  plugins: [
    "expo-router",
    "expo-font",
    "expo-image",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#FFFFFF",
        dark: {
          backgroundColor: "#091533",
        },
      },
    ],
    [
      "expo-notifications",
      {
        icon: "./assets/images/icon.png",
        color: "#0FACED",
      },
    ],
    [
      "expo-widgets",
      {
        bundleIdentifier: `${BUNDLE_ID}.widgets`,
        groupIdentifier: "group.com.mrdemonwolf.howlflow",
        frequentUpdates: true,
        widgets: [
          {
            name: "ScheduleWidget",
            displayName: "Schedule Progress",
            description: "Track your daily time block progress",
            supportedFamilies: ["systemSmall", "systemMedium"],
          },
          {
            name: "TimerActivity",
            displayName: "Focus Timer",
            description: "Live countdown for focus sessions",
            supportedFamilies: [],
          },
        ],
      },
    ],
  ],

  developmentClient: IS_PRODUCTION ? undefined : {},

  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
});
