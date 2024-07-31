'use client'

import { RadioCards, Text, Flex } from '@radix-ui/themes'

import { Heading } from '@/common/typography'

export const FilterSections = ({
  items,
  title,
  onChange,
  defaultValue,
}: {
  items: any
  title: string
  onChange: (e: any) => void
  defaultValue: string
}) => {
  return (
    <Flex gap="4" direction="column">
      <Heading>{title}</Heading>
      <RadioCards.Root
        defaultValue={defaultValue}
        columns={{ initial: '2' }}
        size="1"
        onValueChange={onChange}
      >
        {items.map((option: any) => (
          <RadioCards.Item key={option.value} value={option.value}>
            <Text weight="medium">{option.name}</Text>
          </RadioCards.Item>
        ))}
      </RadioCards.Root>
    </Flex>
  )
}
