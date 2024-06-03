"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Box, Flex, Container, Button, Text } from "@radix-ui/themes";
import { SignInButton } from "@clerk/clerk-react";
import { useGetMyUser } from "@/common/hooks/useGetMyUser";

import { ProfileAvatar } from "@/common/ui/profileAvatar";

import RetrolinkLogo from "../../../public/images/Logo_bare.png";

export const NavigationBar = () => {
  const { user, isLoading, isAuthenticated } = useGetMyUser();

  return (
    <Box p='3' style={{ boxShadow: "var(--shadow-3" }}>
      <Container>
        <Flex direction='row' justify='between'>
          <Image src={RetrolinkLogo} height={40} alt='Retrolink logo' />

          <Flex direction='row' gap='6' align='center'>
            <Link href='/advertenties'>
              <Text>Advertenties</Text>
            </Link>
            {!isAuthenticated && !isLoading && (
              <SignInButton>
                <Button variant='outline'>Inloggen</Button>
              </SignInButton>
            )}

            {user && isAuthenticated && <ProfileAvatar user={user} />}

            <Link href='/create' passHref>
              <Button>Plaats advertentie</Button>
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};
