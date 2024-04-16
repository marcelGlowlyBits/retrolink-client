'use client';
import { Box, Section, Grid, Heading, Text, Flex, Button } from '@radix-ui/themes';

import { Fjalla } from '@/common/utils/fonts';

export const ProductBlock = () => {
    const scrollToBottom = () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }

    return (        
        <Section minHeight="600px">
            <Grid columns="2" width="auto">
                <Box p="9">
                    <Heading className={Fjalla.className} mb="8" as="h3" size="9">PLAYS IN YOUR POCKET</Heading>
                    <Flex direction="column" gap="4">
                        <Text weight="medium" size="5">De nieuwe online marktplaats voor de gaming community in Nederland en Belgie. Koop of verkoop je games via het Retrolink platform.</Text>
                        <Text weight="medium" mb="9" size="5">Vertrouwde verkopers en een breed aanbod van games, consoles, merchandise en nostalgia products.</Text>
                        <Button onClick={scrollToBottom}  variant="outline" size="4" style={{ maxWidth: "fit-content"}}>Houd me op de hoogte</Button>
                    </Flex>
                </Box>
                <Box p="9" style={{ backgroundColor: 'red'}}>
                    <Heading className={Fjalla.className} mb="4" align="center" as="h3" size="6">Community</Heading>
                    <Text align="center">Retrolink is de opkomende online marktplaats voor retro games. Of je nu vintage games wilt kopen of verkopen.</Text>
                </Box>
            </Grid>
        </Section>
        
    )
}