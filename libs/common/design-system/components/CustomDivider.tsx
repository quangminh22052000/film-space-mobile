import React from "react"

import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native"

import { useThemeContext } from "../theme"

type Props = {
  text?: string
  children?: React.ReactNode
  style?: StyleProp<ViewStyle>
}

export const CustomDivider = (props: Props) => {
  const { text, children } = props

  const { theme } = useThemeContext()

  return (
    <View style={[styles.mainContainer, props.style]}>
      <View
        style={[styles.line, { backgroundColor: theme.colors.background }]}
      />
      {text && (
        <Text
          style={[styles.text, { backgroundColor: theme.colors.background }]}>
          {text}
        </Text>
      )}
      {children && <>{children}</>}
      <View
        style={[styles.line, { backgroundColor: theme.colors.background }]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
  },
  line: {
    flex: 1,
    height: 0.7,
  },
  text: {
    width: "auto",
    textAlign: "center",
    paddingHorizontal: 5,
  },
})
