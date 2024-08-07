import { Flex, Button, Text } from '@radix-ui/themes'
import { Cross1Icon } from '@radix-ui/react-icons'

import {
  CategoryMapper,
  PlatformMapper,
  ConditionOptionsMapper,
} from '@/common/utils/mappers'

export const FilterButtons = ({ filters, fn }: any) => {
  return (
    <Flex direction="row" gap="4">
      <Text>Actieve filters</Text>
      {filters.category && (
        <Button variant="ghost" onClick={fn.clearCategoryFilter}>
          <Cross1Icon />
          <Text>{CategoryMapper(filters.category)}</Text>
        </Button>
      )}
      {filters.platform && (
        <Button variant="ghost" onClick={fn.clearPlatformFilter}>
          <Cross1Icon />
          <Text>{PlatformMapper(filters.platform)}</Text>
        </Button>
      )}
      {filters.condition && (
        <Button variant="ghost" onClick={fn.clearConditionFilter}>
          <Cross1Icon />
          <Text>{ConditionOptionsMapper(filters.condition)}</Text>
        </Button>
      )}
    </Flex>
  )
}
