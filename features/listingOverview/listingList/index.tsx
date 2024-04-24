"use client"

import { Spinner, Flex } from '@radix-ui/themes';

import { ListingCard } from '@/common/ui/listingCard';

import { IListing } from '@/common/types/listings';

export const ListingList = ({ isLoading, listings}: { isLoading: boolean, listings: IListing[] }) => {
    return (
        <Spinner size="3" loading={isLoading}>
            <Flex direction="column" gap="4">
            {listings?.map((listing) => {
                return (
                    <ListingCard
                        key={listing._id}
                        {...{ ...listing }}
                    />
                )
            })}
            </Flex>
        </Spinner>
    )
}