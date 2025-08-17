import React from "react"

import { Feather } from "@expo/vector-icons"
import { StyleSheet, View } from "react-native"
import { Avatar } from "react-native-paper"

import { images } from "@/libs/common/design-system/assets/images"
import { hp } from "@/libs/common/utils/device/responsive"

export const HomeHeader = () => {
  return (
    <View style={styles.main}>
      <Avatar.Image size={hp(5)} source={images.appLogo} />
      <Feather name="bell" size={hp(3)} color="gray" />
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 70,
  },
})
