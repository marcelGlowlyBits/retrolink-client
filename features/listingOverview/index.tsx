"use client"

import { useGetListings } from "@/common/hooks/useGetListings";

import { ListingList } from './listingList';

export const ListingOverview = () => {
    const { isLoading, listings } = useGetListings();

    return (
        <ListingList isLoading={isLoading} listings={listings} />
    )
}