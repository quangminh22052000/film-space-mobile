import { create } from "zustand"

interface AuthState {
  token: string
  setToken: (token: string) => void
}

export const useAuthStore = create<AuthState>(set => ({
  token: "",
  setToken: (token: string) => set({ token }),
}))
