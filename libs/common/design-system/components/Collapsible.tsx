/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from "react"

import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native"
import { Card, Divider, Icon, Text, useTheme } from "react-native-paper"

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true)
}

type Props = {
  header?: React.ReactNode
  content?: React.ReactNode
  expanded?: boolean
  onToggle?: (expanded: boolean) => void
  backgroundColor?: string
}

export const Collapsible = (props: Props) => {
  const { header, content, expanded = false, onToggle, backgroundColor } = props

  const theme = useTheme()
  const [isExpanded, setIsExpanded] = useState(expanded)

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setIsExpanded(prev => !prev)
    if (onToggle) {
      onToggle(!isExpanded)
    }
  }

  useEffect(() => {
    setIsExpanded(expanded)
  }, [expanded])

  return (
    <Card
      style={[
        {
          backgroundColor: backgroundColor
            ? backgroundColor
            : theme.colors.elevation.level3,
        },
        styles.container,
      ]}>
      <TouchableOpacity onPress={toggleExpand} style={[styles.header]}>
        <View style={styles.headerContentContainer}>
          {header ?? (
            <Text
              style={[styles.headerText, { color: theme.colors.surface }]}
              numberOfLines={1}
              ellipsizeMode="tail">
              Đây là header của Collapsible Component
            </Text>
          )}
        </View>
        {isExpanded ? (
          <Icon source="chevron-up" size={20} />
        ) : (
          <Icon source="chevron-down" size={20} />
        )}
      </TouchableOpacity>
      {isExpanded && (
        <>
          <Divider bold />
          <View>
            {content ?? (
              <Text
                style={[styles.headerText, { color: theme.colors.surface }]}>
                Đây là nội dung của Collapsible Component
              </Text>
            )}
          </View>
        </>
      )}
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 15,
  },
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
  },
  headerContentContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    overflow: "hidden",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
})
