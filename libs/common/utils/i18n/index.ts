import i18next from "i18next"
import { initReactI18next } from "react-i18next"

import en from "./resources/en"
import vi from "./resources/vi"

i18next.use(initReactI18next).init({
  resources: {
    en: en,
    vi: vi,
  },
  lng: "en", // Ngôn ngữ mặc định
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
})

export default i18next
