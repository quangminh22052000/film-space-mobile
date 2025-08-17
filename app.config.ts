// import "dotenv/config"
// import { ConfigContext, ExpoConfig } from "expo/config"

// export default ({ config }: ConfigContext): ExpoConfig => ({
//   ...config,
//   experiments: {
//     // @ts-expect-error: `router` is supported at runtime but missing from type defs
//     router: true, // 👈 bật Expo Router
//   },
//   extra: {
//     authApiUrl: process.env.EXPO_PUBLIC_AUTH_API_URL,
//   },
// })

// nếu dùng file app.config.ts nghĩa là file app.json bị ghi đè
// nên nếu có cần thông tin gì thì qua file app.json để lấy hoặc lên project trên expo
// để kiếm thêm thông tin

import { ConfigContext, ExpoConfig } from "expo/config"

import { version } from "./package.json"

// Replace these with your EAS project ID and project slug.
// You can find them at https://expo.dev/accounts/[account]/projects/[project].
const EAS_PROJECT_ID = "3c2d21af-aa42-4ae4-b0f7-0875a9a310fe"
const PROJECT_SLUG = "film-space-mobile"
const OWNER = "detour_2205"

// App production config
const APP_NAME = "Film Space"
const BUNDLE_IDENTIFIER = "com.minhnq.filmspace.android"
const PACKAGE_NAME = "com.minhnq.filmspace.ios"
const ICON = "./libs/common/design-system/assets/images/app-logo.png"
const ADAPTIVE_ICON = "./libs/common/design-system/assets/images/app-logo.png"
const SCHEME = "filmspacemobile"

export default ({ config }: ConfigContext): ExpoConfig => {
  console.log("⚙️ Building app for environment:", process.env.APP_ENV)
  const { name, bundleIdentifier, icon, adaptiveIcon, packageName, scheme } =
    getDynamicAppConfig(
      (process.env.APP_ENV as "development" | "preview" | "production") ||
        "development",
    )

  return {
    ...config,
    name: name,
    version, // Automatically bump your project version with `npm version patch`, `npm version minor` or `npm version major`.
    slug: PROJECT_SLUG, // Must be consistent across all environments.
    orientation: "portrait",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    icon: icon,
    scheme: scheme,
    ios: {
      supportsTablet: true,
      bundleIdentifier: bundleIdentifier,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: adaptiveIcon,
        backgroundColor: "#ffffff",
      },
      package: packageName,
    },
    updates: {
      url: `https://u.expo.dev/${EAS_PROJECT_ID}`,
    },
    runtimeVersion: {
      policy: "appVersion",
    },
    extra: {
      eas: {
        projectId: EAS_PROJECT_ID,
      },
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./libs/common/design-system/assets/images/app-logo.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./libs/common/design-system/assets/images/app-logo.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
    ],
    experiments: {
      // @ts-expect-error: `router` is supported at runtime but missing from type defs
      router: true,
    },
    owner: OWNER,
  }
}

// Dynamically configure the app based on the environment.
// Update these placeholders with your actual values.
export const getDynamicAppConfig = (
  environment: "development" | "preview" | "production",
) => {
  if (environment === "production") {
    return {
      name: APP_NAME,
      bundleIdentifier: BUNDLE_IDENTIFIER,
      packageName: PACKAGE_NAME,
      icon: ICON,
      adaptiveIcon: ADAPTIVE_ICON,
      scheme: SCHEME,
    }
  }

  if (environment === "preview") {
    return {
      name: `${APP_NAME} Preview`,
      bundleIdentifier: `${BUNDLE_IDENTIFIER}.preview`,
      packageName: `${PACKAGE_NAME}.preview`,
      icon: "./libs/common/design-system/assets/images/app-logo.png", // Replace with the path to your preview icon
      adaptiveIcon: "./libs/common/design-system/assets/images/app-logo.png", // Replace with the path to your preview adaptive icon
      scheme: `${SCHEME}-prev`,
    }
  }

  return {
    name: `${APP_NAME} Development`,
    bundleIdentifier: `${BUNDLE_IDENTIFIER}.dev`,
    packageName: `${PACKAGE_NAME}.dev`,
    icon: "./libs/common/design-system/assets/images/app-logo.png", // Replace with the path to your development icon
    adaptiveIcon: "./libs/common/design-system/assets/images/app-logo.png", // Replace with the path to your development adaptive icon
    scheme: `${SCHEME}-dev`,
  }
}
