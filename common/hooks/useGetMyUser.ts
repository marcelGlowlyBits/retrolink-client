import { useSession } from "@/common/hooks/useSession";
import { useQuery } from 'convex/react';

import { api } from '@/convex/_generated/api';

export const useGetMyUser = () => {
    const { isAuthenticated, isLoading: isAuthLoading } = useSession();
    const user = useQuery(
        api.users.getMyUser,
        isAuthLoading || !isAuthenticated ? "skip" : undefined
      );

    return {
        user,
        isLoading: isAuthLoading,
        isAuthenticated,
    }
}