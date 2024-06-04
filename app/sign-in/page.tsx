"use client";

import * as React from "react";
import { OAuthStrategy } from "@clerk/types";
import { useSignIn, useAuth } from "@clerk/clerk-react";
import { FaFacebookSquare, FaGoogle } from "react-icons/fa";
import { Box, Container, Section, Button, Flex } from "@radix-ui/themes";
import { Heading } from "@/common/typography";
import Image from "next/image";

import RetroLinkLogo from "../../public/images/logo.png";

export default function OauthSignIn() {
  // const { isSignedIn } = useAuth();
  const { signIn } = useSignIn();

  if (!signIn) return null;

  const signInWith = (strategy: OAuthStrategy) => {
    return signIn.authenticateWithRedirect({
      strategy,
      redirectUrl: "/sign-up/sso-callback",
      redirectUrlComplete: "/",
    });
  };

  return (
    <Box
      style={{ backgroundColor: "var(--gray-a2)", minHeight: "100vh" }}
      height='100%'
    >
      <Section p={{ initial: "5", sm: "9" }}>
        <Container>
          <Box
            p='5'
            style={{
              backgroundColor: "white",
              borderRadius: "var(--radius-3)",
              boxShadow: "var(--shadow-3",
              alignSelf: "center",
            }}
          >
            <Box p='5' mb='5'>
              <Flex direction='column' justify='center' align='center' gap='6'>
                <Image
                  src={RetroLinkLogo}
                  alt='Login page Retrolink'
                  height={125}
                />
                <Heading size='8' as='h1'>
                  Log in op je account
                </Heading>
              </Flex>
            </Box>
            <Flex direction='column' align='center' gap='6'>
              <Button
                size='4'
                variant='outline'
                onClick={() => signInWith("oauth_facebook")}
              >
                <FaFacebookSquare />
                Log in met Facebook
              </Button>
              <Button
                size='4'
                variant='outline'
                onClick={() => signInWith("oauth_google")}
              >
                <FaGoogle />
                Log in met Google
              </Button>
            </Flex>
          </Box>
        </Container>
      </Section>
    </Box>
  );
}
