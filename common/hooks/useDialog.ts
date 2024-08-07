// @ts-nocheck
import { useDialogStore } from '@/stores/useDialogStore'

export const useDialog = () => {
  const openDialog = (payload: any) => {
    return useDialogStore.getState().activateDialog(payload)
  }

  const closeDialog = () => {
    return useDialogStore.getState().deactivateDialog()
  }

  return {
    openDialog,
    closeDialog,
  }
}
