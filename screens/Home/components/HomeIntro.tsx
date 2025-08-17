import React from "react"

import { useTranslation } from "react-i18next"
import { StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"

import { useThemeContext } from "@/libs/common/design-system/theme"
import { hp } from "@/libs/common/utils/device/responsive"

export const HomeIntro = () => {
  const { t } = useTranslation("home")

  const { theme } = useThemeContext()

  return (
    <View style={styles.main}>
      <Text style={{ fontSize: hp(1.7) }}>
        {t("intro.hello", { name: "Ngọc Thạnh" })}
      </Text>
      <Text style={[styles.textBold, { fontSize: hp(3.8) }]}>
        {t("intro.welcome1")}, &nbsp;
      </Text>
      <Text
        variant="displaySmall"
        style={[styles.textBold, { fontSize: hp(3.8) }]}>
        {t("intro.welcome2")}{" "}
        <Text
          variant="displaySmall"
          style={[styles.textBold, { color: theme.colors.primary }]}>
          {t("intro.welcome3")}
        </Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: 40,
  },
  textBold: {
    fontWeight: "bold",
  },
})
