import i18next from "i18next"
import { Image, StyleSheet, TouchableOpacity, View } from "react-native"

import { images } from "../assets/images"
import { lightColors } from "../colors"

export const SwitchLanguage = () => {
  const language = i18next.language

  const onChangeLanguage = (lang: "vi" | "en") => {
    i18next.changeLanguage(lang)
  }

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        onPress={() => onChangeLanguage(language === "vi" ? "en" : "vi")}>
        {language === "vi" ? (
          <Image source={images.viFlag} style={styles.switchLang} />
        ) : (
          <Image source={images.enFlag} style={styles.switchLang} />
        )}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 5,
  },
  switchLang: {
    width: 50,
    height: 50,
    borderColor: lightColors.white,
    borderWidth: 1,
    borderRadius: 50,
  },
})
