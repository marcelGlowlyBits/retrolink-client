import * as React from 'react'
import { Box, Section, Heading, Text, Flex } from '@radix-ui/themes'

export default async function NotfoundPage() {
  return (
    <Box
      p={{ xs: '2', sm: '4', md: '5' }}
      style={{ backgroundColor: 'var(--gray-a2)', minHeight: '100vh' }}
      height="100%"
    >
      <Section p={{ xs: '2', sm: '4', md: '9' }}>
        <Flex direction="column" gap="4">
          <Heading>Oops!</Heading>

          <Text size="5">
            De pagina die je zoekt bestaat niet. Controleer de URL en probeer het
            opnieuw. Als je denkt dat dit een fout is, neem dan contact met ons
          </Text>
        </Flex>
      </Section>
    </Box>
  )
}
