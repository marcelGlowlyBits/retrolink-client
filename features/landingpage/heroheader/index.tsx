import { Box, Container, Section, Heading } from '@radix-ui/themes';
import { Fjalla } from '@/common/utils/fonts';

export const HeroHeader = () => {
    return (
        <Container size="4" minHeight="600px">
            <Box py="9">
                <Section size="4">
                    <Heading className={Fjalla.className} as="h1" mb="4" size="9">RETROLINK</Heading>
                    <Heading className={Fjalla.className} as="h2" size="7">A NEW MARKETPLACE FOR RETROGAMES</Heading>
                </Section>
            </Box>
        </Container>
    )
}