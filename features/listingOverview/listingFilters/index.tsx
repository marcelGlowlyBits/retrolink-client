'use client'

import { Box, Flex, Text } from '@radix-ui/themes'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

import { Select } from '@/common/form/Select'

import { CategoryOptions } from '@/common/utils/categoryOptions'
import { PlatformOptions } from '@/common/utils/platformOptions'
import { ConditionOptions } from '@/common/utils/conditionOptions'

import useIsSmallScreen from '@/common/hooks/useIsSmallScreen'

import { MobileListingFilters } from '../mobileListingFilters'

export const ListingFilters = ({ fn, filters, sorting }: any) => {
  const searchParams = useSearchParams()

  const isSmallScreen = useIsSmallScreen()

  if (isSmallScreen) return <MobileListingFilters />

  return (
    <>
      <Box p={{ xs: '2', sm: '4', md: '5' }}>
        <Flex direction="row" justify="between">
          <Flex direction="row" gap="6">
            <Flex direction="column" gap="2">
              <Text weight="medium" as="label">
                Categorie
              </Text>
              <Select
                defaultValue={filters.category || 'ALL'}
                items={[{ name: 'Alles', value: 'ALL' }, ...CategoryOptions]}
                onChange={fn.handleCategoryChange}
                value={filters.category || 'ALL'}
              />
            </Flex>
            <Flex direction="column" gap="2">
              <Text weight="medium" as="label">
                Staat van product
              </Text>
              <Select
                defaultValue={filters.condition || 'NOPREFERENCE'}
                items={[
                  { name: 'Geen voorkeur', value: 'NOPREFERENCE' },
                  ...ConditionOptions,
                ]}
                onChange={fn.handleConditionChange}
                value={filters.condition || 'NOPREFERENCE'}
              />
            </Flex>
            <Flex direction="column" gap="2">
              <Text weight="medium" as="label">
                Platform
              </Text>
              <Select
                defaultValue={filters.platform || 'ALL'}
                items={[{ name: 'Alles', value: 'ALL' }, ...PlatformOptions]}
                onChange={fn.handlePlatformChange}
                value={filters.platform || 'ALL'}
              />
            </Flex>
          </Flex>
          <Flex direction="column" gap="2">
            <Text weight="medium" as="label">
              Sorteer op datum
            </Text>
            <Select
              defaultValue={sorting.date || 'NOPREFERENCE'}
              items={[
                { name: 'Geen voorkeur', value: 'NOPREFERENCE' },
                { name: 'Oud naar nieuw', value: 'OLDTONEW' },
                { name: 'Nieuw naar oud', value: 'NEWTOOLD' },
              ]}
              onChange={fn.handleDateSortChange}
              value={sorting.date || 'NOPREFERENCE'}
            />
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
