import { Box, Container, Section, Button, Flex } from "@radix-ui/themes";
import { TrackClick } from "@loglib/tracker/react";

import Link from "next/link";
import Image from "next/image";
import { Heading } from "@/common/typography";

import RetrolinkLogo from "../../../public/images/logo.png";

export const HeroHeader = () => {
  return (
    <Container size='2'>
      <Box p={{ initial: "2", md: "9" }}>
        <Flex direction='column' justify='center'>
          <Image
            src={RetrolinkLogo}
            style={{ alignSelf: "center" }}
            height={250}
            alt='Picture of the author'
            layout='responsive'
          />
          <Section mt='6' size='1'>
            <Flex direction='column' justify='center' align='center' gap='4'>
              <Heading as='h1' size='7'>
                AN ONLINE MARKETPLACE FOR RETROGAME ENTHOUSIASTS.
              </Heading>
              <TrackClick
                name='heroheadercta'
                payload={{ trackedClick: "heroHeaderCTA" }}
              >
                <Link href='/#emaillist' style={{ alignContent: "center" }}>
                  <Button
                    style={{ backgroundColor: "red" }}
                    variant='solid'
                    size='4'
                  >
                    Subscribe voor mailinglist
                  </Button>
                </Link>
              </TrackClick>
            </Flex>
          </Section>
        </Flex>
      </Box>
    </Container>
  );
};
