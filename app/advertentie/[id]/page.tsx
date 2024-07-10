import * as React from "react";
import { Box, Section } from "@radix-ui/themes";

import { ListingDetail } from "@/features/listingDetail";

export default async function ListingDetailPage(context: any) {
  return (
    <Box style={{ backgroundColor: "var(--gray-a2)" }} height='100%'>
      <Section p='9'>{/* <ListingDetail listing={listing} /> */}</Section>
    </Box>
  );
}
