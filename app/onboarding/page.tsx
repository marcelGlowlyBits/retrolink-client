import * as React from 'react'
import Link from 'next/image'
import { Box, Container, Section, Flex, Text } from '@radix-ui/themes'
import { Heading } from '@/common/typography'
import { UsernameForm } from '@/features/auth/usernameform'

import styles from './styles.module.css'

export default function OnboardingPage() {
  return (
    <Box
      style={{ backgroundColor: 'var(--gray-a2)', minHeight: '100vh' }}
      height="100%"
    >
      <Section p={{ initial: '5', sm: '9' }}>
        <Container>
          <Box p="5" className={styles.box}>
            <Box p="5" mb="5">
              <Flex direction="column" justify="center" align="center" gap="6">
                <Heading size="8" as="h1">
                  Je account is bijna klaar voor gebruik!
                </Heading>
              </Flex>
            </Box>
            <UsernameForm />

            {/* <Section>
              <Text size="4">Heb je nog geen account? </Text>
            </Section> */}
          </Box>
        </Container>
      </Section>
    </Box>
  )
}
