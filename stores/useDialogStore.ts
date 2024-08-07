// @ts-nocheck
import { create } from 'zustand'

export const useDialogStore = create((set) => ({
  dialogOpen: false,
  dialogTitle: '',
  dialogDescription: '',
  activateDialog: (payload) => {
    set((state) => {
      return {
        dialogOpen: !state.dialogOpen,
        dialogTitle: payload.title,
        dialogDescription: payload.description,
      }
    })
  },
  deactivateDialog: () => {
    set((state) => {
      return {
        dialogOpen: !state.dialogOpen,
        dialogTitle: '',
        dialogDescription: '',
      }
    })
  },
}))
