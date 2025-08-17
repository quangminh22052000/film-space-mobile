/* eslint-disable @typescript-eslint/no-explicit-any */
import AsyncStorage from "@react-native-async-storage/async-storage"
import { PersistStorage, StorageValue } from "zustand/middleware"

export const zustandStorage: PersistStorage<any> = {
  getItem: async name => {
    const value = await AsyncStorage.getItem(name)
    return value ? (JSON.parse(value) as StorageValue<any>) : null
  },
  setItem: async (name, value) => {
    await AsyncStorage.setItem(name, JSON.stringify(value))
  },
  removeItem: async name => {
    await AsyncStorage.removeItem(name)
  },
}
