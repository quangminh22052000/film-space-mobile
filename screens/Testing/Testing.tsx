/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRouter } from "expo-router"
import { useTranslation } from "react-i18next"
import { StyleSheet, View } from "react-native"
import { Button, Text } from "react-native-paper"

import { LoginForm } from "@/libs/auth/components"
import {
  ScreenWrapper,
  SwitchLanguage,
} from "@/libs/common/design-system/components"
import { useThemeContext } from "@/libs/common/design-system/theme"
import { useAppStore } from "@/libs/common/store"
import {
  errorHandling,
  successHandling,
} from "@/libs/common/utils/notification"

export const Testing = () => {
  const { t } = useTranslation("common")

  const router = useRouter()

  const { count, increase, decrease, reset, loading, setLoading, showDialog } =
    useAppStore()

  const { toggleTheme, theme } = useThemeContext()

  const handleSuccess = () => {
    successHandling("Success", "RootLayout")
  }

  const handleError = () => {
    errorHandling("Error", "RootLayout")
  }

  const handleDelete = () => {
    showDialog({
      title: "Delete item?",
      message: "Are you sure you want to delete this item?",
      confirmText: "Yes",
      cancelText: "No",
      onConfirm: () => {
        // Delete logic here
      },
    })
  }

  const handleNotfound = () => {
    router.push("/+not-found")
  }

  return (
    <ScreenWrapper contentContainerStyle={styles.mainContainer}>
      <Text>{t("appName.full")}</Text>
      <SwitchLanguage />
      <LoginForm />
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={handleSuccess}>
          {"Success"}
        </Button>
        <Button mode="contained" onPress={handleError}>
          {"Error"}
        </Button>
        <Text variant="titleLarge">Count: {count}</Text>
        <Button mode="contained" onPress={increase}>
          {"Increase"}
        </Button>
        <Button mode="contained" onPress={decrease}>
          {"Decrease"}
        </Button>
        <Button mode="contained" onPress={reset}>
          {"Reset"}
        </Button>
        <Button mode="contained" onPress={toggleTheme}>
          {"Toggle Theme"}
        </Button>
        <Button mode="contained" onPress={() => setLoading(!loading)}>
          Loading
        </Button>
        <Button mode="contained" onPress={handleDelete}>
          Confirm Delete
        </Button>
        <Button mode="contained" onPress={handleNotfound}>
          {"Not Found"}
        </Button>
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    gap: 8,
  },
})
