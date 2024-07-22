"use client";
import Link from "next/link";
import { Text, Button } from "@radix-ui/themes";

import { ProfileAvatar } from "@/common/ui/profileAvatar";
import useIsSmallScreen from "@/common/hooks/useIsSmallScreen";

export const NavItems = ({ isAuth, me }: { isAuth: boolean; me: any }) => {
  const isSmallScreen = useIsSmallScreen();

  //   @TODO: implement responsive navigationbar
  if (isSmallScreen) return null;

  return (
    <>
      <Link href='/advertenties'>
        <Text>Advertenties</Text>
      </Link>

      {!isAuth && (
        <Link href='/sign-in'>
          <Button variant='outline'>Inloggen</Button>
        </Link>
      )}

      {me && (
        <ProfileAvatar userId={me.id} email={me.email} imageUrl={undefined} />
      )}

      <Link href='/create' passHref>
        <Button>Plaats advertentie</Button>
      </Link>
    </>
  );
};
