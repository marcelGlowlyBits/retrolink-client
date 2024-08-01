import { Box, Container, Flex } from '@radix-ui/themes'

import { Heading } from '@/common/typography'
import { ImageContainer } from './components/ImageContainer'
import { SellerContainer } from './components/SellerContainer'
import { GeneralInformationContainer } from './components/GeneralInformationContainer'
import { BackButton } from './components/BackButton'

export const ListingDetail = ({ listing }: any) => {
  return (
    <Container>
      <Box p="5" pr="5" pb="5" pl="0">
        <BackButton />

        <Flex mt="4" direction="row" justify="between">
          <Heading mb="5" size="8" as="h1">
            {listing.title}
          </Heading>
          <Heading mb="5" size="8" as="h1">
            €{listing.price}
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
