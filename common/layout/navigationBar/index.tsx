import * as React from 'react';
import Image from 'next/image'

import { Box, Flex, Heading, Container } from '@radix-ui/themes';

import RetrolinkLogo from '../../../public/images/Logo_bare.png';

export const NavigationBar = () => {
    return (
        <Box p="3" style={{ boxShadow: 'var(--shadow-3' }}>
            <Container>
                <Flex direction="row">
                    <Image
                        src={RetrolinkLogo}
                        height={40}
                        alt="Retrolink logo"
                        
                    />
                </Flex>
            </Container>
        </Box>
    )
}