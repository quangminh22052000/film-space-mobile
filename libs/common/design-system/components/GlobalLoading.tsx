import React from "react"

import { useTranslation } from "react-i18next"
import { View, StyleSheet, Modal } from "react-native"
import { ActivityIndicator, Text } from "react-native-paper"

import { useAppStore } from "../../store"

export const GlobalLoading = () => {
  const { t } = useTranslation(["common"])

  const { loading } = useAppStore()

  return (
    <>
      {loading ? (
        <Modal transparent={true} visible={loading} animationType="fade">
          <View style={styles.container}>
            <View style={styles.backdrop} />
            <ActivityIndicator size="large" />
            <Text variant="bodySmall" style={styles.message}>
              {t("Your request is being processed.")}
            </Text>
          </View>
        </Modal>
      ) : null}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    // zIndex: theme.zIndex.indicator, // TODO
    alignItems: "center",
    justifyContent: "center",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    opacity: 0.6,
  },
  message: {
    marginTop: 20,
  },
})
