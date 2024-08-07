import { redirect } from 'next/navigation'
import { Box, Container, Section } from '@radix-ui/themes'

import { Heading } from '@/common/typography'

import { fetchListing } from '@/libs/api/listing'
import { getMe } from '@/libs/api/me'
import { ListingEditForm } from '@/features/listing'

export default async function EditListing(context: any) {
  const listingId = context.params.listingId

  if (!listingId) {
    return
  }

  const user = await getMe()

  if (!user) {
    redirect('/auth/login')
  }

  const listing = await fetchListing(listingId)
  const isOwner = Boolean(listing.user_id === user.id)

  if (!isOwner) {
    redirect('/')
  }

  return (
    <Box
      p={{ xs: '2', sm: '4', md: '5' }}
      style={{ backgroundColor: 'var(--gray-a2)' }}
      height="100%"
    >
      <Section p={{ xs: '2', sm: '4', md: '9', lg: '9' }}>
        <Container>
          <Box
            p="5"
            style={{
              backgroundColor: 'white',
              borderRadius: 'var(--radius-3)',
              boxShadow: 'var(--shadow-3',
            }}
          >
            <Heading mb="4">Advertentie aanpassen</Heading>
            <ListingEditForm listing={listing} />
          </Box>
        </Container>
      </Section>
    </Box>
  )
}
