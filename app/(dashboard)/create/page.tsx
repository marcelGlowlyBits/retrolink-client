import { Box, Container, Section } from "@radix-ui/themes";
import { Heading } from "@/common/typography";

import { CreateListingForm } from "@/features/createListing";

export default function CreateListing() {
  return (
    <Box style={{ backgroundColor: "var(--gray-a2)" }} height='100%'>
      <Section p='9'>
        <Container>
          <Box
            p='5'
            style={{
              backgroundColor: "white",
              borderRadius: "var(--radius-3)",
              boxShadow: "var(--shadow-3",
            }}
          >
            <Heading>Advertentie aanmaken</Heading>
            <CreateListingForm />
          </Box>
        </Container>
      </Section>
    </Box>
  );
}
