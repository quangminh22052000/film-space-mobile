import { images } from "../design-system/assets/images"
import { RecipeCategories } from "../enums/recipeCategories"
import { CategoryType } from "../types/category"

export const categories: CategoryType[] = [
  {
    id: "C-1",
    name: "Noodle",
    image: images.noodle,
    type: RecipeCategories.NOODLE,
  },
  {
    id: "C-2",
    name: "Rice",
    image: images.rice,
    type: RecipeCategories.RICE,
  },
]
