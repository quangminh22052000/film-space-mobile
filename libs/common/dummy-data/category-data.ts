import { RecipeCategories } from "../enums/recipeCategories"
import { CategoryType } from "../types/category"

export const categories: CategoryType[] = [
  {
    id: "C-1",
    name: "Noodle",
    type: RecipeCategories.NOODLE,
  },
  {
    id: "C-2",
    name: "Rice",
    type: RecipeCategories.RICE,
  },
]
