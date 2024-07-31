'use client'
import * as React from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

import { IconButton, Flex } from '@radix-ui/themes'
import { MixerVerticalIcon, Cross1Icon } from '@radix-ui/react-icons'

import { CategoryOptions } from '@/common/utils/categoryOptions'
import { PlatformOptions } from '@/common/utils/platformOptions'
import { ConditionOptions } from '@/common/utils/conditionOptions'
import { Heading } from '@/common/typography'

import styles from './style.module.css'
import { FilterSections } from './filterSections'

export const MobileListingFilters = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const [isExpanded, setIsExpanded] = React.useState(false)

  const handleToggle = () => {
    setIsExpanded((prev) => !prev)
  }

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

  return (
    <>
      <div className={styles.Container}>
        <IconButton size="4" radius="full" onClick={handleToggle}>
          <MixerVerticalIcon />
        </IconButton>
      </div>
      <Flex
        direction="column"
        style={{
          position: 'fixed',
          overflow: 'scroll',
          bottom: 0,
          left: 0,
          width: '100%',
          height: isExpanded ? '100%' : 0,

          transition: 'height 0.3s ease-in-out',
          backgroundColor: 'white',
          zIndex: 9999,
        }}
      >
        <Flex direction="row" justify="between" p="2" align="center">
          <Heading>Filters</Heading>
          <IconButton
            variant="outline"
            size="4"
            radius="full"
            onClick={handleToggle}
          >
            <Cross1Icon />
          </IconButton>
        </Flex>

        <Flex p="4" direction="column" gap="6">
          <FilterSections
            defaultValue={searchParams.get('category')?.toString() || 'ALL'}
            title="Categorie"
            items={[{ name: 'Alles', value: 'ALL' }, ...CategoryOptions]}
            onChange={handleCategoryChange}
          />
          <FilterSections
            items={[
              { name: 'Geen voorkeur', value: 'NOPREFERENCE' },
              ...ConditionOptions,
            ]}
            title="Staat van product"
            onChange={handleConditionChange}
            defaultValue={
              searchParams.get('condition')?.toString() || 'NOPREFERENCE'
            }
          />
          <FilterSections
            defaultValue={searchParams.get('platform')?.toString() || 'ALL'}
            items={[{ name: 'Alles', value: 'ALL' }, ...PlatformOptions]}
            title="Platform"
            onChange={handlePlatformChange}
          />
        </Flex>
      </Flex>
    </>
  )
}
