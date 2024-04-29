import { Box, Heading, Container, Section } from '@radix-ui/themes';

import { Fjalla } from '@/common/utils/fonts';
import { UserAccountData } from '@/features/accountOverview/userAccountData';

export default function AccountPage() {
    return (
        <Box style={{ backgroundColor: 'var(--gray-a2)' }} height="100%">
        <Section p="9">
            <Container>
                <Box p="5">
                    <Heading mb="5" className={Fjalla.className} size="7" as="h1">Account</Heading> 
                </Box>
                <Box p="5" style={{ backgroundColor: 'white', borderRadius: 'var(--radius-3)', boxShadow: 'var(--shadow-3'}}>
                    <UserAccountData />
                </Box>
            </Container>
        </Section>
    </Box>
        
    )
}