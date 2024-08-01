'use client'

import { Box, Flex, Text } from '@radix-ui/themes'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

import { Select } from '@/common/form/Select'

import { CategoryOptions } from '@/common/utils/categoryOptions'
import { PlatformOptions } from '@/common/utils/platformOptions'
import { ConditionOptions } from '@/common/utils/conditionOptions'

import useIsSmallScreen from '@/common/hooks/useIsSmallScreen'

import { MobileListingFilters } from '../mobileListingFilters'

export const ListingFilters = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const isSmallScreen = useIsSmallScreen()

  // @TODO: Refactor all these functions to a seperate hook.
  const handleCategoryChange = (e: string) => {
    const value = e
    const params = new URLSearchParams(searchParams)

    if (value) {
      params.set('category', value)
    } else {
      params.delete('category')
    }

    replace(`${pathname}?${params.toString()}`)
  }

  const handleConditionChange = (e: string) => {
    const value = e
    const params = new URLSearchParams(searchParams)

    if (value) {
      params.set('condition', value)
    } else {
      params.delete('condition')
    }

    replace(`${pathname}?${params.toString()}`)
  }

  const handleDateSortChange = (e: string) => {
    const value = e
    const params = new URLSearchParams(searchParams)

    if (value) {
      params.set('sort', value)
    } else {
      params.delete('sort')
    }

    replace(`${pathname}?${params.toString()}`)
  }

  const handlePlatformChange = (e: string) => {
    const value = e
    const params = new URLSearchParams(searchParams)

    if (value) {
      params.set('platform', value)
    } else {
      params.delete('platform')
    }

    replace(`${pathname}?${params.toString()}`)
  }

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
                defaultValue={searchParams.get('category')?.toString() || 'ALL'}
                items={[{ name: 'Alles', value: 'ALL' }, ...CategoryOptions]}
                onChange={handleCategoryChange}
                value={searchParams.get('category')?.toString() || 'ALL'}
              />
            </Flex>
            <Flex direction="column" gap="2">
              <Text weight="medium" as="label">
                Staat van product
              </Text>
              <Select
                defaultValue={
                  searchParams.get('condition')?.toString() || 'NOPREFERENCE'
                }
                items={[
                  { name: 'Geen voorkeur', value: 'NOPREFERENCE' },
                  ...ConditionOptions,
                ]}
                onChange={handleConditionChange}
                value={
                  searchParams.get('condition')?.toString() || 'NOPREFERENCE'
                }
              />
            </Flex>
            <Flex direction="column" gap="2">
              <Text weight="medium" as="label">
                Platform
              </Text>
              <Select
                defaultValue={searchParams.get('platform')?.toString() || 'ALL'}
                items={[{ name: 'Alles', value: 'ALL' }, ...PlatformOptions]}
                onChange={handlePlatformChange}
                value={searchParams.get('platform')?.toString() || 'ALL'}
              />
            </Flex>
          </Flex>
          <Flex direction="column" gap="2">
            <Text weight="medium" as="label">
              Sorteer op datum
            </Text>
            <Select
              defaultValue={
                searchParams.get('sort')?.toString() || 'NOPREFERENCE'
              }
              items={[
                { name: 'Geen voorkeur', value: 'NOPREFERENCE' },
                { name: 'Oud naar nieuw', value: 'OLDTONEW' },
                { name: 'Nieuw naar oud', value: 'NEWTOOLD' },
              ]}
              onChange={handleDateSortChange}
              value={searchParams.get('sort')?.toString() || 'NOPREFERENCE'}
            />
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
