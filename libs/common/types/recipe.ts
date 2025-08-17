/* eslint-disable @typescript-eslint/no-explicit-any */
export type RecipeProps = {
  id: string
  name: string
  typeName: string
  image: any
  description: string
  cookingTime: string
  numberOfServing: string
  numberOfCalories: string
  levelOfDifficulty: string
  ingredients: {
    name: string
    quantity: string
  }[]
  instructions: string[]
  recipeVideoUrl: string
}
