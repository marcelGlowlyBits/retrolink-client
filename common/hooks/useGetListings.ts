import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

import { IListing } from '../types/listings';

export const useGetListings = () => {
    const response = useQuery(api.listings.getListings) as IListing[] | undefined;

    return {
        listings: response?.length ? response : [],
        isLoading: !response
    }
}