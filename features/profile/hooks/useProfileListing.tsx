import * as React from 'react'
import { useRouter } from 'next/navigation'

import {
  CategoryMapper,
  PlatformMapper,
  PreferenceOfShippingOptionsMapper,
} from '@/common/utils/mappers'
import { createClient } from '@/libs/supabase/client'
import { truncateText } from '@/common/utils/truncateText'
import { useToast } from '@/common/hooks/useToast'

import { IListing } from '@/common/types/listings'

export const useProfileListing = ({ listing }: { listing: IListing }) => {
  const [isDialogOpen, setDialogOpen] = React.useState(false)
  const toast = useToast()
  const router = useRouter()

  const fn = {
    handleDialog: () => setDialogOpen(!isDialogOpen),
    handleListingDelete: async () => {
      const supabase = createClient()
      const listingId = listing.id

      // Does listing have images.
      if (listing.images && listing.images.length > 0) {
        // We need to first remove the images from the bucket.
        // After that we delete the listing from the table.
        const { data: listingImagesData, error } = await supabase.storage
          .from('listing_images')
          .list(listingId)

        if (error || listingImagesData.length === 0) {
          fn.handleDialog()
          toast.showToast({
            title: 'Oops!',
            description: 'Er is iets misgegaan',
          })

          return null
        }

        const files = listingImagesData.map((el) => `${listingId}/${el.name}`)

        const { error: removeError } = await supabase.storage
          .from('listing_images')
          .remove(files)

        if (removeError) {
          fn.handleDialog()
          toast.showToast({
            title: 'Oops!',
            description: 'Er is iets misgegaan',
          })

          return null
        }

        await supabase
          .from('listings')
          .delete()
          .eq('id', listingId)
          .then(() => {
            fn.handleDialog()
            toast.showToast({ description: 'Listing verwijderd' })
            router.refresh()
          })

        return null
      } else {
        await supabase
          .from('listings')
          .delete()
          .eq('id', listingId)
          .then(() => {
            fn.handleDialog()
            toast.showToast({ description: 'Listing verwijderd' })
            router.refresh()
          })
      }
    },
  }

  const content = {
    title: listing.title,
    price: `€${listing.price}`,
    createdAt: new Date(listing.created_at).toLocaleDateString('nl-NL'),
    category: CategoryMapper(listing.category),
    platform: PlatformMapper(listing.platform),
    shipping: PreferenceOfShippingOptionsMapper(listing.preferenceOfShipping),
    description: truncateText(listing.description),
    preferenceOfShipping: PreferenceOfShippingOptionsMapper(
      listing.preferenceOfShipping
    ),
  }

  return {
    fn,
    content,
    isDialogOpen,
  }
}
