import { Box, Container, Section } from '@radix-ui/themes'
import { Heading } from '@/common/typography'

import { CreateListingForm } from '@/features/createListing'

export default function CreateListing() {
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
            <Heading mb="4">Advertentie aanmaken</Heading>
            <CreateListingForm />
          </Box>
        </Container>
      </Section>
    </Box>
  )
}
