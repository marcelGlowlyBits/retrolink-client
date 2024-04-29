import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

import { IUser } from '@/common/types/users';

export const useGetUserProfile = ({userId}: { userId: Id<"users">}) => {
    const response = useQuery(api.users.getProfile, {
        userId: userId,
      }) as IUser;

    return {
        user: response ? response : {},
        isLoading: !response
    }
}