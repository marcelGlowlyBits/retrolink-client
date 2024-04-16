import { Box, Section, Heading, Container, Text, Flex } from '@radix-ui/themes';
import { Fjalla } from '@/common/utils/fonts';

export const SubscribeBlock = () => {
    return (
        <Container size="4" minHeight="600px">
        <Box py="9">
            <Section size="4">
                <Flex direction="column">
                    <Box>
                        <Heading className={Fjalla.className} align="center" as="h1" mb="4" size="9">WE WILL KEEP YOU POSTED</Heading>
                        <Text weight="medium" align="center" size="5">Schrijf je in voor de nieuwsbrief en wij houden je op de hoogte. De nieuwste ontwikkelingen van Retrolink, zo in je mailbox.</Text>
                    </Box>
                    <Box>
                        <Heading className={Fjalla.className} align="center" as="h1" mb="4" size="9">WE WILL KEEP YOU POSTED</Heading>
                        <Text weight="medium" align="center" size="5">Schrijf je in voor de nieuwsbrief en wij houden je op de hoogte. De nieuwste ontwikkelingen van Retrolink, zo in je mailbox.</Text>
                    </Box>    
                </Flex>
            </Section>
        </Box>
    </Container>
    )
}