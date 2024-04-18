import { Box, Container, Section, Heading, Button, Flex } from '@radix-ui/themes';
import { TrackClick } from '@loglib/tracker/react';

import Link from 'next/link';
import Image from 'next/image'

import { Fjalla } from '@/common/utils/fonts';

import RetrolinkLogo from '../../../public/images/logo.png';

export const HeroHeader = () => {
    return (
        <Container size="4" minHeight="450px">
            <Box p="9">
                <Flex direction="column" justify="center">
            <Image
                src={RetrolinkLogo}
                style={{ alignSelf: 'center' }}
                height={250}
                alt="Picture of the author"
                layout="responsive"
            />
                <Section mt="6" size="1">
                    <Flex direction="column" justify="center" align="center" gap="4">
                        <Heading className={Fjalla.className} as="h1" size="7">AN ONLINE MARKETPLACE FOR RETROGAME ENTHOUSIASTS.</Heading>
                        <TrackClick name="heroheadercta" payload={{ trackedClick: "heroHeaderCTA" }}>
                            <Link href="/#emaillist" style={{ alignContent: "center"}}>
                                <Button style={{ backgroundColor: 'red'}} variant="solid" size="4">Subscribe voor mailinglist</Button>
                            </Link>
                        </TrackClick>
                    </Flex>
                </Section>
                </Flex>                
            </Box>
        </Container>
    )
}