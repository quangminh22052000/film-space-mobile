import React, { useEffect } from "react"

import { Pressable, StyleSheet } from "react-native"
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"

import { icons } from "../assets/icons"
import { lightColors } from "../colors"
import { useThemeContext } from "../theme"

type TabBarButtonProps = {
  isFocused: boolean
  label: string
  routeName: string
  onPress: () => void
  onLongPress: () => void
}

export const TabBarButton = (props: TabBarButtonProps) => {
  const { isFocused, label, routeName, onPress, onLongPress } = props

  const { theme } = useThemeContext()

  const scale = useSharedValue(0)

  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
      { duration: 350 },
    )
  }, [scale, isFocused])

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.4])
    const top = interpolate(scale.value, [0, 1], [0, 8])

    return {
      // styles
      transform: [{ scale: scaleValue }],
      top,
    }
  })
  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0])

    return {
      // styles
      opacity,
    }
  })

  return (
    <Pressable
      {...props}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}>
      <Animated.View style={[animatedIconStyle]}>
        {routeName in icons &&
          icons[routeName as keyof typeof icons]({
            color: isFocused ? theme.colors.primary : lightColors.grey,
          })}
      </Animated.View>

      <Animated.Text
        style={[
          {
            color: isFocused ? theme.colors.primary : lightColors.grey,
            fontSize: 11,
          },
          animatedTextStyle,
        ]}>
        {label}
      </Animated.Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
})
