import { useState } from "react"

import { useFormik } from "formik"
import { useTranslation } from "react-i18next"
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native"
import { Button, TextInput as RNTextInput } from "react-native-paper"
import * as Yup from "yup"

import { TextInput } from "@/libs/common/design-system/components"
import { successHandling } from "@/libs/common/utils/notification"

import { LoginPayload } from "../types"

export const LoginForm = () => {
  const { t } = useTranslation("auth")

  const [passwordVisible, setPasswordVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const validationSchema = Yup.object<LoginPayload>({
    email: Yup.string()
      .email(t("auth.invalidEmail"))
      .required(t("auth.requiredEmail")),
    password: Yup.string().required(t("auth.requiredPassword")),
  })

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      // handleLogin.cancel()
      handleLogin(values)
    },
  })
  const handleLogin = async (values: LoginPayload) => {
    setLoading(true)
    Keyboard.dismiss()
    console.log("~ values", values)
    successHandling("Login successfully", "SignInForm")
    setLoading(false)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.mainContainer}>
        <TextInput
          label={t("auth.email")}
          placeholder={t("auth.emailPlaceholder")}
          value={loginFormik.values.email}
          onChangeText={loginFormik.handleChange("email")}
          onBlur={loginFormik.handleBlur("email")}
          error={loginFormik.touched.email && Boolean(loginFormik.errors.email)}
          errorMsg={loginFormik.errors.email}
        />
        <TextInput
          label={t("auth.password")}
          placeholder={t("auth.passwordPlaceholder")}
          value={loginFormik.values.password}
          onChangeText={loginFormik.handleChange("password")}
          onBlur={loginFormik.handleBlur("password")}
          error={
            loginFormik.touched.password && Boolean(loginFormik.errors.password)
          }
          errorMsg={loginFormik.errors.password}
          secureTextEntry={!passwordVisible}
          right={
            <RNTextInput.Icon
              icon={passwordVisible ? "eye-off" : "eye"}
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          }
          onSubmitEditing={() => loginFormik.handleSubmit()}
        />
        <Button
          mode="contained"
          onPress={() => loginFormik.handleSubmit()}
          loading={loading}
          disabled={loading}
          style={styles.button}>
          {t("auth.login")}
        </Button>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: "auto",
    paddingHorizontal: 20,
  },
  button: {
    width: "100%",
    marginVertical: 5,
    marginBottom: 10,
  },
})
