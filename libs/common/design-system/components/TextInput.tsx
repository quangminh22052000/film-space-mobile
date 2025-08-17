import { FC } from "react"

import { StyleSheet, View, ViewStyle } from "react-native"
import {
  HelperText,
  TextInput as RNTextInput,
  TextInputProps,
} from "react-native-paper"

import { lightColors } from "../colors"

type Props = {
  containerStyle?: ViewStyle
  errorMsg?: string
} & TextInputProps

export const TextInput: FC<Props> = props => {
  return (
    <View style={styles.inputContainer}>
      <RNTextInput
        placeholderTextColor={lightColors.placeholderTextColor}
        {...props}
        style={[styles.input, props.style]}
        contentStyle={[{ paddingLeft: 10 }, props.contentStyle]}
        outlineStyle={[{ borderRadius: 10 }, props.outlineStyle]}
        mode="outlined"
      />
      {props.error && <HelperText type="error">{props.errorMsg}</HelperText>}
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    minHeight: 40,
  },
})
