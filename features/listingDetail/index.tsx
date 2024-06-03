"use client";
import { Box, Container, Flex, Link } from "@radix-ui/themes";

import { Heading } from "@/common/typography";
import { ImageContainer } from "./components/ImageContainer";
import { SellerContainer } from "./components/SellerContainer";
import { GeneralInformationContainer } from "./components/GeneralInformationContainer";

export const ListingDetail = ({ listing }: any) => {
  const imageUrl = listing.urls[0];

  return (
    <Container>
      <Box p='5' pr='5' pb='5' pl='0'>
        <Link href='/advertenties'>Terug naar advertenties</Link>

        <Flex mt='4' direction='row' justify='between'>
          <Heading mb='5' size='8' as='h1'>
            {listing.title}
          </Heading>
          <Heading mb='5' size='8' as='h1'>
            €{listing.price}
          </Heading>
        </Flex>
      </Box>
      <Flex gap='6' direction='column'>
        <ImageContainer imageUrl={imageUrl} alt={listing.title} />
        <GeneralInformationContainer listing={listing} />
        <SellerContainer sellerId={listing.userId} />
      </Flex>
    </Container>
  );
};
