import * as React from "react";
import { Box, Section } from "@radix-ui/themes";

import { ListingDetail } from "@/features/listingDetail";
import { fetchListing } from "@/libs/api/listing";

export default async function ListingDetailPage(context: any) {
  const listingId = context.params.id;
  const listing = await fetchListing(listingId);

  if (!listing) return null;

  return (
    <Box
      p={{ xs: "2", sm: "4", md: "5" }}
      style={{ backgroundColor: "var(--gray-a2)" }}
      height='100%'
    >
      <Section p={{ xs: "2", sm: "4", md: "9" }}>
        <ListingDetail listing={listing} />
      </Section>
    </Box>
  );
}
