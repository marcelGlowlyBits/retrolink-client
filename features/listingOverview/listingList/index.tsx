import { Text, Grid } from '@radix-ui/themes'

import { ProductCard } from '@/common/ui/productCard'

import { IListing } from '@/common/types/listings'
import { getListingCardImage } from '@/libs/api/listings'

export const ListingList = ({ listings }: { listings: IListing[] }) => {
  return (
    <Grid
      align="center"
      columns={{ xs: '2', sm: '3' }}
      gap={{ xs: '4', sm: '4' }}
      width="auto"
    >
      {listings.length === 0 && <Text>Geen advertenties gevonden.</Text>}

      {listings?.map((listing: any, index: number) => {
        // Here we need to fetch the url to the image
        const images = listing?.images

        if (images && images.length > 0) {
          const firstImage = images[0]

          const imageUrl = getListingCardImage(firstImage)

          return (
            <ProductCard
              variant="block"
              listing={listing}
              key={index}
              imageUrl={imageUrl}
            />
          )
        } else {
          return <ProductCard variant="row" listing={listing} key={index} />
        }
      })}
    </Grid>
  )
}
