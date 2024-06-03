import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id, DataModel } from "@/convex/_generated/dataModel";

export const useGetListingsPerUser = ({
  userId,
}: {
  userId: Id<"users">;
}): {
  listings: DataModel["listings"][] | undefined;
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
