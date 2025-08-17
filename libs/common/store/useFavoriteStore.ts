// libs/common/store/favoriteStore.ts
import { create } from "zustand"
import { persist } from "zustand/middleware"

import { zustandStorage } from "./zustandStorage"

interface FavoriteStore {
  favoriteIds: string[]
  addFavorite: (id: string) => void
  removeFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favoriteIds: [],
      addFavorite: id => {
        if (!get().favoriteIds.includes(id)) {
          set(state => ({
            favoriteIds: [...state.favoriteIds, id],
          }))
        }
      },
      removeFavorite: id =>
        set(state => ({
          favoriteIds: state.favoriteIds.filter(favId => favId !== id),
        })),
      isFavorite: id => get().favoriteIds.includes(id),
    }),
    {
      name: "favorite-recipes",
      storage: zustandStorage,
    },
  ),
)
