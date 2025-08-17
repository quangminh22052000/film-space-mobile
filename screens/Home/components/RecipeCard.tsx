import React from "react"

import { Pressable, StyleSheet } from "react-native"
import { Text } from "react-native-paper"
import Animated, { FadeInDown } from "react-native-reanimated"

import { RecipeProps } from "@/libs/common/types/recipe"
import { hp } from "@/libs/common/utils/device/responsive"

type Props = {
  index: number
  recipe: RecipeProps
  handleNavigate: (id: string) => void
  imageAnimatedStyle?: React.ComponentProps<typeof Animated.Image>
}

export const RecipeCard = (props: Props) => {
  const { index, recipe, handleNavigate } = props
  const isEven = index % 2 === 0
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(12)}>
      <Pressable
        onPress={() => handleNavigate(recipe.id)}
        style={[
          styles.main,
          { paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 },
        ]}>
        <Animated.Image
          // source={{ uri: item.image }}
          source={recipe.image}
          sharedTransitionTag={`recipe-${recipe.id}`}
          style={[styles.image, { height: index % 3 === 0 ? hp(35) : hp(25) }]}
          resizeMode="cover"
        />
        <Text style={{ fontSize: hp(1.7), marginTop: 5 }} numberOfLines={1}>
          {recipe.name.length > 20
            ? `${recipe.name.slice(0, 20)}...`
            : recipe.name}
        </Text>
      </Pressable>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    justifyContent: "center",
    marginBottom: 6,
  },
  image: {
    width: "100%",
    borderRadius: 35,
  },
})
