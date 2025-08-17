import React, { useMemo } from "react"

import MasonryList from "@react-native-seoul/masonry-list"
import { useRouter } from "expo-router"
import { StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"

import { cookingRecipeData } from "@/libs/common/dummy-data"
import { useAppStore } from "@/libs/common/store"
import { RecipeProps } from "@/libs/common/types/recipe"
import { hp } from "@/libs/common/utils/device/responsive"

import { RecipeCard } from "./RecipeCard"

export const Recipies = () => {
  const router = useRouter()

  const { typeName } = useAppStore()

  const filteredRecipes = useMemo(() => {
    return cookingRecipeData.filter(recipe => recipe.typeName === typeName)
  }, [typeName])

  const handleNavigate = (recipeId: string) => {
    router.push({
      pathname: "/recipe-detail",
      params: {
        id: recipeId,
      },
    })
  }
  return (
    <View style={styles.main}>
      <Text style={[styles.title, styles.textBold, { fontSize: hp(3) }]}>
        Recipies
      </Text>
      <MasonryList
        data={typeName ? filteredRecipes : cookingRecipeData}
        keyExtractor={(item: RecipeProps) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, i }) => (
          <RecipeCard
            index={i}
            recipe={item as RecipeProps}
            handleNavigate={handleNavigate}
          />
        )}
        onEndReachedThreshold={0.1}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: "100%",
    marginVertical: 10,
  },
  title: {
    marginBottom: 10,
  },
  textBold: {
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
})
