import * as React from "react";

import { Box, Container, Section } from "@radix-ui/themes";
import { Heading } from "@/common/typography";

export default function LoginPage() {
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
            <Heading mb='5' size='7' as='h1'>
              Inloggen
            </Heading>
            {/* Login form will be added here */}
          </Box>
        </Container>
      </Section>
    </Box>
  );
}
