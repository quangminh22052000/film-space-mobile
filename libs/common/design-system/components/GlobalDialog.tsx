import React from "react"

import { Button, Dialog, Paragraph, Portal } from "react-native-paper"

import { useAppStore } from "../../store"

export const GlobalDialog = () => {
  const dialog = useAppStore(state => state.dialog)
  const hideDialog = useAppStore(state => state.hideDialog)

  const handleConfirm = () => {
    hideDialog()
    dialog.onConfirm?.()
  }

  const handleCancel = () => {
    hideDialog()
    dialog.onCancel?.()
  }

  return (
    <Portal>
      <Dialog visible={dialog.visible} onDismiss={hideDialog}>
        {dialog.title && <Dialog.Title>{dialog.title}</Dialog.Title>}
        {dialog.message && (
          <Dialog.Content>
            <Paragraph>{dialog.message}</Paragraph>
          </Dialog.Content>
        )}
        <Dialog.Actions>
          {dialog.cancelText && (
            <Button onPress={handleCancel}>{dialog.cancelText}</Button>
          )}
          {dialog.confirmText && (
            <Button onPress={handleConfirm}>{dialog.confirmText}</Button>
          )}
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}
