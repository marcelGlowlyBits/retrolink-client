'use client'
import { ListingList } from './listingList'
import { IListing } from '@/common/types/listings'
import { useFiteredListings } from './hooks/useFilteredListings'
import { useFiltering } from './hooks/useFiltering'

import { ListingFilters } from './listingFilters'
import { FilterButtons } from './filterButtons'

export const ListingOverview = ({ listings }: { listings: IListing[] }) => {
  const { filters, sorting, fn } = useFiltering()
  const { filteredListings } = useFiteredListings(listings, filters, sorting)

  return (
    <>
      <FilterButtons {...{ filters, fn }} />
      <ListingFilters {...{ fn, filters, sorting }} />
      <ListingList listings={filteredListings} />
    </>
  )
}
