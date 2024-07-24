'use client'
import * as React from 'react'
import { Select as RadixSelect, Flex, Text } from '@radix-ui/themes'

type RadixSelectProps = {
  defaultValue: string | undefined
  items: any[]
  disabled?: boolean
  label?: string
  onChange: (value: string) => void
  value: string
}

// eslint-disable-next-line react/display-name
export const Select = React.forwardRef<HTMLInputElement, RadixSelectProps>(
  ({ defaultValue, disabled, items, label, onChange, value }, ref) => {
    return (
      <Flex direction="column" gap="2" style={{ maxHeight: '150px' }}>
        {label && <Text>{label}</Text>}
        <RadixSelect.Root
          disabled={disabled}
          value={value}
          onValueChange={onChange}
        >
          <RadixSelect.Trigger />
          <RadixSelect.Content>
            {items.map((item) => (
              <RadixSelect.Item key={item.value} value={item.value}>
                {item.name}
              </RadixSelect.Item>
            ))}
          </RadixSelect.Content>
        </RadixSelect.Root>
      </Flex>
    )
  }
)
