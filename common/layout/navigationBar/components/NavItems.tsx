'use client'
import Link from 'next/link'
import { Text, Button, Flex } from '@radix-ui/themes'

import { ProfileAvatar } from '@/common/ui/profileAvatar'
import useIsSmallScreen from '@/common/hooks/useIsSmallScreen'

import { LogoutButton } from './LogoutButton'

export const NavItems = ({ isAuth, me }: { isAuth: boolean; me: any }) => {
  const isSmallScreen = useIsSmallScreen()

  //   @TODO: implement responsive navigationbar
  if (isSmallScreen) return null

  return (
    <>
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
          <ProfileAvatar userId={me.id} email={me.email} imageUrl={undefined} />
          <LogoutButton />
        </Flex>
      )}

      <Link href="/create" passHref>
        <Button>Plaats advertentie</Button>
      </Link>
    </>
  )
}
