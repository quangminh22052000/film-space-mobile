import * as React from "react"

import {
  ScrollView,
  ScrollViewProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useThemeContext } from "../theme"

type Props = ScrollViewProps & {
  children: React.ReactNode
  withScrollView?: boolean
  style?: StyleProp<ViewStyle>
  contentContainerStyle?: StyleProp<ViewStyle>
}

export const ScreenWrapper = ({
  children,
  style,
  contentContainerStyle,
  ...rest
}: Props) => {
  const { theme } = useThemeContext()

  const insets = useSafeAreaInsets()

  const containerStyle = [
    styles.container,
    {
      backgroundColor: theme.colors.background,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.left,
    },
  ]

  return (
    <ScrollView
      {...rest}
      contentContainerStyle={contentContainerStyle}
      keyboardShouldPersistTaps="always"
      alwaysBounceVertical={false}
      showsVerticalScrollIndicator={false}
      style={[
        containerStyle,
        style,
        { backgroundColor: theme.colors.background },
      ]}>
      {children}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
