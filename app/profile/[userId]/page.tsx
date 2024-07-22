import * as React from 'react'
import { Box, Container, Section } from '@radix-ui/themes'
import { Heading } from '@/common/typography'

import { ProfileAccountData } from '@/features/profile/profileOverview/profileAccountData'
import { ProfileListingsPerUser } from '@/features/profile/profileListingsPerUser'

import { fetchUserById } from '@/libs/api/user'

export default async function ProfilePage(context: any) {
  const userId = context.params.userId
  const user = await fetchUserById(userId)

  if (!user) return null
  // @TODO: Add a check if the user is the same as the logged in user

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
              {/* <ProfileAccountData userId={params} /> */}
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
            {/* <ProfileListingsPerUser userId={params} /> */}
          </Container>
        </Section>
      </Box>
    </>
  )
}
