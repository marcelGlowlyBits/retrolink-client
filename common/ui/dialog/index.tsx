import {
  AlertDialog as AlertDialogPrimitive,
  Spinner,
  Flex,
} from '@radix-ui/themes'

export const Dialog = ({
  isOpen,
  title,
  description,
}: {
  isOpen: boolean
  title: string
  description: string
}) => {
  return (
    <AlertDialogPrimitive.Root open={isOpen}>
      <AlertDialogPrimitive.Content>
        <AlertDialogPrimitive.Title>{title}</AlertDialogPrimitive.Title>
        <Flex direction="row" gap="2" align="center">
          <Spinner size="3" />
          <AlertDialogPrimitive.Description size="3">
            {description}
          </AlertDialogPrimitive.Description>
        </Flex>
      </AlertDialogPrimitive.Content>
    </AlertDialogPrimitive.Root>
  )
}
