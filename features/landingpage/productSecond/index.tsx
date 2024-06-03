import { Box, Section, Grid, Text, Flex } from "@radix-ui/themes";
import { TrackView } from "@loglib/tracker/react";
import { Heading } from "@/common/typography";

import Image from "next/image";

import ListViewAdvert from "../../../public/images/listviewAdvert.png";

export const ProductBlockSecond = () => {
  return (
    <TrackView name='productblock' payload={{ trackedView: "productBlock" }}>
      <Section minHeight='600px' pt='0'>
        <Grid
          columns={{ initial: "1", md: "2" }}
          width='auto'
          gap={{ initial: "4", md: "0" }}
        >
          <Box
            style={{ backgroundColor: "var(--gray-3)" }}
            p={{ initial: "0", md: "9" }}
          >
            <Image
              src={ListViewAdvert}
              alt='Een advertentie maken op Retrlink'
              layout='responsive'
            />
          </Box>
          <Box
            p={{ initial: "0", md: "9" }}
            style={{
              display: "flex",
              alignContent: "center",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Heading mb='8' as='h3' size='9'>
              NOSTALGIA GUARANTEED
            </Heading>
            <Flex direction='column' gap='4'>
              <Text weight='medium' mb='9' size='5'>
                Chat met andere gebruikers. Vind de dichtsbijzijnde Retro game
                verkoper. Of bespreek simpelweg de nostalgische waarde van dat
                ene N64 spel. De gehele retro game community van Nederland en
                Belgie komt samen op Retrolink. Particuliere verkopers of
                professionele webshops.
              </Text>
            </Flex>
          </Box>
        </Grid>
      </Section>
    </TrackView>
  );
};
