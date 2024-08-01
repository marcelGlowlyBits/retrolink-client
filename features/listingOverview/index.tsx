'use client'
import { useSearchParams } from 'next/navigation'

import { ListingList } from './listingList'
import { IListing } from '@/common/types/listings'
import { useFiteredListings } from './hooks/useFilteredListings'

import { ListingFilters } from './listingFilters'

export const ListingOverview = ({ listings }: { listings: IListing[] }) => {
  const searchParams = useSearchParams()
  const categoryFilter = searchParams.get('category')
  const conditionFilter = searchParams.get('condition')
  const platformFilter = searchParams.get('platform')
  const dateSorting = searchParams.get('sort')

  const { filteredListings } = useFiteredListings(
    listings,
    {
      category: categoryFilter,
      condition: conditionFilter,
      platform: platformFilter,
    },
    {
      date: dateSorting,
    }
  )

  return (
    <>
      <ListingFilters />
      <ListingList listings={filteredListings} />
    </>
  )
}
