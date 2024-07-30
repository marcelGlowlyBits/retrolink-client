'use client'
import * as React from 'react'
import Link from 'next/link'
import { Text, Button, Flex, IconButton, Container, Box } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import { HamburgerMenuIcon, Cross1Icon } from '@radix-ui/react-icons'
import Image from 'next/image'

import RetrolinkLogo from '../../../../public/images/Logo_bare.png'
import { ProfileAvatar } from '@/common/ui/profileAvatar'
import useIsSmallScreen from '@/common/hooks/useIsSmallScreen'

import { LogoutButton } from './LogoutButton'

export const NavItems = ({
  isAuth,
  me,
  user,
}: {
  isAuth: boolean
  me: any
  user: any | null
}) => {
  const [mobileNavValue, setMobileNavValue] = React.useState('0')
  const isSmallScreen = useIsSmallScreen()
  const isUsername = user?.username || user?.email || null
  const router = useRouter()

  const handleNavValue = () => {
    if (mobileNavValue === '1') return setMobileNavValue('0')
    else {
      return setMobileNavValue('1')
    }
  }

  //   @TODO: implement responsive navigationbar
  if (isSmallScreen)
    return (
      <Box
        p="3"
        style={{
          boxShadow: 'var(--shadow-3',
          backgroundColor: 'white',
          zIndex: 9999,
        }}
        position="absolute"
        width="100%"
      >
        <Flex direction="column">
          <Flex direction="row" justify="between" align="center">
            <Image src={RetrolinkLogo} height={25} alt="Retrolink logo" />
            <IconButton onClick={handleNavValue}>
              {mobileNavValue === '1' ? <Cross1Icon /> : <HamburgerMenuIcon />}
            </IconButton>
          </Flex>
          <Container overflow="hidden" height={mobileNavValue}>
            <Flex direction="column" gap="4">
              <Link href="/advertenties" passHref onClick={handleNavValue}>
                <Text>Advertenties</Text>
              </Link>

              <Link href="/create" passHref onClick={handleNavValue}>
                <Button>Plaats advertentie</Button>
              </Link>

              {!isAuth && (
                <Link href="/auth/login" passHref onClick={handleNavValue}>
                  <Button variant="outline">Inloggen</Button>
                </Link>
              )}

              {me && (
                <ProfileAvatar
                  userId={me.id}
                  username={isUsername}
                  imageUrl={undefined}
                />
              )}

              {me && <LogoutButton closeNav={handleNavValue} />}
            </Flex>
          </Container>
        </Flex>
      </Box>
    )

  return (
    <Box p="3" style={{ boxShadow: 'var(--shadow-3' }}>
      <Container>
        <Flex direction="row" justify="between">
          <Image src={RetrolinkLogo} height={40} alt="Retrolink logo" />
          <Flex direction="row" gap="6" align="center">
            <Link href="/advertenties">
              <Text>Advertenties</Text>
            </Link>

            {!isAuth && (
              <Link href="/auth/login">
                <Button variant="outline">Inloggen</Button>
              </Link>
            )}

            {me && (
              <Flex direction="row" justify="center">
                <ProfileAvatar
                  userId={me.id}
                  username={isUsername}
                  imageUrl={undefined}
                />
                <LogoutButton />
              </Flex>
            )}

            <Link href="/create" passHref>
              <Button>Plaats advertentie</Button>
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}
