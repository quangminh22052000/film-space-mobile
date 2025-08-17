import React from "react"

import { useRouter } from "expo-router"
import { StyleSheet, TouchableOpacity, Image } from "react-native"
import { Appbar } from "react-native-paper"

import { images } from "../assets/images"

export const RootHeader = () => {
  const router = useRouter()

  const _handleHome = () => {
    router.navigate("/")
  }
  return (
    <Appbar.Header style={styles.header}>
      <TouchableOpacity style={styles.iconContainer} onPress={_handleHome}>
        <Image source={images.appLogo} style={styles.icon} />
      </TouchableOpacity>
    </Appbar.Header>
  )
}

export default RootHeader

const styles = StyleSheet.create({
  header: {
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
})
