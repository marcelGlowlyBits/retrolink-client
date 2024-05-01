"use client";
import * as React from 'react';
import { Box, Heading, Container, Section, Button } from '@radix-ui/themes';
import { useParams } from "next/navigation";
import { Id } from '@/convex/_generated/dataModel';

import { Fjalla } from '@/common/utils/fonts';
import { useToast } from '@/common/hooks/useToast';

import { ProfileAccountData } from '@/features/profileOverview/profileAccountData';

export default function ProfilePage() {
    const params = useParams<{ userId: Id<"users"> }>().userId;
    const { showToast } = useToast();

    return (
        <>
        <Box style={{ backgroundColor: 'var(--gray-a2)' }} height="100vh">
        <Section p={{ initial: '5', sm: '9'}}>
            <Container>
                <Box p="5">
                    <Heading mb="5" className={Fjalla.className} size="7" as="h1">Profiel</Heading> 
                </Box>
                <Box p="5" style={{ backgroundColor: 'white', borderRadius: 'var(--radius-3)', boxShadow: 'var(--shadow-3'}}>
                    <ProfileAccountData userId={params} />
                </Box>
                <Button onClick={() => showToast({ title: 'Test', description: 'Dit is een test' })}>Test</Button>
            </Container>
        </Section>
        </Box>
        </>
    )
}
