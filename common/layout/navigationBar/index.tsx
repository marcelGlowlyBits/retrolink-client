import * as React from "react";
import Image from "next/image";
import { Box, Flex, Container } from "@radix-ui/themes";

import { getMe } from "@/libs/api/me";

import RetrolinkLogo from "../../../public/images/Logo_bare.png";
import { NavItems } from "./components/NavItems";

export const NavigationBar = async () => {
  const me = await getMe();

  if (!me) return null;

  return (
    <Box p='3' style={{ boxShadow: "var(--shadow-3" }}>
      <Container>
        <Flex direction='row' justify='between'>
          <Image src={RetrolinkLogo} height={40} alt='Retrolink logo' />
          <Flex direction='row' gap='6' align='center'>
            <NavItems me={me} isAuth={Boolean(me)} />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};
