'use client'
import { Text, Grid } from '@radix-ui/themes'

import { ProductCard } from '@/common/ui/productCard'
import { IListing } from '@/common/types/listings'

export const ListingList = ({ listings }: { listings: IListing[] }) => {
  return (
    <Grid
      align="center"
      justify="center"
      flow="row"
      columns={{ xs: '2', sm: '3' }}
      gap="6"
      pl="4"
      pr="4"
      width="auto"
    >
      {listings.length === 0 && <Text>Geen advertenties gevonden.</Text>}

      {listings.map((listing) => {
        return (
          <ProductCard
            variant="block"
            listing={listing}
            key={listing.id}
            imageUrl={listing?.frontImage || undefined}
          />
        )
      })}
    </Grid>
  )
}
