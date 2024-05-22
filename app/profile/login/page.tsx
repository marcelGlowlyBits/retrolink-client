import * as React from "react";

import { Fjalla } from "@/common/utils/fonts";
import { Box, Heading, Container, Section } from "@radix-ui/themes";

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
            <Heading className={Fjalla.className} mb='5' size='7' as='h1'>
              Inloggen
            </Heading>
            {/* Login form will be added here */}
          </Box>
        </Container>
      </Section>
    </Box>
  );
}
