import * as React from 'react'
import { Box, Container, Section } from '@radix-ui/themes'
import { Heading } from '@/common/typography'

import { ProfileAccountData } from '@/features/profile/profileOverview/profileAccountData'
import { ProfileListingsPerUser } from '@/features/profile/profileListingsPerUser'

import { fetchUserById } from '@/libs/api/user'
import { getMe } from '@/libs/api/me'
import { getListingsByUserId } from '@/libs/api/listings'

export default async function ProfilePage(context: any) {
  const userId = context.params.userId
  const user = await fetchUserById(userId)
  const me = await getMe()
  const listings = await getListingsByUserId(userId)

  const isOwner = Boolean(me?.id === user?.id)

  return (
    <>
      <Box style={{ backgroundColor: 'var(--gray-a2)' }}>
        <Section p={{ initial: '5', sm: '9' }} style={{ paddingBottom: 0 }}>
          <Container>
            <Box pt="5" pr="5" pb="5" pl="0">
              <Heading mb="5" size="7" as="h1">
                Profiel
              </Heading>
            </Box>
            <Box
              p="5"
              style={{
                backgroundColor: 'white',
                borderRadius: 'var(--radius-3)',
                boxShadow: 'var(--shadow-3',
              }}
            >
              <ProfileAccountData user={user} isOwner={isOwner || false} />
            </Box>
          </Container>
        </Section>

        <Section p={{ initial: '5', sm: '9' }}>
          <Container>
            <Box p="5" pr="5" pb="5" pl="0">
              <Heading mb="5" size="7" as="h1">
                Advertenties
              </Heading>
            </Box>
            {listings && (
              <ProfileListingsPerUser listings={listings} isOwner={isOwner} />
            )}
          </Container>
        </Section>
      </Box>
    </>
  )
}
