import {
  AlertDialog as AlertDialogPrimitive,
  Flex,
  Button,
} from '@radix-ui/themes'

type DialogProps = {
  title: string
  description: string
  canceltext: string
  confirmtext: string
  isOpen: boolean
  trigger: React.ReactNode
  cancelAction: () => void
  confirmAction: () => void
}

export const AlertDialog = ({
  title,
  description,
  canceltext,
  confirmtext,
  isOpen,
  trigger,
  cancelAction,
  confirmAction,
}: DialogProps) => {
  return (
    <AlertDialogPrimitive.Root
      open={isOpen}
      onOpenChange={(open) => {
        console.log('open', open)
      }}
    >
      {trigger && (
        <AlertDialogPrimitive.Trigger>{trigger}</AlertDialogPrimitive.Trigger>
      )}
      <AlertDialogPrimitive.Content>
        <AlertDialogPrimitive.Title>{title}</AlertDialogPrimitive.Title>
        <AlertDialogPrimitive.Description size="2">
          {description}
        </AlertDialogPrimitive.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialogPrimitive.Cancel>
            <Button variant="soft" color="gray" onClick={cancelAction}>
              {canceltext}
            </Button>
          </AlertDialogPrimitive.Cancel>
          <AlertDialogPrimitive.Action>
            <Button variant="solid" color="red" onClick={confirmAction}>
              {confirmtext}
            </Button>
          </AlertDialogPrimitive.Action>
        </Flex>
      </AlertDialogPrimitive.Content>
    </AlertDialogPrimitive.Root>
  )
}
