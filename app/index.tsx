import { useEffect } from "react";

import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { useAuthStore } from "@/libs/auth/store";
import { images } from "@/libs/common/design-system/assets/images";
import { lightColors } from "@/libs/common/design-system/colors";
import { hp } from "@/libs/common/utils/device/responsive";

export default function App() {
  const { token } = useAuthStore();
  const router = useRouter();

  // Animation values
  const ring1Padding = useSharedValue(0);
  const ring2Padding = useSharedValue(0);
  const scaleImage = useSharedValue(0.8);
  const opacityText = useSharedValue(0);
  const translateYText = useSharedValue(10);

  // Ring animation
  useEffect(() => {
    ring1Padding.value = withSpring(hp(5));
    setTimeout(() => {
      ring2Padding.value = withSpring(hp(5.5));
    }, 150);
  }, []);

  // Other animations
  useEffect(() => {
    setTimeout(() => {
      scaleImage.value = withSpring(1);
    }, 300);

    setTimeout(() => {
      opacityText.value = withTiming(1, { duration: 500 });
      translateYText.value = withTiming(0, { duration: 500 });
    }, 600);
  }, []);

  // Navigate after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      // router.replace(token ? "/home" : "/login")
      router.replace("/testing");
    }, 3000);

    return () => clearTimeout(timer);
  }, [token]);

  // Animated styles
  const ring1Style = useAnimatedStyle(() => ({
    padding: ring1Padding.value,
  }));
  const ring2Style = useAnimatedStyle(() => ({
    padding: ring2Padding.value,
  }));
  const imageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleImage.value }],
  }));
  const textContainerStyle = useAnimatedStyle(() => ({
    opacity: opacityText.value,
    transform: [{ translateY: translateYText.value }],
  }));

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: lightColors.welcomeScreenBackground },
      ]}
    >
      <StatusBar style="light" />
      <Animated.View style={[styles.ring2, ring2Style]}>
        <Animated.View style={[styles.ring1, ring1Style]}>
          <Animated.Image
            source={images.welcome}
            style={[styles.image, imageStyle]}
          />
        </Animated.View>
      </Animated.View>

      <Animated.View style={[styles.introContainer, textContainerStyle]}>
        <Text
          style={[
            styles.title,
            styles.textBold,
            { color: lightColors.white, fontSize: hp(3) },
          ]}
        >
          Welcome to food recipe app
        </Text>
        <Text
          variant="bodyLarge"
          style={[{ color: lightColors.white, fontSize: hp(2) }]}
        >
          Recipes were made by Ngọc Thạnh
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ring1: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 230,
  },
  ring2: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 200,
  },
  image: {
    width: hp(20),
    height: hp(20),
    resizeMode: "contain",
  },
  introContainer: {
    width: "100%",
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    marginBottom: 16,
  },
  textBold: {
    fontWeight: "bold",
    letterSpacing: -0.5,
  },
});
