import { Box, Container, Section, Heading, Flex, Text } from '@radix-ui/themes';
import { Fjalla } from '@/common/utils/fonts';

export const Values = () => {
    return (
        <Container size="4" minHeight="600px">
        <Box py="9">
            <Section size="4">
                <Flex direction="row" justify="between" gap="7">
                    <Box>
                        <Heading className={Fjalla.className} mb="4" align="center" as="h3" size="7">COMMUNITY</Heading>
                        <Text weight="medium" size="4" align="center">Retrolink is de opkomende online marktplaats voor retro games. Of je nu vintage games wilt kopen of verkopen.</Text>
                    </Box>
                    <Box>
                        <Heading className={Fjalla.className} mb="4" align="center" as="h3" size="7">CULTURE</Heading>
                        <Text weight="medium" size="4" align="center">Retrolink is de opkomende online marktplaats voor retro games. Of je nu vintage games wilt kopen of verkopen.</Text>
                    </Box>
                    <Box>
                        <Heading className={Fjalla.className} mb="4" align="center" as="h3" size="7">NOSTALGIA</Heading>
                        <Text weight="medium" size="4" align="center">Retrolink is de opkomende online marktplaats voor retro games. Of je nu vintage games wilt kopen of verkopen.</Text>
                    </Box>
                </Flex>
            </Section>
        </Box>
    </Container>
    )
}