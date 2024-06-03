import * as React from "react";
import { Box, Section } from "@radix-ui/themes";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

import { ListingDetail } from "@/features/listingDetail";

export default async function ListingDetailPage(context: any) {
  const listingId = context.params.id;
  const listing = await fetchQuery(api.listings.getListingById, {
    listingId,
  });

  return (
    <Box style={{ backgroundColor: "var(--gray-a2)" }} height='100%'>
      <Section p='9'>
        <ListingDetail listing={listing} />
      </Section>
    </Box>
  );
}
