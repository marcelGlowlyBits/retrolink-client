import { Box, Container, Flex } from '@radix-ui/themes'

import { Heading } from '@/common/typography'
import { toEuros } from '@/common/utils/formatPricing'
import { IListing } from '@/common/types/listings'

import { ImageContainer } from './components/ImageContainer'
import { SellerContainer } from './components/SellerContainer'
import { GeneralInformationContainer } from './components/GeneralInformationContainer'
import { BackButton } from './components/BackButton'

type ListingDetailProps = {
  listing: IListing & { fetchedImages: string[] }
}

export const ListingDetail = ({ listing }: ListingDetailProps) => {
  return (
    <Container p="2">
      <Box p="5" pr="5" pb="5" pl="0">
        <BackButton />

        <Flex mt="4" direction="row" justify="between">
          <Heading mb="5" size="8" as="h1">
            {listing.title}
          </Heading>
          <Heading mb="5" size="8" as="h1">
            {toEuros(listing.price, true)}
          </Heading>
        </Flex>
      </Box>
      <Flex gap="6" direction="column">
        {listing?.images && <ImageContainer images={listing.fetchedImages} />}

        <GeneralInformationContainer listing={listing} />
        <SellerContainer sellerId={listing.user_id} />
      </Flex>
    </Container>
  )
}
