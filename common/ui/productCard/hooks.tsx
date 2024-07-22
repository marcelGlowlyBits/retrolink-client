import * as React from 'react'
import {
  CategoryMapper,
  PlatformMapper,
  PreferenceOfShippingOptionsMapper,
} from '@/common/utils/mappers'

import { truncateText } from '@/common/utils/truncateText'

export const useListingCard = ({ listing }: any) => {
  const [isDialogOpen, setDialogOpen] = React.useState(false)

  const fn = {
    handleDialog: () => setDialogOpen(!isDialogOpen),
    handleListingDelete: () => {
      alert('dit komt nog')
    },
  }

  const content = {
    title: listing.title,
    price: `€${listing.price}`,
    createdAt: new Date().toLocaleDateString(listing.createdAt),
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
