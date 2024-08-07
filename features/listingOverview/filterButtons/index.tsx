import { Flex, Button, Text } from '@radix-ui/themes'
import { Cross1Icon } from '@radix-ui/react-icons'

export const FilterButtons = ({ filters, fn }: any) => {
  return (
    <Flex direction="row" gap="4">
      <Text>Actieve filters</Text>
      {filters.category && (
        <Button variant="ghost" onClick={fn.handleCategoryChange}>
          <Cross1Icon />
          <Text>{filters.category}</Text>
        </Button>
      )}
      {filters.platform && (
        <Button variant="ghost" onClick={fn.handlePlatformChange}>
          <Cross1Icon />
          <Text>{filters.platform}</Text>
        </Button>
      )}
      {filters.condition && (
        <Button variant="ghost" onClick={fn.handleConditionChange}>
          <Cross1Icon />
          <Text>{filters.condition}</Text>
        </Button>
      )}
    </Flex>
  )
}
