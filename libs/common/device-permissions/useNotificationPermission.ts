import { useState, useEffect } from "react"

import * as Notifications from "expo-notifications"
import { Alert } from "react-native"

export const useNotificationPermission = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)

  useEffect(() => {
    ;(async () => {
      const { status } = await Notifications.requestPermissionsAsync()
      if (status === "granted") {
        setHasPermission(true)
      } else {
        setHasPermission(false)
        Alert.alert(
          "Quyền gửi thông báo bị từ chối",
          "Vui lòng vào Cài đặt và cấp quyền thông báo cho ứng dụng.",
          [{ text: "OK" }],
        )
      }
    })()
  }, [])

  return hasPermission
}
