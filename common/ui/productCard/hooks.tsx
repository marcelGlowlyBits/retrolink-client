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

export const useListingCard = ({ listing }: any) => {
  const [isDialogOpen, setDialogOpen] = React.useState(false)
  const toast = useToast()
  const router = useRouter()

  const fn = {
    handleDialog: () => setDialogOpen(!isDialogOpen),
    handleListingDelete: async () => {
      const supabase = createClient()
      const listingId = listing.id

      await supabase
        .from('listings')
        .delete()
        .eq('id', listingId)
        .then(() => {
          fn.handleDialog()
          toast.showToast({ description: 'Listing verwijderd' })
          router.refresh()
        })
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
