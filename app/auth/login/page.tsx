import * as React from 'react'

import Link from 'next/link'
import { Box, Container, Section, Flex, Text } from '@radix-ui/themes'
import { Heading } from '@/common/typography'
import Image from 'next/image'

import RetroLinkLogo from '../../../public/images/Logo_bare.png'
import styles from './styles.module.css'

import { SigninForm } from '@/features/auth'

export default function LoginPage() {
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
                <Image
                  src={RetroLinkLogo}
                  alt="Login page Retrolink"
                  height={125}
                />
                <Heading size="8" as="h1">
                  Log in op je account
                </Heading>
              </Flex>
            </Box>
            <SigninForm />
            <Section>
              <Text size="4">
                Heb je nog geen account?{' '}
                <Link href="/auth/register/">Maak hier een account aan.</Link>
              </Text>
            </Section>
          </Box>
        </Container>
      </Section>
    </Box>
  )
}
