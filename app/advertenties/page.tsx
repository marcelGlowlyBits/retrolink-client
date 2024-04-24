import * as React from 'react';
import { Box, Heading, Container, Section } from '@radix-ui/themes';

import { Fjalla } from '@/common/utils/fonts';

import { ListingOverview } from '@/features/listingOverview';

export default function ListingsOverview() {
    return (
        <Box style={{ backgroundColor: 'var(--gray-a2)' }} height="100%">
            <Section p="9">
                <Container>
                    <Box p="5">
                        <Heading mb="5" className={Fjalla.className} size="7" as="h1">Alle advertenties</Heading> 
                    </Box>
                    
                    <Box p="5">
                        <ListingOverview />
                    </Box>
                </Container>
            </Section>
        </Box>
    )
}