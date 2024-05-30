import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export const useGetListingsPerUser = ({
  userId,
}: {
  userId: Id<"users">;
}): {
  listings: any;
  isLoading: boolean;
} => {
  const response = useQuery(api.listings.getListingsPerUser, {
    userId: userId,
  }) as any;

  return {
    listings: response,
    isLoading: !response,
  };
};
