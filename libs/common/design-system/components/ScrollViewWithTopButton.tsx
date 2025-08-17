import React, { useRef, useState } from "react"

import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  ViewStyle,
} from "react-native"
import { FAB } from "react-native-paper"

import { lightColors } from "../colors"

interface ScrollViewWithTopButtonProps {
  children: React.ReactNode
  style?: ViewStyle
}

export const ScrollViewWithTopButton = ({
  children,
  style,
}: ScrollViewWithTopButtonProps) => {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const scrollViewRef = useRef<ScrollView>(null)

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollPosition = event.nativeEvent.contentOffset.y
    setShowScrollTop(currentScrollPosition > 100)
  }

  const handleScrollToTop = () => {
    scrollViewRef.current?.scrollTo({
      x: 0,
      y: 0,
      animated: true,
    })
  }

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={style}>
        {children}
      </ScrollView>
      {showScrollTop && (
        <FAB
          style={styles.scrollTopFab}
          icon="chevron-up"
          color="white"
          onPress={handleScrollToTop}
          size="small"
        />
      )}
    </>
  )
}

const styles = StyleSheet.create({
  scrollTopFab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: lightColors.shadow,
    opacity: 0.8,
  },
})
