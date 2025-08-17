import { useState, useEffect } from "react"

import * as Location from "expo-location"
import { Alert } from "react-native"

export const useLocationPermission = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)

  useEffect(() => {
    ;(async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status === "granted") {
        setHasPermission(true)
      } else {
        setHasPermission(false)
        Alert.alert(
          "Quyền truy cập vị trí bị từ chối",
          "Vui lòng vào Cài đặt và cấp quyền vị trí cho ứng dụng.",
          [{ text: "OK" }],
        )
      }
    })()
  }, [])

  return hasPermission
}
