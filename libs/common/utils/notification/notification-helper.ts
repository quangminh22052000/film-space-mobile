/* eslint-disable @typescript-eslint/no-explicit-any */
import { showMessage } from "react-native-flash-message"

export const errorHandling = (error: any, location: string) => {
  console.log("🚀 ~ error:", JSON.stringify(error, null, 2))
  console.log("🚀 ~ error location:", location)

  let errorMessage = "An error occurred."

  if (error.errors && Object.keys(error.errors).length > 0) {
    errorMessage = Object.values(error.errors).flat().join(", ")
  }
  if (error.errorCode && error.msg) {
    errorMessage = error.msg
  } else if (error.status === 401) {
    errorMessage = "Unable to authenticate"
  } else if (error.status === 404) {
    errorMessage = error.message || "Not Found"
  } else if (error.status === 403) {
    errorMessage = "Couldn't find your account"
  } else if (typeof error.response === "string") {
    errorMessage = error.response
  } else if (error?.response?.error_description) {
    errorMessage = error.response.error_description
  } else if (error.response?.error) {
    errorMessage = error.response.error
  } else if (error?.message) {
    errorMessage = error.message
  } else if (typeof error === "string") {
    errorMessage = error
  }

  showMessage({
    message: "Error",
    description: errorMessage,
    type: "danger",
    icon: {
      icon: "auto",
      position: "left",
      props: { color: "white" },
    },
    duration: 3500,
    animated: true,
    animationDuration: 200,
    hideOnPress: true,
    floating: true,
    autoHide: true,
  })
}

export const successHandling = (message: string, location: string) => {
  console.log("🚀 ~ success location:", location)
  showMessage({
    message: "Success",
    description: message,
    type: "success",
    icon: {
      icon: "auto",
      position: "left",
      props: { color: "white" },
    },
    duration: 3500, // duration in milliseconds
    animated: true,
    animationDuration: 200,
    hideOnPress: true,
    floating: true,
    autoHide: true,
  })
}

export const warningHandling = (message: string, location: string) => {
  console.log("🚀 ~ warning location:", location)
  showMessage({
    message: "Warning",
    description: message,
    type: "warning",
    icon: {
      icon: "auto",
      position: "left",
      props: { color: "white" },
    },
    duration: 4000, // duration in milliseconds
    animated: true,
    animationDuration: 200,
    hideOnPress: true,
    floating: true,
    autoHide: true,
  })
}

export const infoHandling = (message: string, location: string) => {
  console.log("🚀 ~ info location:", location)
  showMessage({
    message: "Info",
    description: message,
    type: "info",
    icon: {
      icon: "auto",
      position: "left",
      props: { color: "white" },
    },
    duration: 4000, // duration in milliseconds
    animated: true,
    animationDuration: 200,
    hideOnPress: true,
    floating: true,
    autoHide: true,
  })
}
