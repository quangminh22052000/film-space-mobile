import { Platform } from "react-native"

export { default as Orientation } from "./orientation"

export const isIOS = () => Platform.OS === "ios"
export const isAndroid = () => Platform.OS === "android"
