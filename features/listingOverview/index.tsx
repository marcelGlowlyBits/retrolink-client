import { ListingList } from "./listingList";
import { getListings } from "@/libs/api/listings";

export const ListingOverview = async () => {
  const listings = await getListings();

  if (!listings) return null;

  return <ListingList listings={listings} />;
};
