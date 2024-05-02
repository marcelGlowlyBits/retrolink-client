import { Box, Heading, Container, Section } from "@radix-ui/themes";
import { Fjalla } from "@/common/utils/fonts";

import { CreateListingForm } from "@/features/createListing";

export default function CreateListing() {
  return (
    <Box style={{ backgroundColor: "var(--gray-a2)" }} height='100vh'>
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
            <Heading mb='5' className={Fjalla.className} size='7' as='h1'>
              Advertentie aanmaken
            </Heading>
            <CreateListingForm />
          </Box>
        </Container>
      </Section>
    </Box>
  );
}
