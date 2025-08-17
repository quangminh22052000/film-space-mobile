export type RecipeProps = {
  id: string
  name: string
  typeName: string
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
