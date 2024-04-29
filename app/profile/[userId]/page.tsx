"use client";

import { Box, Heading, Container, Section } from '@radix-ui/themes';
import { useParams } from "next/navigation";
import { Id } from '@/convex/_generated/dataModel';

import { Fjalla } from '@/common/utils/fonts';

import { ProfileAccountData } from '@/features/profileOverview/profileAccountData';

export default function ProfilePage() {
    const params = useParams<{ userId: Id<"users"> }>().userId;
    
    return (
        <Box style={{ backgroundColor: 'var(--gray-a2)' }} height="100%">
        <Section p="9">
            <Container>
                <Box p="5">
                    <Heading mb="5" className={Fjalla.className} size="7" as="h1">Profiel</Heading> 
                </Box>
                <Box p="5" style={{ backgroundColor: 'white', borderRadius: 'var(--radius-3)', boxShadow: 'var(--shadow-3'}}>
                    <ProfileAccountData userId={params} />
                </Box>
            </Container>
        </Section>
    </Box>
    )
}
