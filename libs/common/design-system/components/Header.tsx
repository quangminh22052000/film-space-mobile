import { useNavigation } from "expo-router"
import { StyleSheet } from "react-native"
import { Appbar } from "react-native-paper"

type HeaderProps = {
  title: string
  mode?: "small" | "medium" | "large" | "center-aligned"
}

export const Header = ({ title, mode = "small" }: HeaderProps) => {
  const navigation = useNavigation()

  const _goBack = () => {
    navigation.goBack()
  }

  return (
    <Appbar.Header mode={mode}>
      {navigation.canGoBack() && <Appbar.BackAction onPress={_goBack} />}
      <Appbar.Content title={title} titleStyle={styles.title} />
    </Appbar.Header>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    textTransform: "capitalize",
  },
})
