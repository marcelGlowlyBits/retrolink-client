import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import {
  ICategoryFilter,
  IConditionFilter,
  IPLatformFilter,
} from '@/common/types/listings'

export const useFiltering = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const categoryFilter = searchParams.get('category') as ICategoryFilter
  const conditionFilter = searchParams.get('condition') as IConditionFilter
  const platformFilter = searchParams.get('platform') as IPLatformFilter
  const dateSorting = searchParams.get('sort')

  const fn = {
    clearConditionFilter: () => {
      const params = new URLSearchParams(searchParams)
      params.delete('condition')
      replace(`${pathname}?${params.toString()}`)
    },
    clearPlatformFilter: () => {
      const params = new URLSearchParams(searchParams)
      params.delete('platform')
      replace(`${pathname}?${params.toString()}`)
    },
    clearCategoryFilter: () => {
      const params = new URLSearchParams(searchParams)
      params.delete('category')
      replace(`${pathname}?${params.toString()}`)
    },
    handleCategoryChange: (e: string) => {
      const value = e
      const params = new URLSearchParams(searchParams)

      if (value) {
        params.set('category', value)
      } else {
        params.delete('category')
      }

      replace(`${pathname}?${params.toString()}`)
    },
    handleConditionChange: (e: string) => {
      const value = e
      const params = new URLSearchParams(searchParams)

      if (value) {
        params.set('condition', value)
      } else {
        params.delete('condition')
      }

      replace(`${pathname}?${params.toString()}`)
    },
    handleDateSortChange: (e: string) => {
      const value = e
      const params = new URLSearchParams(searchParams)

      if (value) {
        params.set('sort', value)
      } else {
        params.delete('sort')
      }

      replace(`${pathname}?${params.toString()}`)
    },
    handlePlatformChange: (e: string) => {
      const value = e
      const params = new URLSearchParams(searchParams)

      if (value) {
        params.set('platform', value)
      } else {
        params.delete('platform')
      }

      replace(`${pathname}?${params.toString()}`)
    },
  }

  const filters = {
    category: categoryFilter,
    condition: conditionFilter,
    platform: platformFilter,
  }

  const sorting = {
    date: dateSorting,
  }

  return {
    fn,
    filters,
    sorting,
  }
}
