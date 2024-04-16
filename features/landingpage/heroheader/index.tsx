import { Box, Container, Section, Heading, Button } from '@radix-ui/themes';
import { Fjalla } from '@/common/utils/fonts';
import Link from 'next/link';

export const HeroHeader = () => {
    return (
        <Container size="4" minHeight="600px">
            <Box py="9">
                <Section size="4">
                    <Heading className={Fjalla.className} as="h1" mb="4" size="9">RETROLINK</Heading>
                    <Heading mb="9" className={Fjalla.className} as="h2" size="7">A NEW MARKETPLACE FOR RETROGAMES</Heading>
                    <Link href="/#emaillist">
                        <Button variant="solid" size="4" style={{ maxWidth: "fit-content"}}>Subscribe voor mailinglist</Button>
                    </Link>
                </Section>
            </Box>
        </Container>
    )
}