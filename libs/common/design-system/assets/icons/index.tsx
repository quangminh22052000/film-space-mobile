/* eslint-disable @typescript-eslint/no-explicit-any */
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons"

export const icons = {
  home: (props: any) => <AntDesign name="home" size={26} {...props} />,
  favorites: (props: any) => <AntDesign name="heart" size={26} {...props} />,
  settings: (props: any) => (
    <Ionicons name="settings-sharp" size={26} {...props} />
  ),
  testing: (props: any) => <Feather name="compass" size={26} {...props} />,
}
