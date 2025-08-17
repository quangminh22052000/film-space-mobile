/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosRequestConfig } from "axios"

import { axiosClient } from "@/libs/common/utils/network"

import { LoginPayload } from "../types"

const login = async (payload: LoginPayload, config?: AxiosRequestConfig) => {
  const url = `/login?email=${payload.email}&password=${payload.password}`
  return await axiosClient.post<any>(url, config)
}

export const authAPI = {
  login,
}
