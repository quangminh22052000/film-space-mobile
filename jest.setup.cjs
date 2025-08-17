/* eslint-env jest */
/* global jest, require, global, console */
/* eslint-disable @typescript-eslint/no-require-imports */
// Basic Jest setup for React Native testing

// Mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
)

// Mock expo modules
jest.mock("expo-constants", () => ({
  default: {
    expoConfig: {
      extra: {
        apiUrl: "http://localhost:3000",
      },
    },
  },
}))

jest.mock("expo-localization", () => ({
  getLocales: () => [
    {
      languageCode: "en",
      countryCode: "US",
      languageTag: "en-US",
      decimalSeparator: ".",
      groupingSeparator: ",",
    },
  ],
  isRTL: false,
}))

jest.mock("expo-font", () => ({
  useFonts: () => [true, null],
}))

jest.mock("expo-splash-screen", () => ({
  hideAsync: jest.fn(),
  preventAutoHideAsync: jest.fn(),
}))

// Mock react-native-vector-icons
jest.mock("react-native-vector-icons/MaterialIcons", () => "Icon")

// Mock expo-image
jest.mock("expo-image", () => ({
  Image: "Image",
}))

// Mock expo-blur
jest.mock("expo-blur", () => ({
  BlurView: "BlurView",
}))

// Mock expo-haptics
jest.mock("expo-haptics", () => ({
  impactAsync: jest.fn(),
  notificationAsync: jest.fn(),
  selectionAsync: jest.fn(),
}))

// Mock expo-location
jest.mock("expo-location", () => ({
  requestForegroundPermissionsAsync: jest.fn(),
  getCurrentPositionAsync: jest.fn(),
}))

// Mock expo-notifications
jest.mock("expo-notifications", () => ({
  requestPermissionsAsync: jest.fn(),
  getPermissionsAsync: jest.fn(),
  scheduleNotificationAsync: jest.fn(),
}))

// Mock expo-camera
jest.mock("expo-camera", () => ({
  Camera: "Camera",
  CameraType: {
    front: "front",
    back: "back",
  },
}))

// Mock react-native-youtube-iframe
jest.mock("react-native-youtube-iframe", () => ({
  YoutubeIframe: "YoutubeIframe",
}))

// Mock react-native-flash-message
jest.mock("react-native-flash-message", () => ({
  showMessage: jest.fn(),
}))

// Mock react-native-gesture-handler
jest.mock("react-native-gesture-handler", () => {
  const View = require("react-native/Libraries/Components/View/View")
  const TouchableOpacity = require("react-native/Libraries/Components/Touchable/TouchableOpacity")

  return {
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    gestureHandlerRootHOC: jest.fn(component => component),
    TouchableHighlight: TouchableOpacity,
    TouchableNativeFeedback: TouchableOpacity,
    TouchableOpacity: TouchableOpacity,
    TouchableWithoutFeedback: TouchableOpacity,
  }
})

// Mock react-native-reanimated
jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock")
  Reanimated.default.call = () => {}
  return Reanimated
})

// Mock @shopify/flash-list
jest.mock("@shopify/flash-list", () => {
  const { FlatList } = require("react-native")
  return FlatList
})

// Mock @react-native-seoul/masonry-list
jest.mock("@react-native-seoul/masonry-list", () => {
  const { FlatList } = require("react-native")
  return FlatList
})

// Mock react-native-webview
jest.mock("react-native-webview", () => ({
  WebView: "WebView",
}))

// Mock react-native-safe-area-context
jest.mock("react-native-safe-area-context", () => ({
  SafeAreaProvider: ({ children }) => children,
  useSafeAreaInsets: () => ({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  }),
}))

// Mock react-native-screens
jest.mock("react-native-screens", () => ({
  enableScreens: jest.fn(),
}))

// Mock @react-navigation/native
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    setOptions: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
  useFocusEffect: jest.fn(),
}))

// Mock expo-router
jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
  useGlobalSearchParams: () => ({}),
  Link: "Link",
  Stack: {
    Screen: "Screen",
  },
}))

// Mock i18next
jest.mock("i18next", () => ({
  t: key => key,
  changeLanguage: jest.fn(),
  use: jest.fn(),
  init: jest.fn(),
}))

// Mock react-i18next
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: key => key,
    i18n: {
      changeLanguage: jest.fn(),
      language: "en",
    },
  }),
}))

// Mock zustand
jest.mock("zustand", () => ({
  create: jest.fn(() => jest.fn()),
  subscribeWithSelector: jest.fn(),
}))

// Mock @tanstack/react-query
jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
  QueryClient: jest.fn(),
  QueryClientProvider: ({ children }) => children,
}))

// Mock axios
jest.mock("axios", () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
  })),
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}))

// Mock formik
jest.mock("formik", () => ({
  Formik: ({ children }) => children,
  useFormik: jest.fn(),
}))

// Mock yup
jest.mock("yup", () => ({
  object: jest.fn(),
  string: jest.fn(),
  number: jest.fn(),
  boolean: jest.fn(),
  array: jest.fn(),
  date: jest.fn(),
}))

// Mock lottie-react-native
jest.mock("lottie-react-native", () => "LottieView")

// Mock @lottiefiles/dotlottie-react
jest.mock("@lottiefiles/dotlottie-react", () => "DotLottiePlayer")

// Mock moti
jest.mock("moti", () => ({
  View: "View",
  Text: "Text",
  Image: "Image",
  AnimatePresence: ({ children }) => children,
}))

// Mock react-native-paper
jest.mock("react-native-paper", () => ({
  Provider: ({ children }) => children,
  Button: "Button",
  Text: "Text",
  TextInput: "TextInput",
  Card: "Card",
  Avatar: "Avatar",
  Badge: "Badge",
  Chip: "Chip",
  Divider: "Divider",
  IconButton: "IconButton",
  List: {
    Item: "ListItem",
  },
  Menu: "Menu",
  Modal: "Modal",
  Portal: "Portal",
  ProgressBar: "ProgressBar",
  RadioButton: "RadioButton",
  Searchbar: "Searchbar",
  SegmentedButtons: "SegmentedButtons",
  Snackbar: "Snackbar",
  Switch: "Switch",
  Title: "Title",
  Paragraph: "Paragraph",
  Caption: "Caption",
  Subheading: "Subheading",
  Headline: "Headline",
  useTheme: () => ({
    colors: {
      primary: "#000",
      background: "#fff",
      surface: "#fff",
      text: "#000",
      placeholder: "#666",
      disabled: "#ccc",
    },
    dark: false,
  }),
}))

// Global test utilities
global.console = {
  ...console,
  // Uncomment to ignore a specific log level
  // log: jest.fn(),
  // debug: jest.fn(),
  // info: jest.fn(),
  // warn: jest.fn(),
  // error: jest.fn(),
}
