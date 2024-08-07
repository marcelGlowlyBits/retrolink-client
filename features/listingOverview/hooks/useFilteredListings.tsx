import { IListing } from '@/common/types/listings'

// @TODO: Category moet een enum zijn van de categoryMapper
type FilterType = {
  category: string | null
  condition: string | null
  platform: string | null
}

export const useFiteredListings = (
  listings: IListing[],
  filters: FilterType,
  sort: { date: string | null }
) => {
  console.log('filters', filters)

  return {
    filteredListings: listings
      .filter((listing) => {
        if (filters.category === 'ALL' || !filters.category) {
          return true
        }

        if (filters.category && listing.category !== filters.category) {
          return false
        }

        return true
      })
      .filter((listing) => {
        if (filters.condition === 'NOPREFERENCE' || !filters.condition) {
          return true
        }

        if (filters.condition && listing.condition !== filters.condition) {
          return false
        }

        return true
      })
      .filter((listing) => {
        if (filters.platform === 'ALL' || !filters.platform) {
          return true
        }

        if (filters.platform && listing.platform !== filters.platform) {
          return false
        }

        return true
      })
      .sort((a, b) => {
        if (sort.date === 'NOPREFERENCE' || !sort.date) {
          return 0
        }

        if (sort.date === 'OLDTONEW') {
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          )
        }

        if (sort.date === 'NEWTOOLD') {
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          )
        }

        return 0
      }),
  }
}
