import * as React from "react";
import Image from "next/image";
import { Text, Box, Card, Inset, Flex, Heading } from "@radix-ui/themes";

import { truncateText } from "@/common/utils/truncateText";
import {
  CategoryMapper,
  PlatformMapper,
  PreferenceOfShippingOptionsMapper,
} from "@/common/utils/mappers";

export const ProductCard = ({ listing }: { listing: any }) => {
  const imageUrl = listing.urls[0];

  return (
    <Box maxWidth='320px'>
      <Card
        variant='classic'
        size='2'
        style={{
          boxShadow: "var(--shadow-3)",
        }}
      >
        <Inset clip='padding-box' side='all' pb='current'>
          <Image
            src={imageUrl}
            alt='Bold typography'
            style={{
              objectFit: "cover",
              width: "100%",
              backgroundColor: "var(--gray-5)",
            }}
            width={600}
            height={180}
          />
        </Inset>
        <Flex direction='column' gap='1' pt='4'>
          <Heading size='5'>{listing.title}</Heading>
          <Flex direction='row' justify='between'>
            <Heading
              style={{
                color: "var(--gray-8)",
              }}
              size='1'
            >
              {CategoryMapper(listing.category)} |{" "}
              {PlatformMapper(listing.platform)}
            </Heading>
          </Flex>
          <Text size='2' mt='2'>
            {truncateText(listing.description)}
          </Text>
          <Flex mt='2' direction='column' justify='between'>
            <Text weight='bold' size='5'>
              €{listing.price}
            </Text>
            <Text size='2' weight='medium' style={{ color: "var(--gray-8)" }}>
              {PreferenceOfShippingOptionsMapper(listing.preferenceOfShipping)}
            </Text>
          </Flex>
        </Flex>
      </Card>
    </Box>
  );
};
