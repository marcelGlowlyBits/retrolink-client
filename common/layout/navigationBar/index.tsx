import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Box, Flex, Container, Button, Text } from "@radix-ui/themes";

import { getMe } from "@/libs/api/me";

import { ProfileAvatar } from "@/common/ui/profileAvatar";

import RetrolinkLogo from "../../../public/images/Logo_bare.png";

export const NavigationBar = async () => {
  const me = await getMe();

  if (!me) return null;

  return (
    <Box p='3' style={{ boxShadow: "var(--shadow-3" }}>
      <Container>
        <Flex direction='row' justify='between'>
          <Image src={RetrolinkLogo} height={40} alt='Retrolink logo' />

          <Flex direction='row' gap='6' align='center'>
            <Link href='/advertenties'>
              <Text>Advertenties</Text>
            </Link>
            {!me && (
              <Link href='/sign-in'>
                <Button variant='outline'>Inloggen</Button>
              </Link>
            )}

            {me && (
              <ProfileAvatar
                userId={me.id}
                email={me.email}
                imageUrl={undefined}
              />
            )}

            <Link href='/create' passHref>
              <Button>Plaats advertentie</Button>
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};
