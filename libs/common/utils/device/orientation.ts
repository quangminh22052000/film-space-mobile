import { Dimensions, Platform } from "react-native"
export const deviceHeight = Dimensions.get("window").height
export const deviceWidth = Dimensions.get("window").width

export const addSafePaddingAndroid = Platform.OS === "android" ? 32 : 0

export default {
  deviceHeight,
  deviceWidth,
} as const
