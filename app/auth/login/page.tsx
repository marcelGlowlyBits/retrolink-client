import * as React from 'react'

import Link from 'next/link'
import { Box, Container, Section, Text } from '@radix-ui/themes'
import { Heading } from '@/common/typography'

import { SigninForm } from '@/features/auth'

export default function LoginPage() {
  return (
    <Box
      style={{ backgroundColor: 'var(--gray-a2)', minHeight: '100vh' }}
      height="100%"
    >
      <Container p={{ initial: '5', md: '9' }}>
        <Section pt={{ sm: '9', md: '2' }}>
          <Heading size="8" as="h1">
            Log in op je account
          </Heading>
        </Section>
        <Box p={{ sm: '2', md: '5' }}>
          <SigninForm />
        </Box>
        <Section>
          <Text size="4">
            Heb je nog geen account?{' '}
            <Link href="/auth/register/">Maak hier een account aan.</Link>
          </Text>
        </Section>
      </Container>
    </Box>
  )
}
