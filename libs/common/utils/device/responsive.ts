// libs/common/utils/responsive.ts
import { Dimensions } from "react-native"

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

/**
 * Width Percent (wp) - tính theo phần trăm chiều ngang màn hình
 * @example wp(50) = 50% width
 */
export const wp = (percentage: number): number => {
  return (SCREEN_WIDTH * percentage) / 100
}

/**
 * Height Percent (hp) - tính theo phần trăm chiều cao màn hình
 * @example hp(30) = 30% height
 */
export const hp = (percentage: number): number => {
  return (SCREEN_HEIGHT * percentage) / 100
}
