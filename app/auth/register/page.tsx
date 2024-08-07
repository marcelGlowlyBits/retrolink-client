import * as React from 'react'

import Link from 'next/link'
import { Box, Container, Section, Flex, Text } from '@radix-ui/themes'
import { Heading } from '@/common/typography'

import { SignupForm } from '@/features/auth'

export default function LoginPage() {
  return (
    <Box
      style={{ backgroundColor: 'var(--gray-a2)', minHeight: '100vh' }}
      height="100%"
    >
      <Container p={{ initial: '5', md: '9' }}>
        <Section pt={{ sm: '9', md: '2' }}>
          <Heading size="8" as="h1">
            Maak een account aan
          </Heading>
        </Section>
        <Box p={{ sm: '2', md: '5' }}>
          <SignupForm />
        </Box>
        <Section>
          <Text size="4">
            Heb je al een account?{' '}
            <Link href="/auth/login/">Log hier in op je bestaande account</Link>
          </Text>
        </Section>
      </Container>
    </Box>
  )
}
