import { create } from "zustand"

interface DialogConfig {
  visible: boolean
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
}

interface AppState {
  count: number
  increase: () => void
  decrease: () => void
  reset: () => void
  //
  loading: boolean
  setLoading: (value: boolean) => void
  // dialog state
  dialog: DialogConfig
  showDialog: (config: Omit<DialogConfig, "visible">) => void
  hideDialog: () => void
  // selected recipe type
  typeName: string
  setTypeName: (name: string) => void
}

export const useAppStore = create<AppState>(set => ({
  count: 0,
  increase: () => set(state => ({ count: state.count + 1 })),
  decrease: () => set(state => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
  //
  loading: false,
  setLoading: value => set({ loading: value }),
  //
  dialog: {
    visible: false,
    title: "",
    message: "",
    confirmText: "OK",
    cancelText: "Cancel",
    onConfirm: undefined,
    onCancel: undefined,
  },

  showDialog: ({
    title,
    message,
    confirmText = "OK",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
  }) =>
    set(() => ({
      dialog: {
        visible: true,
        title,
        message,
        confirmText,
        cancelText,
        onConfirm,
        onCancel,
      },
    })),

  hideDialog: () =>
    set(state => ({
      dialog: {
        ...state.dialog,
        visible: false,
      },
    })),
  //
  typeName: "",
  setTypeName: name => set({ typeName: name }),
}))
