import * as React from 'react'
import { Box, Container, Section } from '@radix-ui/themes'
import { Heading } from '@/common/typography'

import { ListingOverview } from '@/features/listingOverview'
import { getListings } from '@/libs/api/listings'

export default async function ListingsOverview() {
  const listings = await getListings()

  return (
    <Box
      style={{ backgroundColor: 'var(--gray-a2)', minHeight: '100vh' }}
      height="100%"
      p={{ xs: '2', sm: '4', md: '5' }}
    >
      <Section p={{ xs: '0', sm: '4', md: '9' }}>
        <Container align="center">
          <Box p="5">
            <Heading mb="2" size="7" as="h1">
              Alle advertenties
            </Heading>
          </Box>

          <ListingOverview {...{ listings }} />
        </Container>
      </Section>
    </Box>
  )
}
