import React from "react"

import { FlatList, StyleSheet, View } from "react-native"
import Animated, { FadeInDown } from "react-native-reanimated"

import { categories } from "@/libs/common/dummy-data"
import { useAppStore } from "@/libs/common/store"

import { CategoryItem } from "./CategoryItem"

export const Categories = () => {
  const { typeName, setTypeName } = useAppStore()

  return (
    <View style={styles.main}>
      {/* <SelectSearch
        data={[{ id: "1", label: "Item 1" }]}
        onSelect={() => {}}
        placeholder="Search any recipe"
      /> */}
      <Animated.View entering={FadeInDown.duration(500).springify()}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) =>
            item.id ? item.id.toString() : index.toString()
          }
          renderItem={({ item }) => (
            <CategoryItem
              {...item}
              activeCategory={typeName}
              setActiveCategory={setTypeName}
            />
          )}
        />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    marginVertical: 10,
    gap: 10,
  },
})
