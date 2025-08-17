import React from "react"

import { QueryClientProvider } from "@tanstack/react-query"
import { Stack } from "expo-router"
import FlashMessage from "react-native-flash-message"

import {
  GlobalDialog,
  GlobalLoading,
  Header,
} from "@/libs/common/design-system/components"
import { ThemeProvider } from "@/libs/common/design-system/theme"
import { queryClient } from "@/libs/common/utils/network"
import "../libs/common/utils/i18n"

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Stack
          screenOptions={() => ({
            headerShown: false,
            animation: "slide_from_right",
          })}>
          <Stack.Screen name="index" />
          <Stack.Screen
            name="+not-found"
            options={{
              headerShown: true,
              header: () => <Header title="Not Found" mode="small" />,
            }}
          />
          <Stack.Screen
            name="testing"
            options={{
              headerShown: true,
              header: () => <Header title="Testing" mode="small" />,
            }}
          />
        </Stack>
        <FlashMessage position="top" />
        <GlobalLoading />
        <GlobalDialog />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
