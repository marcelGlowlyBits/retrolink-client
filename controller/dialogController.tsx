// @ts-nocheck

import { Dialog } from '@/common/ui/dialog'
import { useDialogStore } from '@/stores/useDialogStore'

export const DialogController = () => {
  const dialogOpen = useDialogStore((state) => state.dialogOpen)
  const dialogTitle = useDialogStore((state) => state.dialogTitle)
  const dialogDescription = useDialogStore((state) => state.dialogDescription)

  return (
    <Dialog
      isOpen={dialogOpen}
      title={dialogTitle}
      description={dialogDescription}
    />
  )
}
