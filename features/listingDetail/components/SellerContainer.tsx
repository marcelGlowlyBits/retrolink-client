import { Box, Flex, DataList } from '@radix-ui/themes'
import { Heading } from '@/common/typography'

import { fetchUserById } from '@/libs/api/user'
import Link from 'next/link'

export const SellerContainer = async ({ sellerId }: { sellerId: any }) => {
  const seller = await fetchUserById(sellerId)

  return (
    <Box
      p="5"
      style={{
        backgroundColor: 'white',
        borderRadius: 'var(--radius-3)',
        boxShadow: 'var(--shadow-3',
      }}
    >
      <Flex direction="column" gap="6">
        <Heading as="h2" size="6">
          Verkoper
        </Heading>
        <DataList.Root orientation={{ initial: 'vertical', sm: 'horizontal' }}>
          <DataList.Item>
            <DataList.Label>Gebruikersnaam:</DataList.Label>
            <DataList.Value>
              {seller?.username || <i>Geen gebruikersnaam</i>}
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Email adres:</DataList.Label>
            <DataList.Value>{seller?.email}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Email geverifieerd:</DataList.Label>
            <DataList.Value>
              {Boolean(seller?.email_verified) ? 'Ja' : 'Nee'}
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>
        <Link href={`/profile/${sellerId}`}>Bekijk profiel</Link>
      </Flex>
    </Box>
  )
}
