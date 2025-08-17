import React from "react"

import { View, ViewProps, StyleSheet } from "react-native"
import { useTheme } from "react-native-paper"

interface ThemedViewProps extends ViewProps {
  children?: React.ReactNode
}

export const CustomView = ({ children, style, ...rest }: ThemedViewProps) => {
  const theme = useTheme()

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.background },
        style,
      ]}
      {...rest}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
