/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query"

import { authAPI } from "../apis"
import { LoginPayload } from "../types"

const login = (payload: LoginPayload) => {
  const { email } = payload
  const { data, isLoading, error } = useQuery<any>({
    queryKey: ["login", email],
    queryFn: () => authAPI.login(payload),
    staleTime: 0,
  })
  return {
    data,
    isLoading,
    error,
  }
}

export const useAuthAPI = {
  login,
}
