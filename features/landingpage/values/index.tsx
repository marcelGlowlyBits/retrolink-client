import { Box, Container, Section, Heading, Flex, Text } from '@radix-ui/themes';
import { Fjalla } from '@/common/utils/fonts';

export const Values = () => {
    return (
        <Container size="4" minHeight="600px">
        <Box p="4">
            <Section size="4">
                <Flex direction={{ initial: 'column', md: 'row'}} justify="between" gap="7">
                    <Box>
                        <Heading className={Fjalla.className} mb="4" align="center" as="h3" size="7">COMMUNITY</Heading>
                        <Text weight="medium" size="4" align="center">Retrolink is dé opkomende online marktplaats voor retro games. Of je nu vintage games wilt kopen, verkopen of ruilen.</Text>
                    </Box>
                    <Box>
                        <Heading className={Fjalla.className} mb="4" align="center" as="h3" size="7">CULTURE</Heading>
                        <Text weight="medium" size="4" align="center">Van LAN-parties tot E-sports tournaments. Gaming is voor iedereen. RetroLink gelooft in gaming culture en hoe dat mensen samenbrengt.</Text>
                    </Box>
                    <Box>
                        <Heading className={Fjalla.className} mb="4" align="center" as="h3" size="7">NOSTALGIA</Heading>
                        <Text weight="medium" size="4" align="center">RetroLink brengt herinneringen naar boven. Vind je favoriete games of consoles en herbeleef tijdloze klassiekers.</Text>
                    </Box>
                </Flex>
            </Section>
        </Box>
    </Container>
    )
}