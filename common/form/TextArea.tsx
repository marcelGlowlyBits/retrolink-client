import * as React from 'react'
import { Flex, TextArea as RadixTextarea, Text } from '@radix-ui/themes'

// eslint-disable-next-line react/display-name
export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  { label: string } & ReturnType<any>
>(
  (
    { onChange, onBlur, name, placeholder, errors, type, disabled, label },
    ref
  ) => (
    <Flex direction="column" gap="2" style={{ maxHeight: '150px' }}>
      {label && <Text>{label}</Text>}
      <RadixTextarea
        variant="surface"
        size="3"
        name={name}
        ref={ref}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
      />
      {errors && <Text color="red">{errors.message}</Text>}
    </Flex>
  )
)
