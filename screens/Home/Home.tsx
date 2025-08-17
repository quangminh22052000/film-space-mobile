import React from "react"

import { StyleSheet } from "react-native"

import { ScreenWrapper } from "@/libs/common/design-system/components"

import { Categories, HomeHeader, HomeIntro, Recipies } from "./components"

export const Home = () => {
  // console.log("🚀 ~ Home", process.env.EXPO_PUBLIC_AUTH_API_URL)
  // console.log("🚀 ~ Home", process.env.APP_ENV)
  return (
    <ScreenWrapper contentContainerStyle={styles.container}>
      <HomeHeader />
      <HomeIntro />
      <Categories />
      <Recipies />
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
})
