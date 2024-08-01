"use client";
import { Box, Section, Grid, Text, Flex, Button } from "@radix-ui/themes";
import { TrackView } from "@loglib/tracker/react";

import Image from "next/image";

import { Fjalla } from "@/common/utils/fonts";
import { Heading } from "@/common/typography";

import CreateListingImage from "../../../public/images/createAdvert.png";

export const ProductBlock = () => {
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <TrackView name='productblock' payload={{ trackedView: "productBlock" }}>
      <Section minHeight='600px' mb='0' p='0'>
        <Grid
          columns={{ initial: "1", md: "2" }}
          width='auto'
          gap={{ initial: "4", md: "0" }}
        >
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
              COMMUNITY WITHIN REACH.
            </Heading>
            <Flex direction='column' gap='4'>
              <Text weight='medium' size='5'>
                De nieuwe online marktplaats voor de gaming community in
                Nederland en Belgie. Koop of verkoop je games via het Retrolink
                platform.
              </Text>
              <Text weight='medium' mb='9' size='5'>
                Vertrouwde verkopers en een breed aanbod van games, consoles,
                merchandise en nostalgia products.
              </Text>
              <Button
                onClick={scrollToBottom}
                variant='outline'
                size='4'
                style={{ maxWidth: "fit-content" }}
              >
                Houd me op de hoogte
              </Button>
            </Flex>
          </Box>
          <Box
            style={{ backgroundColor: "var(--gray-3)" }}
            p={{ initial: "0", md: "9" }}
          >
            <Image
              src={CreateListingImage}
              alt='Een advertentie maken op Retrlink'
              layout='responsive'
            />
          </Box>
        </Grid>
      </Section>
    </TrackView>
  );
};
