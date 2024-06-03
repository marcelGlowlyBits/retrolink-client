"use client";

import { Spinner, Flex } from "@radix-ui/themes";

import { ProductCard } from "@/common/ui";

import { IListing } from "@/common/types/listings";

export const ListingList = ({
  isLoading,
  listings,
}: {
  isLoading: boolean;
  listings: IListing[];
}) => {
  return (
    <Spinner size='3' loading={isLoading}>
      <Flex direction='column' gap='4'>
        {listings?.map((listing: any, index: number) => {
          return <ProductCard variant='row' listing={listing} key={index} />;
        })}
      </Flex>
    </Spinner>
  );
};
