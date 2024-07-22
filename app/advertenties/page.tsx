import * as React from "react";
import { Box, Container, Section } from "@radix-ui/themes";
import { Heading } from "@/common/typography";

import { ListingOverview } from "@/features/listingOverview";

export default function ListingsOverview() {
  return (
    <Box
      style={{ backgroundColor: "var(--gray-a2)", minHeight: "100vh" }}
      height='100%'
      p={{ xs: "2", sm: "4", md: "5" }}
    >
      <Section p={{ xs: "0", sm: "4", md: "9" }}>
        <Container>
          <Box p='5'>
            <Heading mb='5' size='7' as='h1'>
              Alle advertenties
            </Heading>
          </Box>

          <Box p={{ xs: "2" }}>
            <ListingOverview />
          </Box>
        </Container>
      </Section>
    </Box>
  );
}
